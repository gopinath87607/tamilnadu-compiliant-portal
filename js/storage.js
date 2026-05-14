// GitHub REST API storage layer with localStorage fallback
const GH_API = 'https://api.github.com';
const _cache = {}; // { path: { content, sha, ts } }
const CACHE_TTL = 30000; // 30 seconds

// ─── Low-level GitHub API ────────────────────────────────────────────────────

async function _ghFetch(method, path, body = null) {
  const { token, owner, repo, branch = 'main' } = getGHConfig();
  const url = `${GH_API}/repos/${owner}/${repo}/contents/${path}${method==='GET'?`?ref=${branch}`:''}`;
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
  const { branch = 'main' } = getGHConfig();
  body.branch = branch;
  const res = await _ghFetch('PUT', path, body);
  if (_cache[path]) delete _cache[path]; // invalidate
  return res;
}

// Retry write on 409 conflict (concurrent edit)
async function safeWriteGHFile(path, updater, msg) {
  for (let attempt = 0; attempt < 4; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 1000 * attempt));
    try {
      let { data, sha } = await readGHFile(path);
      if (!data) data = _defaultFor(path);
      if (_cache[path]) delete _cache[path]; // force fresh read on retry
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

// ─── Unified data API (GitHub → localStorage fallback) ───────────────────────

const LS_COMPLAINTS = 'tn_complaints_v2';
const LS_MESSAGES   = 'tn_messages_v2';

async function loadComplaints() {
  if (isConfigured()) {
    const { data } = await readGHFile('data/complaints.json');
    if (data?.complaints) return data.complaints;
  }
  return JSON.parse(localStorage.getItem(LS_COMPLAINTS) || '[]');
}

async function persistComplaints(complaints) {
  localStorage.setItem(LS_COMPLAINTS, JSON.stringify(complaints));
  if (!isConfigured()) return;
  await safeWriteGHFile('data/complaints.json', d => ({ ...(d||{}), complaints }), 'Update complaints');
}

async function loadMessages() {
  if (isConfigured()) {
    const { data } = await readGHFile('data/messages.json');
    if (data?.messages) return data.messages;
  }
  return JSON.parse(localStorage.getItem(LS_MESSAGES) || '[]');
}

async function persistMessage(msg) {
  if (isConfigured()) {
    await safeWriteGHFile('data/messages.json', d => {
      const msgs = [...((d||{}).messages || []), msg].slice(-500);
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
