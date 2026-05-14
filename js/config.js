// Configuration management — GitHub storage settings
const CFG_KEY = 'tn_gh_config';
const APP_SALT = 'TNPortal@2025#Secure_v2';

function getGHConfig() {
  try { return JSON.parse(localStorage.getItem(CFG_KEY)) || {}; }
  catch { return {}; }
}

function saveGHConfig(cfg) {
  localStorage.setItem(CFG_KEY, JSON.stringify({
    token: (cfg.token || '').trim(),
    owner: (cfg.owner || '').trim(),
    repo:  (cfg.repo  || '').trim(),
    branch:(cfg.branch|| 'main').trim()
  }));
}

function clearGHConfig() { localStorage.removeItem(CFG_KEY); }

function isConfigured() {
  const c = getGHConfig();
  return !!(c.token && c.owner && c.repo);
}
