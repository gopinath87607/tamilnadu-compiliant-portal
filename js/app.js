// ── Tamil Nadu Economic Data ──────────────────────────────────────────────────
const TN_ECONOMY = [
  { year:'2019-20', gsdp:18.46, gsdpGrowth:9.8,  debt:3.80, debtGrowth:14.5 },
  { year:'2020-21', gsdp:17.83, gsdpGrowth:-3.4,  debt:4.66, debtGrowth:22.6 },
  { year:'2021-22', gsdp:20.50, gsdpGrowth:14.9,  debt:5.27, debtGrowth:13.1 },
  { year:'2022-23', gsdp:23.29, gsdpGrowth:13.6,  debt:6.08, debtGrowth:15.4 },
  { year:'2023-24', gsdp:26.07, gsdpGrowth:11.9,  debt:7.04, debtGrowth:15.8 },
  { year:'2024-25', gsdp:29.22, gsdpGrowth:12.1,  debt:8.06, debtGrowth:14.5, estimated:true }
];

// ── State ─────────────────────────────────────────────────────────────────────
let currentPage = 'dashboard';
let leafletMap = null, bubbleLayer = null;
let geoMap = null, geoMarker = null;
let selectedLat = null, selectedLng = null;
let filterState = { district:'', taluk:'', ward:'', category:'', priority:'', status:'', search:'' };

// ── Bootstrap ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('sidebar-year').textContent = new Date().getFullYear();

  // Nav links
  document.querySelectorAll('[data-page]').forEach(el =>
    el.addEventListener('click', () => showPage(el.dataset.page)));

  document.getElementById('hamburger-btn')?.addEventListener('click', () =>
    document.getElementById('sidebar').classList.toggle('open'));

  // Auth + config
  initAuth();
  _syncGHBadge();

  // One-time cleanup: wipe auto-generated demo complaints
  if (!localStorage.getItem('tn_demo_cleared_v1')) {
    localStorage.removeItem('tn_complaints_v2');
    localStorage.setItem('tn_demo_cleared_v1', '1');
    // Also clear demo data from GitHub if configured
    if (isConfigured()) {
      try {
        const { data, sha } = await readGHFile('data/complaints.json');
        const real = (data?.complaints || []).filter(c => c.userId);
        await writeGHFile('data/complaints.json', { complaints: real }, sha, 'Remove demo complaints');
      } catch { /* non-fatal */ }
    }
  }

  // Secret admin setup access via URL hash
  const checkHash = () => { if (location.hash === '#admin-setup') showPage('setup'); };
  window.addEventListener('hashchange', checkHash);
  checkHash();

  // Pre-fill setup form from saved config
  const c = getGHConfig();
  if (c.token)  document.getElementById('setup-token').value  = c.token;
  if (c.owner)  document.getElementById('setup-owner').value  = c.owner;
  if (c.repo)   document.getElementById('setup-repo').value   = c.repo;
  if (c.branch) document.getElementById('setup-branch').value = c.branch;

  // Populate district dropdowns
  TN_DISTRICTS.forEach(d => {
    ['submit-district','reg-district'].forEach(id => {
      const sel = document.getElementById(id);
      if (sel) sel.add(new Option(d.name, d.name));
    });
  });

  showPage('dashboard');
});

// ── Page routing ──────────────────────────────────────────────────────────────
function showPage(page) {
  // Auth guards
  if ((page === 'my-complaints' || page === 'chat') && !requireLogin()) return;
  if (page === 'setup' && !isAdmin()) { showToast('Admin access required.'); return; }

  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('[data-page]').forEach(el =>
    el.classList.toggle('active', el.dataset.page === page));
  const el = document.getElementById(`page-${page}`);
  if (el) el.classList.add('active');

  const titles = {
    dashboard:'Dashboard', map:'Complaint Map', complaints:'All Complaints',
    submit:'Submit Complaint', districts:'District Overview',
    login:'Login / Register', 'my-complaints':'My Complaints',
    chat:'Community Chat', setup:'Setup & Configuration',
    economy:'TN Economy'
  };
  document.getElementById('page-title').textContent = titles[page] || page;

  // Sidebar close on mobile
  document.getElementById('sidebar').classList.remove('open');

  // Stop chat polling when leaving chat
  if (page !== 'chat') stopChatPolling();

  switch (page) {
    case 'dashboard':     renderDashboard(); break;
    case 'map':           renderMap(); break;
    case 'complaints':    renderComplaintsPage(); break;
    case 'submit':        renderSubmitForm(); break;
    case 'districts':     renderDistrictsPage(); break;
    case 'my-complaints': renderMyComplaints(); break;
    case 'chat':          renderChatPage(); break;
    case 'setup':         renderSetupPage(); break;
    case 'login':         renderLoginPage(); break;
    case 'economy':       renderEconomyPage(); break;
  }
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
async function renderDashboard() {
  const c = await loadComplaints();
  const total = c.length, open = c.filter(x=>x.status==='open').length,
        inprog = c.filter(x=>x.status==='inprogress').length,
        resolved = c.filter(x=>x.status==='resolved').length,
        pct = total ? Math.round(resolved/total*100) : 0;

  document.getElementById('stat-total').textContent   = total;
  document.getElementById('stat-open').textContent    = open;
  document.getElementById('stat-inprog').textContent  = inprog;
  document.getElementById('stat-resolved').textContent= resolved;
  document.getElementById('stat-pct').textContent     = pct + '%';

  const pb = document.getElementById('resolve-progress');
  if (pb) { pb.style.width = pct+'%'; pb.style.background = pct>70?'var(--green)':pct>40?'var(--amber)':'var(--red)'; }

  // Category chart
  const counts = {};
  CATEGORIES.forEach(x => counts[x] = 0);
  c.forEach(x => { if (counts[x.category]!==undefined) counts[x.category]++; });
  const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,8), max = sorted[0]?.[1]||1;
  const cc = document.getElementById('category-chart');
  if (cc) cc.innerHTML = sorted.map(([cat,n]) =>
    `<div style="margin-bottom:9px"><div style="display:flex;justify-content:space-between;font-size:.76rem;margin-bottom:2px"><span>${cat}</span><b>${n}</b></div><div class="mini-bar"><div class="mini-bar-fill" style="width:${n/max*100}%;background:var(--blue)"></div></div></div>`
  ).join('');

  // Recent
  const rc = document.getElementById('recent-complaints');
  if (rc) rc.innerHTML = [...c].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,8).map(x =>
    `<tr><td><span class="badge badge-${x.status}">${STATUSES[x.status].label}</span></td>
     <td style="max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${x.title}</td>
     <td>${x.district}</td><td><span style="font-size:.7rem;background:#f1f5f9;padding:2px 7px;border-radius:10px">${x.category}</span></td>
     <td>${priBadge(x.priority)}</td><td style="font-size:.76rem;color:var(--gray)">${fmtDate(x.createdAt)}</td></tr>`
  ).join('');

  // Top districts
  const stats = getDistrictStats(c).sort((a,b)=>b.total-a.total).slice(0,5), mx = stats[0]?.total||1;
  const td = document.getElementById('top-districts');
  if (td) td.innerHTML = stats.map(d =>
    `<div style="margin-bottom:11px"><div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:2px"><span style="font-weight:600">${d.name}</span><span><span style="color:var(--red)">${d.open}</span> open, <span style="color:var(--green)">${d.resolved}</span> done</span></div><div class="mini-bar"><div class="mini-bar-fill" style="width:${d.total/mx*100}%;background:var(--orange)"></div></div></div>`
  ).join('');
}

// ── Map ───────────────────────────────────────────────────────────────────────
function renderMap() {
  if (!leafletMap) {
    leafletMap = L.map('main-map', { zoomControl:true }).setView([10.75, 78.5], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:'© <a href="https://openstreetmap.org">OpenStreetMap</a>'
    }).addTo(leafletMap);
  }
  setTimeout(() => leafletMap.invalidateSize(), 100);
  showDistrictBubbles();
}

async function showDistrictBubbles() {
  if (bubbleLayer) leafletMap.removeLayer(bubbleLayer);
  bubbleLayer = L.layerGroup();
  const c = await loadComplaints();
  const stats = getDistrictStats(c), maxT = Math.max(...stats.map(d=>d.total), 1);
  stats.forEach(d => {
    if (!d.total) return;
    const r = 8 + (d.total/maxT)*32, openP = d.open/d.total, resP = d.resolved/d.total;
    const color = openP>.6?'#ef4444':resP>.6?'#22c55e':'#f59e0b';
    const circle = L.circleMarker([d.lat,d.lng],{radius:r,fillColor:color,color:'#fff',weight:2,fillOpacity:.78});
    circle.bindPopup(`<div class="popup-title">${d.name} District</div>
      <div class="popup-stat"><span>Total</span><strong>${d.total}</strong></div>
      <div class="popup-stat"><span style="color:#ef4444">Open</span><strong>${d.open}</strong></div>
      <div class="popup-stat"><span style="color:#f59e0b">In Progress</span><strong>${d.inprogress}</strong></div>
      <div class="popup-stat"><span style="color:#22c55e">Resolved</span><strong>${d.resolved}</strong></div>
      <button class="popup-btn" onclick="drillDistrict('${d.name}')">View Wards →</button>`);
    circle.on('mouseover', function(){ this.openPopup(); });
    circle.addTo(bubbleLayer);
  });
  bubbleLayer.addTo(leafletMap);
  const bc = document.getElementById('map-breadcrumb');
  if (bc) bc.innerHTML = '<strong>Tamil Nadu — All Districts</strong>';
}

window.drillDistrict = async function(name) {
  leafletMap.closePopup();
  if (bubbleLayer) leafletMap.removeLayer(bubbleLayer);
  bubbleLayer = L.layerGroup();
  const dist = TN_DISTRICTS.find(d=>d.name===name);
  const c = await loadComplaints();
  const complaints = c.filter(x=>x.district===name);
  const ws = getWardStats(name, c), maxT = Math.max(...ws.map(w=>w.total), 1);
  leafletMap.setView([dist.lat, dist.lng], 10);
  ws.forEach(w => {
    if (!w.total) return;
    const wc = complaints.filter(x=>x.ward===w.ward);
    if (!wc.length) return;
    const lat = wc.reduce((s,x)=>s+x.lat,0)/wc.length, lng = wc.reduce((s,x)=>s+x.lng,0)/wc.length;
    const r = 10+(w.total/maxT)*28, openP=w.open/w.total, resP=w.resolved/w.total;
    const color = openP>.6?'#ef4444':resP>.6?'#22c55e':'#f59e0b';
    const circle = L.circleMarker([lat,lng],{radius:r,fillColor:color,color:'#fff',weight:2,fillOpacity:.82});
    circle.bindPopup(`<div class="popup-title">${w.ward}</div>
      <div style="font-size:.73rem;color:#6b7280;margin-bottom:5px">${name}</div>
      <div class="popup-stat"><span>Total</span><strong>${w.total}</strong></div>
      <div class="popup-stat"><span style="color:#ef4444">Open</span><strong>${w.open}</strong></div>
      <div class="popup-stat"><span style="color:#f59e0b">In Progress</span><strong>${w.inprogress}</strong></div>
      <div class="popup-stat"><span style="color:#22c55e">Resolved</span><strong>${w.resolved}</strong></div>
      <button class="popup-btn" onclick="viewWardFilter('${name}','${w.ward}')">View Complaints →</button>`);
    circle.on('mouseover', function(){ this.openPopup(); });
    circle.addTo(bubbleLayer);
  });
  bubbleLayer.addTo(leafletMap);
  const bc = document.getElementById('map-breadcrumb');
  if (bc) bc.innerHTML = `<a onclick="showDistrictBubbles();leafletMap.setView([10.75,78.5],7)">← Tamil Nadu</a> / <strong>${name}</strong>`;
};

window.viewWardFilter = function(district, ward) {
  filterState.district = district; filterState.ward = ward;
  filterState.taluk = ''; filterState.status = ''; filterState.category = '';
  leafletMap.closePopup();
  showPage('complaints');
};

// ── All Complaints ────────────────────────────────────────────────────────────
async function renderComplaintsPage() {
  const ds = document.getElementById('filter-district'),
        ts = document.getElementById('filter-taluk'),
        ws = document.getElementById('filter-ward'),
        cs = document.getElementById('filter-category');
  if (!ds) return;

  // District
  ds.innerHTML = '<option value="">All Districts</option>' + TN_DISTRICTS.map(d=>`<option value="${d.name}" ${filterState.district===d.name?'selected':''}>${d.name}</option>`).join('');

  // Taluk
  const updateTaluks = () => {
    const taluks = getDistrictTaluks(ds.value);
    ts.innerHTML = '<option value="">All Taluks</option>' + taluks.map(t=>`<option value="${t.name}" ${filterState.taluk===t.name?'selected':''}>${t.name}</option>`).join('');
    updateWards();
  };

  // Ward
  const updateWards = () => {
    let wards = [];
    if (ds.value && ts.value) wards = getTalukWards(ds.value, ts.value).map(w=>w.name);
    else if (ds.value) wards = TN_DISTRICTS.find(x=>x.name===ds.value)?.wards || [];
    ws.innerHTML = '<option value="">All Wards</option>' + wards.map(w=>`<option value="${w}" ${filterState.ward===w?'selected':''}>${w}</option>`).join('');
  };

  updateTaluks();

  cs.innerHTML = '<option value="">All Categories</option>' + CATEGORIES.map(c=>`<option value="${c}" ${filterState.category===c?'selected':''}>${c}</option>`).join('');
  document.getElementById('filter-status').value = filterState.status;
  document.getElementById('filter-priority').value = filterState.priority || '';

  ds.onchange = () => { filterState.district=ds.value; filterState.taluk=''; filterState.ward=''; updateTaluks(); applyFilters(); };
  ts.onchange = () => { filterState.taluk=ts.value; filterState.ward=''; updateWards(); applyFilters(); };
  ws.onchange = () => { filterState.ward=ws.value; applyFilters(); };
  cs.onchange = () => { filterState.category=cs.value; applyFilters(); };
  document.getElementById('filter-status').onchange   = e => { filterState.status=e.target.value; applyFilters(); };
  document.getElementById('filter-priority').onchange = e => { filterState.priority=e.target.value; applyFilters(); };
  const se = document.getElementById('filter-search');
  if (se) { se.value=filterState.search; se.oninput=()=>{ filterState.search=se.value; applyFilters(); }; }

  applyFilters();
}

async function applyFilters() {
  let c = await loadComplaints();
  if (filterState.district) c = c.filter(x=>x.district===filterState.district);
  if (filterState.taluk)    c = c.filter(x=>x.taluk===filterState.taluk);
  if (filterState.ward)     c = c.filter(x=>x.ward===filterState.ward);
  if (filterState.category) c = c.filter(x=>x.category===filterState.category);
  if (filterState.priority) c = c.filter(x=>x.priority===filterState.priority);
  if (filterState.status)   c = c.filter(x=>x.status===filterState.status);
  if (filterState.search)   c = c.filter(x=>x.title.toLowerCase().includes(filterState.search.toLowerCase())||x.description.toLowerCase().includes(filterState.search.toLowerCase()));
  c = [...c].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  document.getElementById('complaint-count').textContent = `${c.length} complaint${c.length!==1?'s':''}`;
  const tbody = document.getElementById('complaints-tbody');
  if (!tbody) return;
  if (!c.length) { tbody.innerHTML=`<tr><td colspan="9"><div class="empty-state"><i class="fa-solid fa-inbox"></i><p>No complaints found</p></div></td></tr>`; return; }
  tbody.innerHTML = c.map(x =>
    `<tr>
      <td style="font-weight:700;color:var(--blue)">#${x.id}</td>
      <td style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${x.title}">${x.title}</td>
      <td>${x.district}</td>
      <td style="font-size:.78rem">${x.ward||'—'}${x.pincode?`<br><span style="color:#9ca3af;font-size:.7rem">${x.pincode}</span>`:''}</td>
      <td><span style="font-size:.7rem;background:#f1f5f9;padding:2px 7px;border-radius:10px">${x.category}</span></td>
      <td>${priBadge(x.priority)}</td>
      <td><span class="badge badge-${x.status}">${STATUSES[x.status].label}</span></td>
      <td style="font-size:.76rem;color:var(--gray)">${fmtDate(x.createdAt)}</td>
      <td>${x.status!=='resolved'?`<button class="btn-primary btn-sm" onclick="openUpdateModal(${x.id})">Update</button>`:'<span style="color:var(--green);font-size:.78rem">✓ Done</span>'}</td>
    </tr>`
  ).join('');
}

// ── Submit Form ───────────────────────────────────────────────────────────────
function renderSubmitForm() {
  const ds = document.getElementById('submit-district'),
        ts = document.getElementById('submit-taluk'),
        ws = document.getElementById('submit-ward'),
        cs = document.getElementById('submit-category'),
        pc = document.getElementById('submit-pincode'),
        pa = document.getElementById('pin-auto');
  if (!ds) return;

  // Re-populate district
  ds.innerHTML = '<option value="">-- Select District --</option>' + TN_DISTRICTS.map(d=>`<option value="${d.name}">${d.name}</option>`).join('');
  cs.innerHTML = '<option value="">-- Select Category --</option>' + CATEGORIES.map(c=>`<option value="${c}">${c}</option>`).join('');

  const resetTaluk = () => { ts.innerHTML='<option value="">-- Select Taluk --</option>'; resetWard(); };
  const resetWard  = () => { ws.innerHTML='<option value="">-- Select Ward --</option>'; if(pc){pc.value='';} if(pa) pa.style.display='none'; };

  ds.onchange = () => {
    resetTaluk();
    getDistrictTaluks(ds.value).forEach(t => ts.add(new Option(t.name, t.name)));
    // Pan geo map to district
    const d = TN_DISTRICTS.find(x=>x.name===ds.value);
    if (d && geoMap) geoMap.setView([d.lat, d.lng], 11);
  };
  ts.onchange = () => {
    resetWard();
    getTalukWards(ds.value, ts.value).forEach(w => ws.add(new Option(w.name, w.name)));
  };
  ws.onchange = () => {
    if (ws.value && pc) {
      const pin = getWardPincode(ws.value);
      if (pin) { pc.value=pin; if(pa) pa.style.display='inline'; }
      else { pc.value=''; if(pa) pa.style.display='none'; }
    }
  };

  // Auto-fill user info if logged in
  if (isLoggedIn()) {
    const nameEl = document.getElementById('submit-name');
    const emailEl = document.getElementById('submit-email');
    if (nameEl && !nameEl.value) nameEl.value = currentUser.username;
    if (emailEl && !emailEl.value) emailEl.value = currentUser.email || '';
    const lp = document.getElementById('login-prompt-submit');
    if (lp) lp.style.display = 'none';
  } else {
    const lp = document.getElementById('login-prompt-submit');
    if (lp) lp.style.display = 'inline';
  }

  // Initialize geo-tag map
  initGeoMap();
}

function initGeoMap() {
  const container = document.getElementById('geo-map');
  if (!container) return;
  if (geoMap) { geoMap.invalidateSize(); return; }
  geoMap = L.map('geo-map').setView([10.75, 78.5], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'© OpenStreetMap'
  }).addTo(geoMap);
  geoMap.on('click', function(e) {
    setGeoPin(e.latlng.lat, e.latlng.lng);
  });
}

function setGeoPin(lat, lng) {
  selectedLat = lat; selectedLng = lng;
  document.getElementById('submit-lat').value = lat;
  document.getElementById('submit-lng').value = lng;
  const disp = document.getElementById('geo-coords-display');
  if (disp) { disp.textContent = `📍 ${lat.toFixed(5)}, ${lng.toFixed(5)}`; disp.classList.add('set'); }
  if (geoMap) {
    if (geoMarker) geoMarker.setLatLng([lat, lng]);
    else {
      geoMarker = L.marker([lat, lng], {
        icon: L.divIcon({ className:'', html:'<div style="width:28px;height:28px;background:var(--orange,#e67e22);border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.3)"></div>', iconAnchor:[14,14] })
      }).addTo(geoMap);
    }
  }
}

function clearGeoPin() {
  selectedLat = null; selectedLng = null;
  document.getElementById('submit-lat').value = '';
  document.getElementById('submit-lng').value = '';
  const disp = document.getElementById('geo-coords-display');
  if (disp) { disp.textContent='Click on the map below to pin your complaint location'; disp.classList.remove('set'); }
  if (geoMarker) { geoMarker.remove(); geoMarker = null; }
}

function geoLocateMe() {
  const btn = document.getElementById('geo-locate-btn');
  if (btn) btn.innerHTML = '<span class="spinner"></span>Locating…';
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude:lat, longitude:lng } = pos.coords;
      if (geoMap) geoMap.setView([lat, lng], 14);
      setGeoPin(lat, lng);
      if (btn) btn.innerHTML = '<i class="fa-solid fa-location-crosshairs me-1"></i>Use My Location';
    },
    err => {
      showToast('Location access denied or unavailable.');
      if (btn) btn.innerHTML = '<i class="fa-solid fa-location-crosshairs me-1"></i>Use My Location';
    }
  );
}

function resetSubmitForm() {
  clearGeoPin();
  document.getElementById('submit-taluk').innerHTML = '<option value="">-- Select Taluk --</option>';
  document.getElementById('submit-ward').innerHTML  = '<option value="">-- Select Ward --</option>';
  document.getElementById('pin-auto').style.display = 'none';
  if (geoMap) geoMap.setView([10.75, 78.5], 7);
}

window.handleSubmitComplaint = async function(e) {
  e.preventDefault();
  const f = e.target;
  const btn = document.getElementById('submit-btn');
  btn.innerHTML = '<span class="spinner"></span>Submitting…';
  btn.disabled = true;

  const complaint = {
    title:       f.querySelector('#submit-title').value.trim(),
    category:    f.querySelector('#submit-category').value,
    priority:    f.querySelector('#submit-priority').value || 'medium',
    district:    f.querySelector('#submit-district').value,
    taluk:       f.querySelector('#submit-taluk').value,
    ward:        f.querySelector('#submit-ward').value,
    pincode:     f.querySelector('#submit-pincode').value.trim(),
    address:     f.querySelector('#submit-address').value.trim(),
    landmark:    f.querySelector('#submit-landmark').value.trim(),
    description: f.querySelector('#submit-description').value.trim(),
    reportedBy:  f.querySelector('#submit-name').value.trim() || (isLoggedIn() ? currentUser.username : 'Anonymous'),
    phone:       f.querySelector('#submit-phone').value.trim(),
    email:       f.querySelector('#submit-email').value.trim(),
    userId:      currentUser?.id || null,
    lat:         parseFloat(f.querySelector('#submit-lat').value) || null,
    lng:         parseFloat(f.querySelector('#submit-lng').value) || null,
    geoTagged:   !!(f.querySelector('#submit-lat').value),
  };

  if (!complaint.title||!complaint.category||!complaint.district||!complaint.taluk||!complaint.ward||!complaint.pincode||!complaint.description) {
    showToast('Please fill all required fields.'); btn.innerHTML='<i class="fa-solid fa-paper-plane me-2"></i>Submit Complaint'; btn.disabled=false; return;
  }

  try {
    const all = await loadComplaints();
    const newId = Math.max(...all.map(x=>x.id), 0) + 1;
    const now = new Date().toISOString();
    // If no geo set, use district center with jitter
    const dist = TN_DISTRICTS.find(x=>x.name===complaint.district);
    if (!complaint.lat && dist) { complaint.lat = dist.lat+(Math.random()-.5)*.25; complaint.lng = dist.lng+(Math.random()-.5)*.25; }
    const full = { ...complaint, id:newId, status:'open', createdAt:now, updatedAt:now, resolution:'', updates:[] };
    all.push(full);
    await persistComplaints(all);
    f.reset();
    resetSubmitForm();
    showToast(`✓ Complaint #${newId} submitted successfully!`);
    if (isLoggedIn()) showPage('my-complaints');
    else showPage('dashboard');
  } catch (err) {
    showToast('Error: ' + err.message);
  }
  btn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Submit Complaint';
  btn.disabled = false;
};

// ── Districts Page ────────────────────────────────────────────────────────────
async function renderDistrictsPage() {
  const c = await loadComplaints();
  const stats = getDistrictStats(c).sort((a,b)=>b.total-a.total);
  const el = document.getElementById('districts-grid');
  if (!el) return;
  el.innerHTML = stats.map(d => {
    const resolvePct = d.total ? Math.round(d.resolved/d.total*100) : 0;
    const barColor = resolvePct>=70?'var(--green)':resolvePct>=40?'var(--amber)':'var(--red)';
    return `<div class="col-6 col-md-4 col-lg-3">
      <div class="district-card" onclick="viewDistrictFilter('${d.name}')">
        <div class="d-flex justify-content-between align-items-start mb-1">
          <div class="d-name">${d.name}</div>
          <span class="badge" style="background:var(--surface-2);color:var(--text-secondary);font-size:.65rem">${resolvePct}%</span>
        </div>
        <div class="d-hq">${d.headquarters}</div>
        <div class="d-count" style="margin:6px 0 4px">${d.total}</div>
        <div style="font-size:.71rem;color:var(--text-secondary);margin-bottom:6px">
          <span style="color:var(--red);font-weight:600">${d.open}</span> open &nbsp;·&nbsp;
          <span style="color:var(--green);font-weight:600">${d.resolved}</span> resolved
        </div>
        <div class="mini-bar"><div class="mini-bar-fill" style="width:${resolvePct}%;background:${barColor}"></div></div>
      </div>
    </div>`;
  }).join('');
}

window.viewDistrictFilter = function(name) {
  filterState.district=name; filterState.taluk=''; filterState.ward='';
  filterState.status=''; filterState.category=''; filterState.search='';
  showPage('complaints');
};

// ── My Complaints ─────────────────────────────────────────────────────────────
async function renderMyComplaints() {
  if (!isLoggedIn()) return;
  const list = document.getElementById('my-complaints-list');
  if (!list) return;
  list.innerHTML = '<div class="empty-state"><i class="fa-solid fa-spinner fa-spin"></i><p>Loading…</p></div>';

  const all = await loadComplaints();
  const mine = all.filter(x => x.userId === currentUser.id).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));

  if (!mine.length) {
    list.innerHTML = `<div class="empty-state"><i class="fa-solid fa-file-circle-plus"></i><p>You haven't submitted any complaints yet.</p><button class="btn-primary mt-3" onclick="showPage('submit')"><i class="fa-solid fa-plus me-1"></i>Submit Your First Complaint</button></div>`;
    return;
  }

  list.innerHTML = mine.map(c => `
    <div class="complaint-card status-${c.status}" id="card-${c.id}">
      <div class="complaint-header">
        <div>
          <div class="complaint-title">${c.title}</div>
          <div class="complaint-meta">
            <span><i class="fa-solid fa-hashtag"></i>#${c.id}</span>
            <span><i class="fa-solid fa-location-dot"></i>${c.ward}, ${c.district} ${c.pincode?`(${c.pincode})`:''}</span>
            <span><i class="fa-solid fa-tag"></i>${c.category}</span>
            <span><i class="fa-solid fa-calendar"></i>${fmtDate(c.createdAt)}</span>
          </div>
        </div>
        <div class="d-flex gap-1 flex-column align-items-end">
          <span class="badge badge-${c.status}">${STATUSES[c.status].label}</span>
          ${priBadge(c.priority)}
        </div>
      </div>
      <p style="font-size:.8rem;color:var(--gray);margin:0 0 8px">${c.description}</p>
      ${c.address||c.landmark?`<div style="font-size:.76rem;color:var(--gray)"><i class="fa-solid fa-map-pin me-1" style="color:var(--orange)"></i>${[c.address,c.landmark].filter(Boolean).join(' · ')}</div>`:''}
      ${(c.updates||[]).length?`<div class="timeline mt-2">${c.updates.slice(-3).map(u=>`<div class="timeline-item"><strong>${u.status}</strong> — ${u.note||'Status updated'}<span style="color:var(--gray);font-size:.7rem;display:block">${fmtDate(u.timestamp)}</span></div>`).join('')}</div>`:''}
      ${c.status!=='resolved'?`
        <div class="update-form" id="uform-${c.id}" style="display:none">
          <div class="row g-2">
            <div class="col-md-4"><select class="form-control" id="ustatus-${c.id}" style="font-size:.82rem">
              <option value="open" ${c.status==='open'?'selected':''}>Open</option>
              <option value="inprogress" ${c.status==='inprogress'?'selected':''}>In Progress</option>
              <option value="resolved">Resolved</option>
            </select></div>
            <div class="col-md-8"><input class="form-control" id="unote-${c.id}" type="text" placeholder="Add update note…" style="font-size:.82rem"/></div>
            <div class="col-12"><button class="btn-primary btn-sm" onclick="submitMyUpdate(${c.id})"><i class="fa-solid fa-check me-1"></i>Save Update</button> <button class="btn-ghost btn-sm" onclick="document.getElementById('uform-${c.id}').style.display='none'">Cancel</button></div>
          </div>
        </div>
        <button class="btn-ghost btn-sm mt-2" onclick="document.getElementById('uform-${c.id}').style.display=document.getElementById('uform-${c.id}').style.display==='none'?'block':'none'">
          <i class="fa-solid fa-pen-to-square me-1"></i>Add Update
        </button>` : `<div style="font-size:.8rem;color:var(--green);margin-top:6px"><i class="fa-solid fa-circle-check me-1"></i>${c.resolution||'Resolved'}</div>`}
    </div>
  `).join('');
}

window.submitMyUpdate = async function(id) {
  const status = document.getElementById(`ustatus-${id}`)?.value;
  const note   = document.getElementById(`unote-${id}`)?.value.trim();
  if (!status) return;
  try {
    const all = await loadComplaints();
    const i = all.findIndex(x=>x.id===id);
    if (i===-1) return;
    if (all[i].userId !== currentUser.id) { showToast('Not authorized.'); return; }
    all[i].status    = status;
    all[i].updatedAt = new Date().toISOString();
    all[i].updates   = [...(all[i].updates||[]), { status, note, timestamp:new Date().toISOString(), by:currentUser.username }];
    if (status==='resolved') all[i].resolution = note || 'Resolved by reporter';
    await persistComplaints(all);
    showToast('Complaint updated!');
    renderMyComplaints();
  } catch(e) { showToast('Error: '+e.message); }
};

// ── Chat Page ─────────────────────────────────────────────────────────────────
function renderChatPage() {
  if (!isLoggedIn()) { showPage('login'); return; }
  startChatPolling();
}

window.submitChat = function() {
  const inp = document.getElementById('chat-input');
  if (!inp?.value.trim()) return;
  sendChatMessage(inp.value);
  inp.value = '';
  inp.focus();
};

// ── Login / Register Page ─────────────────────────────────────────────────────
function renderLoginPage() {
  if (isLoggedIn()) { showPage('dashboard'); return; }
  // Populate district dropdown in register form
  const sel = document.getElementById('reg-district');
  if (sel && sel.options.length <= 1) {
    TN_DISTRICTS.forEach(d => sel.add(new Option(d.name, d.name)));
  }
}

window.switchAuthTab = function(tab) {
  document.querySelectorAll('.auth-tab').forEach((t,i) => t.classList.toggle('active', (i===0&&tab==='login')||(i===1&&tab==='register')));
  document.querySelectorAll('.auth-form').forEach((f,i) => f.classList.toggle('active', (i===0&&tab==='login')||(i===1&&tab==='register')));
  _clearAuthAlert();
};

window.handleLogin = async function(e) {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  btn.innerHTML='<span class="spinner"></span>Logging in…'; btn.disabled=true;
  _clearAuthAlert();
  try {
    await loginUser({
      username: document.getElementById('login-username').value,
      password: document.getElementById('login-password').value,
      remember: document.getElementById('login-remember').checked
    });
    showToast(`Welcome back, ${currentUser.username}!`);
    showPage('dashboard');
  } catch(err) {
    _showAuthAlert(err.message, 'error');
  }
  btn.innerHTML='<i class="fa-solid fa-right-to-bracket me-2"></i>Login'; btn.disabled=false;
};

window.handleRegister = async function(e) {
  e.preventDefault();
  const btn = document.getElementById('register-btn');
  btn.innerHTML='<span class="spinner"></span>Creating account…'; btn.disabled=true;
  _clearAuthAlert();
  try {
    await registerUser({
      username: document.getElementById('reg-username').value,
      email:    document.getElementById('reg-email').value,
      password: document.getElementById('reg-password').value,
      phone:    document.getElementById('reg-phone').value,
      district: document.getElementById('reg-district').value,
    });
    showToast(`Account created! Welcome, ${currentUser.username}!`);
    showPage('dashboard');
  } catch(err) {
    _showAuthAlert(err.message, 'error');
  }
  btn.innerHTML='<i class="fa-solid fa-user-plus me-2"></i>Create Account'; btn.disabled=false;
};

function _showAuthAlert(msg, type='error') {
  const el = document.getElementById('auth-alert');
  if (!el) return;
  el.className = `alert alert-${type}`;
  el.textContent = msg;
  el.style.display = 'block';
}
function _clearAuthAlert() {
  const el = document.getElementById('auth-alert');
  if (el) el.style.display = 'none';
}

// ── Setup / Config ────────────────────────────────────────────────────────────
function renderSetupPage() {
  _syncGHBadge();
  const bar = document.getElementById('setup-status-bar');
  const txt = document.getElementById('setup-status-text');
  if (!bar||!txt) return;
  if (isConfigured()) {
    bar.className='setup-status connected'; txt.textContent='GitHub storage configured and active.';
  } else {
    bar.className='setup-status unconfigured'; txt.textContent='Not configured — data stored in browser localStorage only.';
  }
}

window.handleSetupSave = async function(e) {
  e.preventDefault();
  const btn = document.getElementById('setup-save-btn');
  btn.innerHTML='<span class="spinner"></span>Testing connection…'; btn.disabled=true;
  saveGHConfig({
    token:  document.getElementById('setup-token').value,
    owner:  document.getElementById('setup-owner').value,
    repo:   document.getElementById('setup-repo').value,
    branch: document.getElementById('setup-branch').value || 'main',
  });
  try {
    const info = await testGHConnection();
    _syncGHBadge();
    renderSetupPage();
    showToast(`✓ Connected to ${info.full_name}`);
  } catch(err) {
    clearGHConfig();
    showToast('Connection failed: ' + err.message);
  }
  btn.innerHTML='<i class="fa-solid fa-plug me-2"></i>Test & Connect'; btn.disabled=false;
};

window.handleSetupInit = async function() {
  if (!isConfigured()) { showToast('Configure GitHub first.'); return; }
  try {
    await initGHStorage();
    showToast('✓ Data files initialized in GitHub repo.');
  } catch(e) { showToast('Error: '+e.message); }
};

window.handleSetupClear = function() {
  clearGHConfig();
  ['setup-token','setup-owner','setup-repo'].forEach(id => { const el=document.getElementById(id); if(el)el.value=''; });
  document.getElementById('setup-branch').value='main';
  renderSetupPage(); _syncGHBadge();
  showToast('GitHub config cleared. Using local storage.');
};

window.toggleTokenVis = function() {
  const inp = document.getElementById('setup-token');
  const eye = document.getElementById('token-eye');
  if (inp.type==='password') { inp.type='text'; eye.className='fa-solid fa-eye-slash'; }
  else { inp.type='password'; eye.className='fa-solid fa-eye'; }
};

function _syncGHBadge() {
  const el = document.getElementById('gh-status-badge');
  if (!el) return;
  if (isConfigured()) {
    el.innerHTML='<span class="cfg-badge"><i class="fa-solid fa-cloud me-1"></i>GitHub Sync</span>';
  } else {
    el.innerHTML='<span class="cfg-badge uncfg"><i class="fa-solid fa-hard-drive me-1"></i>Local Only</span>';
  }
}

// ── Update Status Modal (admin / all-complaints view) ─────────────────────────
window.openUpdateModal = async function(id) {
  const all = await loadComplaints();
  const c = all.find(x=>x.id===id); if(!c) return;
  document.getElementById('modal-cid').value   = id;
  document.getElementById('modal-title').textContent  = c.title;
  document.getElementById('modal-location').textContent = `${c.ward||''}, ${c.district}${c.pincode?' ('+c.pincode+')':''}`;
  document.getElementById('modal-badges').innerHTML = `<span class="badge badge-${c.status}" style="margin-right:5px">${STATUSES[c.status].label}</span>${priBadge(c.priority)}`;
  document.getElementById('modal-status').value = c.status;
  document.getElementById('modal-resolution').value = c.resolution||'';
  document.getElementById('resolve-modal').classList.add('open');
};

window.submitStatusUpdate = async function() {
  const id = parseInt(document.getElementById('modal-cid').value);
  const status = document.getElementById('modal-status').value;
  const note   = document.getElementById('modal-resolution').value.trim();
  try {
    const all = await loadComplaints();
    const i = all.findIndex(x=>x.id===id);
    if (i===-1) return;
    all[i].status    = status;
    all[i].resolution= note;
    all[i].updatedAt = new Date().toISOString();
    all[i].updates   = [...(all[i].updates||[]), { status, note, timestamp:new Date().toISOString(), by:currentUser?.username||'Admin' }];
    await persistComplaints(all);
    closeModal('resolve-modal');
    showToast('Complaint updated!');
    applyFilters();
  } catch(e) { showToast('Error: '+e.message); }
};

window.closeModal = function(id) { document.getElementById(id)?.classList.remove('open'); };

// ── Helpers ───────────────────────────────────────────────────────────────────
function getDistrictStats(complaints) {
  return TN_DISTRICTS.map(d => {
    const dc = complaints.filter(x=>x.district===d.name);
    return { ...d, total:dc.length, open:dc.filter(x=>x.status==='open').length, inprogress:dc.filter(x=>x.status==='inprogress').length, resolved:dc.filter(x=>x.status==='resolved').length };
  });
}
function getWardStats(districtName, complaints) {
  const d = TN_DISTRICTS.find(x=>x.name===districtName); if(!d) return [];
  return d.wards.map(ward => {
    const wc = complaints.filter(x=>x.district===districtName&&x.ward===ward);
    return { ward, total:wc.length, open:wc.filter(x=>x.status==='open').length, inprogress:wc.filter(x=>x.status==='inprogress').length, resolved:wc.filter(x=>x.status==='resolved').length };
  });
}
function priBadge(p) {
  const map = { low:'badge-low', medium:'badge-medium', high:'badge-high', urgent:'badge-urgent' };
  const labels = { low:'Low', medium:'Medium', high:'High', urgent:'Urgent' };
  const cls = map[p] || 'badge-low';
  return `<span class="badge ${cls}">${labels[p]||p||'—'}</span>`;
}
function fmtDate(iso) { return new Date(iso).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}); }
function showToast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.style.display='block';
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>{t.style.display='none';},3800);
}

// ── Economy Page ──────────────────────────────────────────────────────────────
function renderEconomyPage() {
  const latest = TN_ECONOMY[TN_ECONOMY.length - 1];
  const prev   = TN_ECONOMY[TN_ECONOMY.length - 2];

  // Stat cards
  document.getElementById('econ-gsdp').textContent     = '₹' + latest.gsdp.toFixed(2) + ' L Cr';
  document.getElementById('econ-gdp-growth').textContent = (latest.gsdpGrowth > 0 ? '+' : '') + latest.gsdpGrowth + '%';
  document.getElementById('econ-debt').textContent     = '₹' + latest.debt.toFixed(2) + ' L Cr';
  const ratio = ((latest.debt / latest.gsdp) * 100).toFixed(1);
  document.getElementById('econ-debt-ratio').textContent = ratio + '%';

  // Colour the growth card green/red
  const growthEl = document.getElementById('econ-gdp-growth');
  growthEl.style.color = latest.gsdpGrowth >= 0 ? 'var(--green)' : 'var(--red)';

  // GSDP growth chart
  const maxGdpG = Math.max(...TN_ECONOMY.map(r => Math.abs(r.gsdpGrowth)));
  const gdpChart = document.getElementById('gdp-growth-chart');
  if (gdpChart) gdpChart.innerHTML = TN_ECONOMY.map(r => {
    const pct = Math.abs(r.gsdpGrowth) / maxGdpG * 100;
    const color = r.gsdpGrowth < 0 ? 'var(--red)' : 'var(--blue2)';
    const label = (r.gsdpGrowth > 0 ? '+' : '') + r.gsdpGrowth + '%' + (r.estimated ? '*' : '');
    return `<div style="margin-bottom:9px">
      <div style="display:flex;justify-content:space-between;font-size:.76rem;margin-bottom:2px">
        <span>${r.year}${r.estimated ? ' <span style="font-size:.65rem;color:var(--gray)">(Est.)</span>' : ''}</span>
        <b style="color:${color}">${label}</b>
      </div>
      <div class="mini-bar"><div class="mini-bar-fill" style="width:${pct}%;background:${color}"></div></div>
    </div>`;
  }).join('');

  // Debt growth chart
  const maxDebtG = Math.max(...TN_ECONOMY.map(r => r.debtGrowth));
  const debtChart = document.getElementById('debt-growth-chart');
  if (debtChart) debtChart.innerHTML = TN_ECONOMY.map(r => {
    const pct = r.debtGrowth / maxDebtG * 100;
    const color = r.debtGrowth > 18 ? 'var(--red)' : r.debtGrowth > 14 ? 'var(--amber)' : 'var(--green)';
    return `<div style="margin-bottom:9px">
      <div style="display:flex;justify-content:space-between;font-size:.76rem;margin-bottom:2px">
        <span>${r.year}${r.estimated ? ' <span style="font-size:.65rem;color:var(--gray)">(Est.)</span>' : ''}</span>
        <b style="color:${color}">+${r.debtGrowth}%</b>
      </div>
      <div class="mini-bar"><div class="mini-bar-fill" style="width:${pct}%;background:${color}"></div></div>
    </div>`;
  }).join('');

  // Summary table
  const tbody = document.getElementById('econ-tbody');
  if (tbody) tbody.innerHTML = [...TN_ECONOMY].reverse().map(r => {
    const debtRatio = ((r.debt / r.gsdp) * 100).toFixed(1);
    const gColor = r.gsdpGrowth < 0 ? 'var(--red)' : r.gsdpGrowth >= 10 ? 'var(--green)' : 'var(--amber)';
    const dColor = r.debtGrowth > 18 ? 'var(--red)' : r.debtGrowth > 14 ? 'var(--amber)' : 'var(--green)';
    return `<tr${r.estimated ? ' style="background:#f8fafc"' : ''}>
      <td><strong>${r.year}</strong>${r.estimated ? ' <span class="badge" style="background:#e0f2fe;color:#0369a1;font-size:.65rem">Est.</span>' : ''}</td>
      <td>₹${r.gsdp.toFixed(2)} L Cr</td>
      <td><span style="font-weight:700;color:${gColor}">${r.gsdpGrowth > 0 ? '+' : ''}${r.gsdpGrowth}%</span></td>
      <td>₹${r.debt.toFixed(2)} L Cr</td>
      <td><span style="font-weight:700;color:${dColor}">+${r.debtGrowth}%</span></td>
      <td>${debtRatio}%</td>
    </tr>`;
  }).join('');
}
