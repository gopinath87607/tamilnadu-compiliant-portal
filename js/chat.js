// Chat system — polls GitHub every 15 s, falls back to localStorage
let _chatTimer = null;
let _lastCount  = 0;

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ─── Render ──────────────────────────────────────────────────────────────────

function renderMessages(msgs) {
  const box = document.getElementById('chat-messages');
  if (!box) return;
  if (!msgs.length) {
    box.innerHTML = `<div class="chat-empty"><i class="fa-solid fa-comments"></i><p>No messages yet — say hello!</p></div>`;
    return;
  }
  const me = currentUser?.id;
  box.innerHTML = msgs.map(m => {
    const mine = m.userId === me;
    const t = new Date(m.timestamp).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
    return `<div class="cmsg ${mine?'cmsg-me':'cmsg-other'}">
      <div class="cbubble ${mine?'cbubble-me':'cbubble-other'}">
        ${!mine?`<span class="cuname">@${escHtml(m.username)}</span>`:''}
        <div class="ctext">${escHtml(m.text)}</div>
        <div class="ctime">${t}</div>
      </div>
    </div>`;
  }).join('');
  // Scroll to bottom only if near bottom or new messages
  if (msgs.length !== _lastCount) {
    box.scrollTop = box.scrollHeight;
    _lastCount = msgs.length;
  }
}

// ─── Load ────────────────────────────────────────────────────────────────────

async function refreshChat() {
  try {
    const msgs = await loadMessages();
    renderMessages(msgs);
  } catch (e) {
    console.warn('Chat refresh failed:', e.message);
  }
}

// ─── Send ────────────────────────────────────────────────────────────────────

async function sendChatMessage(text) {
  if (!isLoggedIn()) { showToast('Please login to chat.'); return; }
  text = text.trim();
  if (!text || text.length > 500) { showToast('Message must be 1-500 characters.'); return; }

  const msg = {
    id: 'm_' + Date.now() + '_' + Math.random().toString(36).slice(2,6),
    userId: currentUser.id,
    username: currentUser.username,
    text,
    timestamp: new Date().toISOString()
  };

  try {
    await persistMessage(msg);
    await refreshChat();
  } catch (e) {
    showToast('Failed to send: ' + e.message);
  }
}

// ─── Polling ─────────────────────────────────────────────────────────────────

function startChatPolling() {
  stopChatPolling();
  refreshChat();
  _chatTimer = setInterval(refreshChat, 15000);
}

function stopChatPolling() {
  if (_chatTimer) { clearInterval(_chatTimer); _chatTimer = null; }
  _lastCount = 0;
}
