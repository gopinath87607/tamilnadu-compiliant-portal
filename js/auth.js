// User authentication — passwords SHA-256 hashed, sessions in sessionStorage
const SESSION_KEY = 'tn_session_v2';
const REMEMBER_KEY = 'tn_remember_v2';
let currentUser = null;

// ─── Crypto ──────────────────────────────────────────────────────────────────

async function hashPwd(password) {
  const data = new TextEncoder().encode(password + APP_SALT);
  const buf  = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

// ─── Registration ────────────────────────────────────────────────────────────

async function registerUser({ username, email, password, phone, district }) {
  username = username.trim().toLowerCase();
  email    = email.trim().toLowerCase();

  if (username.length < 3)     throw new Error('Username must be at least 3 characters.');
  if (password.length < 6)     throw new Error('Password must be at least 6 characters.');
  if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Enter a valid email address.');

  let users = [], sha = null;
  if (isConfigured()) {
    const res = await readGHFile('data/users.json');
    users = res.data?.users || [];
    sha   = res.sha;
  } else {
    users = JSON.parse(localStorage.getItem('tn_users') || '[]');
  }

  if (users.find(u => u.username === username)) throw new Error('Username already taken.');
  if (users.find(u => u.email === email))       throw new Error('Email already registered.');

  const passwordHash = await hashPwd(password);
  const newUser = {
    id: 'u_' + Date.now() + '_' + Math.random().toString(36).slice(2,7),
    username, email, passwordHash, phone: (phone||'').trim(),
    district: district || '',
    role: users.length === 0 ? 'admin' : 'user',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  if (isConfigured()) {
    await writeGHFile('data/users.json', { users }, sha, `Register: ${username}`);
  } else {
    localStorage.setItem('tn_users', JSON.stringify(users));
  }

  _startSession(newUser, false);
  return newUser;
}

// ─── Login ───────────────────────────────────────────────────────────────────

async function loginUser({ username, password, remember }) {
  username = username.trim().toLowerCase();
  let users = [];

  // Try GitHub first, then fall back to localStorage
  if (isConfigured()) {
    const { data } = await readGHFile('data/users.json');
    users = data?.users || [];
  }
  // Always also check localStorage (handles accounts created before GitHub was configured)
  if (!users.length) {
    users = JSON.parse(localStorage.getItem('tn_users') || '[]');
  }

  if (!users.length) throw new Error('No accounts found. Please register first.');
  const hash = await hashPwd(password);
  const user = users.find(u => u.username === username && u.passwordHash === hash);
  if (!user) throw new Error('Invalid username or password.');

  // If found in localStorage but GitHub is now configured, migrate the user
  if (isConfigured()) {
    const { data, sha } = await readGHFile('data/users.json');
    const ghUsers = data?.users || [];
    if (!ghUsers.find(u => u.id === user.id)) {
      ghUsers.push(user);
      await writeGHFile('data/users.json', { users: ghUsers }, sha, `Migrate user: ${username}`);
    }
  }

  _startSession(user, !!remember);
  return user;
}

// ─── Session ─────────────────────────────────────────────────────────────────

function _startSession(user, remember) {
  const s = {
    id: user.id, username: user.username, email: user.email,
    district: user.district, phone: user.phone, role: user.role
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
  if (remember) localStorage.setItem(REMEMBER_KEY, JSON.stringify(s));
  currentUser = s;
  updateAuthUI();
}

function logoutUser() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(REMEMBER_KEY);
  currentUser = null;
  updateAuthUI();
  showPage('dashboard');
  showToast('Logged out successfully.');
}

function initAuth() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(REMEMBER_KEY);
    currentUser = raw ? JSON.parse(raw) : null;
  } catch { currentUser = null; }
}

function isLoggedIn() { return currentUser !== null; }
function isAdmin()    { return currentUser?.role === 'admin'; }

function requireLogin() {
  if (isLoggedIn()) return true;
  showToast('Please login to access this feature.');
  showPage('login');
  return false;
}

// ─── Sync auth UI ────────────────────────────────────────────────────────────

function updateAuthUI() {
  const show = (id, visible) => { const el = document.getElementById(id); if (el) el.style.display = visible ? '' : 'none'; };
  const setText = (id, t) => { const el = document.getElementById(id); if (el) el.textContent = t; };

  if (isLoggedIn()) {
    show('nav-login', false);
    show('nav-logout', true);
    show('nav-user-info', true);
    show('nav-my-complaints', true);
    show('nav-chat', true);
    setText('nav-user-info', `👤 ${currentUser.username}`);
    setText('topbar-user', currentUser.username);
    show('topbar-user-wrap', true);
    show('topbar-login-btn', false);
  } else {
    show('nav-login', true);
    show('nav-logout', false);
    show('nav-user-info', false);
    show('nav-my-complaints', false);
    show('nav-chat', false);
    show('topbar-user-wrap', false);
    show('topbar-login-btn', true);
  }
}
