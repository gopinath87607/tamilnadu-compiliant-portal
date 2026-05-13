let currentPage="dashboard",leafletMap=null,bubbleLayer=null;
let filterState={district:"",ward:"",category:"",status:"",search:""};

document.addEventListener("DOMContentLoaded",()=>{
  initData();
  document.getElementById("sidebar-year").textContent=new Date().getFullYear();
  document.querySelectorAll("[data-page]").forEach(el=>el.addEventListener("click",()=>showPage(el.dataset.page)));
  document.getElementById("hamburger-btn")?.addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
  showPage("dashboard");
});

function showPage(page){
  currentPage=page;
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.querySelectorAll("[data-page]").forEach(el=>el.classList.toggle("active",el.dataset.page===page));
  const el=document.getElementById(`page-${page}`);if(el)el.classList.add("active");
  const titles={dashboard:"Dashboard — Overview",map:"Complaint Map",complaints:"All Complaints",submit:"Submit New Complaint",districts:"District Overview"};
  document.getElementById("page-title").textContent=titles[page]||page;
  switch(page){case"dashboard":renderDashboard();break;case"map":renderMap();break;case"complaints":renderComplaintsPage();break;case"submit":renderSubmitForm();break;case"districts":renderDistrictsPage();break;}
}

function renderDashboard(){
  const c=getComplaints(),total=c.length,open=c.filter(x=>x.status==="open").length,inprog=c.filter(x=>x.status==="inprogress").length,resolved=c.filter(x=>x.status==="resolved").length,pct=total?Math.round(resolved/total*100):0;
  document.getElementById("stat-total").textContent=total;
  document.getElementById("stat-open").textContent=open;
  document.getElementById("stat-inprog").textContent=inprog;
  document.getElementById("stat-resolved").textContent=resolved;
  document.getElementById("stat-pct").textContent=pct+"%";
  const pb=document.getElementById("resolve-progress");if(pb){pb.style.width=pct+"%";pb.style.background=pct>70?"#22c55e":pct>40?"#f59e0b":"#ef4444";}
  const counts={};CATEGORIES.forEach(x=>counts[x]=0);c.forEach(x=>{if(counts[x.category]!==undefined)counts[x.category]++;});
  const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,6),max=sorted[0]?.[1]||1;
  const cc=document.getElementById("category-chart");if(cc)cc.innerHTML=sorted.map(([cat,n])=>`<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:.78rem;margin-bottom:3px"><span>${cat}</span><span style="font-weight:700">${n}</span></div><div class="mini-bar"><div class="mini-bar-fill" style="width:${n/max*100}%;background:var(--tn-blue)"></div></div></div>`).join("");
  const rc=document.getElementById("recent-complaints");if(rc)rc.innerHTML=[...c].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,8).map(x=>`<tr><td><span class="badge-status badge-${x.status}">${STATUSES[x.status].label}</span></td><td style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${x.title}</td><td>${x.district}</td><td><span style="font-size:.74rem;background:#f1f5f9;padding:2px 7px;border-radius:10px">${x.category}</span></td><td style="color:#6b7280;font-size:.78rem">${formatDate(x.createdAt)}</td></tr>`).join("");
  const stats=getDistrictStats().sort((a,b)=>b.total-a.total).slice(0,5),mx=stats[0]?.total||1;
  const td=document.getElementById("top-districts");if(td)td.innerHTML=stats.map(d=>`<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:3px"><span style="font-weight:600">${d.name}</span><span><span style="color:#ef4444">${d.open}</span> open, <span style="color:#22c55e">${d.resolved}</span> resolved</span></div><div class="mini-bar"><div class="mini-bar-fill" style="width:${d.total/mx*100}%;background:var(--tn-orange)"></div></div></div>`).join("");
}

function renderMap(){
  if(!leafletMap){
    leafletMap=L.map("main-map",{zoomControl:true}).setView([10.75,78.5],7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'© <a href="https://openstreetmap.org">OpenStreetMap</a>'}).addTo(leafletMap);
  }
  setTimeout(()=>leafletMap.invalidateSize(),100);
  showDistrictBubbles();
}

function showDistrictBubbles(){
  if(bubbleLayer)leafletMap.removeLayer(bubbleLayer);
  bubbleLayer=L.layerGroup();
  const stats=getDistrictStats(),maxT=Math.max(...stats.map(d=>d.total),1);
  stats.forEach(d=>{
    if(!d.total)return;
    const r=8+(d.total/maxT)*32,openP=d.open/d.total,resP=d.resolved/d.total;
    const color=openP>.6?"#ef4444":resP>.6?"#22c55e":"#f59e0b";
    const circle=L.circleMarker([d.lat,d.lng],{radius:r,fillColor:color,color:"#fff",weight:2,opacity:1,fillOpacity:0.78});
    circle.bindPopup(`<div class="popup-title">${d.name} District</div><div class="popup-stat"><span>Total</span><strong>${d.total}</strong></div><div class="popup-stat"><span style="color:#ef4444">Open</span><strong>${d.open}</strong></div><div class="popup-stat"><span style="color:#f59e0b">In Progress</span><strong>${d.inprogress}</strong></div><div class="popup-stat"><span style="color:#22c55e">Resolved</span><strong>${d.resolved}</strong></div><button class="popup-btn" onclick="drillIntoDistrict('${d.name}')">View Ward Map &rarr;</button>`);
    circle.on("mouseover",function(){this.openPopup();});circle.addTo(bubbleLayer);
  });
  bubbleLayer.addTo(leafletMap);
  const bc=document.getElementById("map-breadcrumb");if(bc)bc.innerHTML="<strong>Tamil Nadu &mdash; All Districts</strong>";
}

window.drillIntoDistrict=function(name){
  leafletMap.closePopup();if(bubbleLayer)leafletMap.removeLayer(bubbleLayer);bubbleLayer=L.layerGroup();
  const dist=TN_DISTRICTS.find(d=>d.name===name),complaints=getComplaints().filter(c=>c.district===name);
  const ws=getWardStats(name),maxT=Math.max(...ws.map(w=>w.total),1);
  leafletMap.setView([dist.lat,dist.lng],10);
  ws.forEach(w=>{
    if(!w.total)return;
    const wc=complaints.filter(c=>c.ward===w.ward);if(!wc.length)return;
    const lat=wc.reduce((s,c)=>s+c.lat,0)/wc.length,lng=wc.reduce((s,c)=>s+c.lng,0)/wc.length;
    const r=10+(w.total/maxT)*28,openP=w.open/w.total,resP=w.resolved/w.total;
    const color=openP>.6?"#ef4444":resP>.6?"#22c55e":"#f59e0b";
    const circle=L.circleMarker([lat,lng],{radius:r,fillColor:color,color:"#fff",weight:2,opacity:1,fillOpacity:0.82});
    circle.bindPopup(`<div class="popup-title">${w.ward}</div><div style="font-size:.75rem;color:#6b7280;margin-bottom:6px">${name}</div><div class="popup-stat"><span>Total</span><strong>${w.total}</strong></div><div class="popup-stat"><span style="color:#ef4444">Open</span><strong>${w.open}</strong></div><div class="popup-stat"><span style="color:#f59e0b">In Progress</span><strong>${w.inprogress}</strong></div><div class="popup-stat"><span style="color:#22c55e">Resolved</span><strong>${w.resolved}</strong></div><button class="popup-btn" onclick="viewWardComplaints('${name}','${w.ward}')">View Complaints &rarr;</button>`);
    circle.on("mouseover",function(){this.openPopup();});circle.addTo(bubbleLayer);
  });
  bubbleLayer.addTo(leafletMap);
  const bc=document.getElementById("map-breadcrumb");if(bc)bc.innerHTML=`<a onclick="showDistrictBubbles();leafletMap.setView([10.75,78.5],7)">&larr; Tamil Nadu</a> / <strong>${name}</strong>`;
};

window.viewWardComplaints=function(district,ward){filterState.district=district;filterState.ward=ward;filterState.status="";filterState.category="";leafletMap.closePopup();showPage("complaints");};

function renderComplaintsPage(){
  const ds=document.getElementById("filter-district"),ws=document.getElementById("filter-ward"),cs=document.getElementById("filter-category"),ss=document.getElementById("filter-status");if(!ds)return;
  ds.innerHTML=`<option value="">All Districts</option>`+TN_DISTRICTS.map(d=>`<option value="${d.name}" ${filterState.district===d.name?"selected":""}>${d.name}</option>`).join("");
  const upW=()=>{const d=TN_DISTRICTS.find(x=>x.name===ds.value);ws.innerHTML=`<option value="">All Wards</option>`+(d?d.wards.map(w=>`<option value="${w}" ${filterState.ward===w?"selected":""}>${w}</option>`).join(""):"");};
  upW();cs.innerHTML=`<option value="">All Categories</option>`+CATEGORIES.map(c=>`<option value="${c}" ${filterState.category===c?"selected":""}>${c}</option>`).join("");ss.value=filterState.status;
  ds.onchange=()=>{filterState.district=ds.value;filterState.ward="";upW();applyFilters();};
  ws.onchange=()=>{filterState.ward=ws.value;applyFilters();};
  cs.onchange=()=>{filterState.category=cs.value;applyFilters();};
  ss.onchange=()=>{filterState.status=ss.value;applyFilters();};
  const se=document.getElementById("filter-search");if(se){se.value=filterState.search;se.oninput=()=>{filterState.search=se.value;applyFilters();};}
  applyFilters();
}

function applyFilters(){
  let c=getComplaints();
  if(filterState.district)c=c.filter(x=>x.district===filterState.district);
  if(filterState.ward)c=c.filter(x=>x.ward===filterState.ward);
  if(filterState.category)c=c.filter(x=>x.category===filterState.category);
  if(filterState.status)c=c.filter(x=>x.status===filterState.status);
  if(filterState.search)c=c.filter(x=>x.title.toLowerCase().includes(filterState.search.toLowerCase())||x.description.toLowerCase().includes(filterState.search.toLowerCase()));
  c=[...c].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  document.getElementById("complaint-count").textContent=`${c.length} complaint${c.length!==1?"s":""}`;
  const tbody=document.getElementById("complaints-tbody");if(!tbody)return;
  if(!c.length){tbody.innerHTML=`<tr><td colspan="8"><div class="empty-state"><i class="fa-solid fa-inbox"></i><p>No complaints found</p></div></td></tr>`;return;}
  tbody.innerHTML=c.map(x=>`<tr><td style="font-weight:700;color:var(--tn-blue)">#${x.id}</td><td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${x.title}">${x.title}</td><td>${x.district}</td><td style="font-size:.8rem">${x.ward}</td><td><span style="font-size:.73rem;background:#f1f5f9;padding:2px 7px;border-radius:10px">${x.category}</span></td><td><span class="badge-status badge-${x.status}">${STATUSES[x.status].label}</span></td><td style="color:#6b7280;font-size:.78rem">${formatDate(x.createdAt)}</td><td>${x.status!=="resolved"?`<button class="btn-resolve" onclick="openResolveModal(${x.id})">Update</button>`:'<span style="color:#22c55e;font-size:.78rem">&#10003; Done</span>'}</td></tr>`).join("");
}

window.openResolveModal=function(id){
  const c=getComplaints().find(x=>x.id===id);if(!c)return;
  document.getElementById("modal-complaint-id").value=id;
  document.getElementById("modal-title").textContent=c.title;
  document.getElementById("modal-district").textContent=`${c.ward}, ${c.district}`;
  document.getElementById("modal-category").textContent=c.category;
  document.getElementById("modal-status").value=c.status;
  document.getElementById("modal-resolution").value=c.resolution||"";
  document.getElementById("resolve-modal").classList.add("open");
};
window.closeResolveModal=function(){document.getElementById("resolve-modal").classList.remove("open");};
window.submitResolveModal=function(){
  const id=parseInt(document.getElementById("modal-complaint-id").value);
  updateComplaintStatus(id,document.getElementById("modal-status").value,document.getElementById("modal-resolution").value);
  closeResolveModal();showToast("Complaint updated successfully!");applyFilters();
};

function renderSubmitForm(){
  const ds=document.getElementById("submit-district"),ws=document.getElementById("submit-ward"),cs=document.getElementById("submit-category");if(!ds)return;
  ds.innerHTML=`<option value="">-- Select District --</option>`+TN_DISTRICTS.map(d=>`<option value="${d.name}">${d.name}</option>`).join("");
  cs.innerHTML=`<option value="">-- Select Category --</option>`+CATEGORIES.map(c=>`<option value="${c}">${c}</option>`).join("");
  ds.onchange=()=>{const d=TN_DISTRICTS.find(x=>x.name===ds.value);ws.innerHTML=`<option value="">-- Select Ward --</option>`+(d?d.wards.map(w=>`<option value="${w}">${w}</option>`).join(""):"");};
}

window.handleSubmitComplaint=function(e){
  e.preventDefault();const f=e.target;
  const c={title:f.querySelector("#submit-title").value.trim(),category:f.querySelector("#submit-category").value,district:f.querySelector("#submit-district").value,ward:f.querySelector("#submit-ward").value,description:f.querySelector("#submit-description").value.trim(),reportedBy:f.querySelector("#submit-name").value.trim()||"Anonymous",phone:f.querySelector("#submit-phone").value.trim()};
  if(!c.title||!c.category||!c.district||!c.ward){showToast("Please fill all required fields.");return;}
  addComplaint(c);f.reset();renderSubmitForm();showToast("✓ Complaint submitted successfully! Complaint ID assigned.");
};

function renderDistrictsPage(){
  const stats=getDistrictStats().sort((a,b)=>b.total-a.total),el=document.getElementById("districts-grid");if(!el)return;
  el.innerHTML=stats.map(d=>`<div class="col-6 col-md-4 col-lg-3"><div class="district-card" onclick="viewDistrictComplaints('${d.name}')"><div class="d-name">${d.name}</div><div class="d-count" style="color:${d.open>d.resolved?'#ef4444':'#22c55e'}">${d.total}</div><div style="font-size:.74rem;color:#6b7280;margin-top:4px"><span style="color:#ef4444">&#9679;</span> ${d.open} open &nbsp;<span style="color:#22c55e">&#9679;</span> ${d.resolved} resolved</div><div class="mini-bar" style="margin-top:8px"><div class="mini-bar-fill" style="width:${d.total?d.resolved/d.total*100:0}%;background:#22c55e"></div></div></div></div>`).join("");
}

window.viewDistrictComplaints=function(name){filterState.district=name;filterState.ward="";filterState.status="";filterState.category="";filterState.search="";showPage("complaints");};

function formatDate(iso){const d=new Date(iso);return d.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.style.display="block";setTimeout(()=>{t.style.display="none";},3500);}
