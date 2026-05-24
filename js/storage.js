// Storage layer: raw GitHub (public reads) → GitHub API (writes) → localStorage fallback
const GH_API  = 'https://api.github.com';
const GH_RAW  = `https://raw.githubusercontent.com/${DEFAULT_OWNER}/${DEFAULT_REPO}/${DEFAULT_BRANCH}`;

const _cache   = {};
const CACHE_TTL = 30000; // 30 s

// ─── Low-level GitHub API (needs token) ─────────────────────────────────────

async function _ghFetch(method, path, body = null) {
  const { token, owner, repo, branch } = getGHConfig();
  const url = `${GH_API}/repos/${owner}/${repo}/contents/${path}${method === 'GET' ? `?ref=${branch}` : ''}`;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  };
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  if (res.status === 404) return null;
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `GitHub ${res.status}`);
  }
  return res.json();
}

async function testGHConnection() {
  const { token, owner, repo } = getGHConfig();
  const res = await fetch(`${GH_API}/repos/${owner}/${repo}`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github.v3+json' }
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Cannot reach repo (${res.status})`);
  }
  return res.json();
}

// ─── High-level read / write ─────────────────────────────────────────────────

async function readGHFile(path) {
  const now = Date.now();
  if (_cache[path] && (now - _cache[path].ts) < CACHE_TTL)
    return { data: _cache[path].content, sha: _cache[path].sha };

  const raw = await _ghFetch('GET', path);
  if (!raw) return { data: null, sha: null };

  const text = decodeURIComponent(escape(atob(raw.content.replace(/\n/g, ''))));
  const parsed = JSON.parse(text);
  _cache[path] = { content: parsed, sha: raw.sha, ts: now };
  return { data: parsed, sha: raw.sha };
}

async function writeGHFile(path, content, sha, msg) {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))));
  const body = { message: msg || `Portal: update ${path}`, content: encoded };
  if (sha) body.sha = sha;
  const { branch } = getGHConfig();
  body.branch = branch;
  const res = await _ghFetch('PUT', path, body);
  if (_cache[path]) delete _cache[path];
  return res;
}

async function safeWriteGHFile(path, updater, msg) {
  for (let attempt = 0; attempt < 4; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 1000 * attempt));
    try {
      if (_cache[path]) delete _cache[path];
      let { data, sha } = await readGHFile(path);
      if (!data) data = _defaultFor(path);
      const updated = updater(data);
      await writeGHFile(path, updated, sha, msg);
      return updated;
    } catch (e) {
      if (attempt === 3 || !e.message?.includes('409')) throw e;
    }
  }
}

function _defaultFor(path) {
  if (path.includes('users'))      return { users: [] };
  if (path.includes('complaints')) return { complaints: [] };
  if (path.includes('messages'))   return { messages: [] };
  return {};
}

// ─── Public raw read (no token — works on all devices for public repos) ───────

async function _rawRead(filePath) {
  try {
    const res = await fetch(`${GH_RAW}/${filePath}?_=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

// ─── Unified data API ────────────────────────────────────────────────────────

const LS_COMPLAINTS = 'tn_complaints_v2';
const LS_MESSAGES   = 'tn_messages_v2';

async function loadComplaints() {
  // 1. Raw GitHub URL — public read, works on every device, no token needed
  const raw = await _rawRead('data/complaints.json');
  if (raw?.complaints) return raw.complaints;

  // 2. GitHub API (token required, catches private repos or auth issues)
  if (isConfigured()) {
    try {
      const { data } = await readGHFile('data/complaints.json');
      if (data?.complaints) return data.complaints;
    } catch (e) { /* fall through */ }
  }

  // 3. Local browser storage (offline / no network)
  return JSON.parse(localStorage.getItem(LS_COMPLAINTS) || '[]');
}

async function persistComplaints(complaints) {
  // Always keep a local copy for offline/fast access
  localStorage.setItem(LS_COMPLAINTS, JSON.stringify(complaints));

  if (!isConfigured()) {
    // Flag that local data may be out of sync
    localStorage.setItem('tn_has_local_only', '1');
    return;
  }
  localStorage.removeItem('tn_has_local_only');
  await safeWriteGHFile('data/complaints.json', d => ({ ...(d || {}), complaints }), 'Update complaints');
}

async function loadMessages() {
  const raw = await _rawRead('data/messages.json');
  if (raw?.messages) return raw.messages;

  if (isConfigured()) {
    try {
      const { data } = await readGHFile('data/messages.json');
      if (data?.messages) return data.messages;
    } catch (e) { /* fall through */ }
  }
  return JSON.parse(localStorage.getItem(LS_MESSAGES) || '[]');
}

async function persistMessage(msg) {
  if (isConfigured()) {
    await safeWriteGHFile('data/messages.json', d => {
      const msgs = [...((d || {}).messages || []), msg].slice(-500);
      return { messages: msgs };
    }, 'Chat message');
  } else {
    const msgs = JSON.parse(localStorage.getItem(LS_MESSAGES) || '[]');
    msgs.push(msg);
    localStorage.setItem(LS_MESSAGES, JSON.stringify(msgs.slice(-200)));
  }
}

async function initGHStorage() {
  const files = [
    { path: 'data/users.json',      init: { users: [] } },
    { path: 'data/complaints.json', init: { complaints: [] } },
    { path: 'data/messages.json',   init: { messages: [] } },
  ];
  for (const f of files) {
    const { data } = await readGHFile(f.path);
    if (!data) await writeGHFile(f.path, f.init, null, `Init ${f.path}`);
  }
}
