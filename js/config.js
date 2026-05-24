// Configuration management — GitHub storage settings
const CFG_KEY = 'tn_gh_config';

// Hardcoded repo — used for public raw reads (no token) and as setup defaults
const DEFAULT_OWNER  = 'gopinath87607';
const DEFAULT_REPO   = 'tamilnadu-compiliant-portal';
const DEFAULT_BRANCH = 'main';

function getGHConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem(CFG_KEY)) || {};
    return {
      token:  saved.token  || '',
      owner:  saved.owner  || DEFAULT_OWNER,
      repo:   saved.repo   || DEFAULT_REPO,
      branch: saved.branch || DEFAULT_BRANCH,
    };
  } catch { return { owner: DEFAULT_OWNER, repo: DEFAULT_REPO, branch: DEFAULT_BRANCH, token: '' }; }
}

function saveGHConfig(cfg) {
  localStorage.setItem(CFG_KEY, JSON.stringify({
    token: (cfg.token || '').trim(),
    owner: (cfg.owner || DEFAULT_OWNER).trim(),
    repo:  (cfg.repo  || DEFAULT_REPO).trim(),
    branch:(cfg.branch|| DEFAULT_BRANCH).trim()
  }));
}

function clearGHConfig() { localStorage.removeItem(CFG_KEY); }

// "Configured" means we have a write token — reads work without one
function isConfigured() {
  const c = getGHConfig();
  return !!(c.token && c.owner && c.repo);
}
