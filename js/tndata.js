const TN_DISTRICTS=[
  {id:1,name:"Chennai",lat:13.0827,lng:80.2707,wards:["Anna Nagar","T. Nagar","Adyar","Tambaram","Velachery","Perambur","Royapuram","Mylapore"]},
  {id:2,name:"Coimbatore",lat:11.0168,lng:76.9558,wards:["RS Puram","Gandhipuram","Peelamedu","Singanallur","Saravanampatti","Ukkadam"]},
  {id:3,name:"Madurai",lat:9.9252,lng:78.1198,wards:["Anna Nagar","Tallakulam","KK Nagar","Avaniyapuram","Vilangudi","Thirupparankundram"]},
  {id:4,name:"Tiruchirappalli",lat:10.7905,lng:78.7047,wards:["Srirangam","Ariyamangalam","Golden Rock","Chatram","Thillai Nagar","Woraiyur"]},
  {id:5,name:"Salem",lat:11.6643,lng:78.1460,wards:["Shevapet","Suramangalam","Five Roads","Kondalampatti","Ammapet","Hasthampatti"]},
  {id:6,name:"Tirunelveli",lat:8.7139,lng:77.7567,wards:["Palayamkottai","Melapalayam","Pettai","Vannarpet","Krishnapuram","Nellai"]},
  {id:7,name:"Vellore",lat:12.9165,lng:79.1325,wards:["Katpadi","Sathuvachari","Bagayam","Gandhi Nagar","Konavattam","VIT Campus"]},
  {id:8,name:"Erode",lat:11.3410,lng:77.7172,wards:["Erode Town","Perundurai","Bhavani","Gobichettipalayam","Anthiyur","Kavindapadi"]},
  {id:9,name:"Thoothukudi",lat:8.7642,lng:78.1348,wards:["Harbour","Caldwell","Ettayapuram","Kovilpatti","Millerpuram","VOC Port"]},
  {id:10,name:"Dindigul",lat:10.3673,lng:77.9803,wards:["Dindigul Town","Palani","Oddanchatram","Natham","Kodaikanal","Vedasandur"]},
  {id:11,name:"Thanjavur",lat:10.7870,lng:79.1378,wards:["Thanjavur Town","Kumbakonam","Papanasam","Pattukottai","Thiruvidaimarudur","Orathanadu"]},
  {id:12,name:"Tiruppur",lat:11.1075,lng:77.3398,wards:["Tiruppur Town","Avinashi","Palladam","Udumalpet","Kangeyam","Dharapuram"]},
  {id:13,name:"Kancheepuram",lat:12.8342,lng:79.7036,wards:["Kancheepuram Town","Chengalpattu","Tambaram","Walajabad","Uthiramerur","Maduranthakam"]},
  {id:14,name:"Cuddalore",lat:11.7480,lng:79.7714,wards:["Cuddalore Town","Panruti","Chidambaram","Virudhachalam","Neyveli","Bhuvanagiri"]},
  {id:15,name:"Villupuram",lat:11.9389,lng:79.4933,wards:["Villupuram Town","Tindivanam","Gingee","Kallakurichi","Sankarapuram","Ulundurpet"]},
  {id:16,name:"Namakkal",lat:11.2189,lng:78.1674,wards:["Namakkal Town","Rasipuram","Paramathi","Velur","Tiruchengode","Kolli Hills"]},
  {id:17,name:"Krishnagiri",lat:12.5266,lng:78.2137,wards:["Krishnagiri Town","Hosur","Denkanikottai","Bargur","Veppanapalli","Uthangarai"]},
  {id:18,name:"Dharmapuri",lat:12.1281,lng:78.1576,wards:["Dharmapuri Town","Palacode","Pennagaram","Harur","Nallampalli","Pappireddipatti"]},
  {id:19,name:"Pudukkottai",lat:10.3797,lng:78.8202,wards:["Pudukkottai Town","Karaikudi","Aranthangi","Alangudi","Thirumayam","Gandarvakottai"]},
  {id:20,name:"Sivaganga",lat:9.8473,lng:78.4809,wards:["Sivaganga Town","Karaikudi","Manamadurai","Tiruppattur","Devakottai","Ilayangudi"]},
  {id:21,name:"Virudhunagar",lat:9.5851,lng:77.9624,wards:["Virudhunagar Town","Sivakasi","Rajapalayam","Sattur","Aruppukkottai","Srivilliputhur"]},
  {id:22,name:"Ramanathapuram",lat:9.3762,lng:78.8342,wards:["Ramanathapuram Town","Paramakudi","Mandapam","Rameswaram","Mudukulathur","Kadaladi"]},
  {id:23,name:"Tenkasi",lat:8.9594,lng:77.3152,wards:["Tenkasi Town","Kadayanallur","Sankarankovil","Alangulam","Shengottai","Veerakeralamputhur"]},
  {id:24,name:"Tiruvannamalai",lat:12.2253,lng:79.0747,wards:["Tiruvannamalai Town","Arni","Vandavasi","Chetpet","Kilpennathur","Polur"]},
  {id:25,name:"Nagapattinam",lat:10.7648,lng:79.8423,wards:["Nagapattinam Town","Mayiladuthurai","Sirkazhi","Vedaranyam","Kilvelur","Tharangambadi"]},
  {id:26,name:"Ariyalur",lat:11.1432,lng:79.0771,wards:["Ariyalur Town","Jayankondam","Sendurai","Andimadam","T. Palur","Udayarpalayam"]},
  {id:27,name:"Perambalur",lat:11.2333,lng:78.8833,wards:["Perambalur Town","Veppanthattai","Kunnam","Alathur","Eraiyur","Veppur"]},
  {id:28,name:"Karur",lat:10.9601,lng:78.0766,wards:["Karur Town","Kulithalai","Manapparai","Krishnarayapuram","Kadavur","Aravakurichi"]},
  {id:29,name:"Nilgiris",lat:11.4102,lng:76.6950,wards:["Ooty","Coonoor","Kotagiri","Gudalur","Pandalur","Kundah"]},
  {id:30,name:"Kallakurichi",lat:11.7363,lng:78.9598,wards:["Kallakurichi Town","Ulundurpet","Sankarapuram","Tirukoilur","Chinnasalem","Rishivandiyam"]},
  {id:31,name:"Ranipet",lat:12.9257,lng:79.3325,wards:["Ranipet Town","Arcot","Walajah","Sholinghur","Arakkonam","Nemili"]},
  {id:32,name:"Chengalpattu",lat:12.6921,lng:79.9759,wards:["Chengalpattu Town","Mahabalipuram","Tirukalukundram","Vandalur","Singaperumalkoil","Cheyyur"]},
  {id:33,name:"Tirupattur",lat:12.4964,lng:78.5728,wards:["Tirupattur Town","Vaniyambadi","Jolarpettai","Ambur","Gudiyattam","Natrampalli"]},
  {id:34,name:"Mayiladuthurai",lat:11.1026,lng:79.6516,wards:["Mayiladuthurai Town","Sirkazhi","Poompuhar","Tharangambadi","Kollidam","Sembanarkoil"]},
  {id:35,name:"Tiruvarur",lat:10.7734,lng:79.6341,wards:["Tiruvarur Town","Papanasam","Valangaiman","Nannilam","Mannargudi","Needamangalam"]},
  {id:36,name:"Theni",lat:10.0104,lng:77.4766,wards:["Theni Town","Bodinayakkanur","Uthamapalayam","Andipatti","Periyakulam","Cumbum"]},
  {id:37,name:"Tirupathur",lat:12.4964,lng:78.5728,wards:["Tirupathur Town","Vaniyambadi","Ambur","Jolarpettai","Madhanapalle","Pernambut"]},
  {id:38,name:"Kanyakumari",lat:8.0883,lng:77.5385,wards:["Nagercoil","Thuckalay","Colachel","Padmanabhapuram","Kuzhithurai","Marthandam"]}
];

const CATEGORIES=["Road & Infrastructure","Water Supply","Electricity","Sanitation & Waste","Street Lights","Drainage & Flooding","Parks & Recreation","Public Health","Building & Construction","Noise Pollution","Stray Animals","Others"];
const STATUSES={open:{label:"Open",color:"#ef4444"},inprogress:{label:"In Progress",color:"#f59e0b"},resolved:{label:"Resolved",color:"#22c55e"}};

function generateComplaints(){
  const complaints=[];let id=1;const now=Date.now();
  const T={"Road & Infrastructure":["Pothole on main road","Road repair needed","Broken footpath","Road flooding issue","Speed breaker damaged"],"Water Supply":["No water supply for 3 days","Contaminated water","Broken pipe leaking","Low water pressure","Water meter fault"],"Electricity":["Power outage since morning","Transformer fault","Loose wires hanging","Electric pole damaged","No power in street"],"Sanitation & Waste":["Garbage not collected","Overflowing bin","Illegal dumping","Dead animal on road","Open defecation area"],"Street Lights":["Street light not working","Bulb broken","Light pole fallen","Wiring exposed on pole","No lights in area"],"Drainage & Flooding":["Blocked drain causing flood","Overflowing sewage","Drain needs cleaning","Open manhole","Storm drain blocked"],"Parks & Recreation":["Park bench broken","Children play area unsafe","Garden maintenance needed","Lights in park not working","Encroachment in park"],"Public Health":["Mosquito breeding in area","Stagnant water","Illegal slaughterhouse","Hospital waste dumping","Food vendor unhygienic"],"Building & Construction":["Illegal construction","Building without permit","Encroachment on footpath","Wall collapse risk","Unsafe scaffold"],"Noise Pollution":["Loud speaker at night","Factory noise","DJ music till late","Vehicle horn misuse","Construction noise"],"Stray Animals":["Stray dogs attacking","Stray cattle on road","Animal carcass on road","Cattle in market area","Wild animals near school"],"Others":["Tree fallen on road","Banner blocking view","Hawker encroachment","Unauthorized sign board","Other civic issue"]};
  const S=["open","open","open","inprogress","inprogress","resolved"];
  TN_DISTRICTS.forEach(d=>{
    const n=Math.floor(Math.random()*25)+5;
    for(let i=0;i<n;i++){
      const cat=CATEGORIES[Math.floor(Math.random()*CATEGORIES.length)];
      const status=S[Math.floor(Math.random()*S.length)];
      const ward=d.wards[Math.floor(Math.random()*d.wards.length)];
      const date=new Date(now-Math.floor(Math.random()*30)*86400000);
      complaints.push({id:id++,title:T[cat][Math.floor(Math.random()*T[cat].length)],category:cat,district:d.name,districtId:d.id,ward,status,lat:d.lat+(Math.random()-.5)*.3,lng:d.lng+(Math.random()-.5)*.3,description:`Reported issue in ${ward}, ${d.name}. Requires immediate attention from local authorities.`,reportedBy:`Citizen #${Math.floor(Math.random()*9000)+1000}`,phone:`9${Math.floor(Math.random()*900000000)+100000000}`,createdAt:date.toISOString(),updatedAt:status!=="open"?new Date(date.getTime()+Math.random()*5*86400000).toISOString():date.toISOString(),resolution:status==="resolved"?"Issue has been addressed and resolved by concerned department.":""});
    }
  });
  return complaints;
}

function initData(){if(!localStorage.getItem("tn_complaints"))localStorage.setItem("tn_complaints",JSON.stringify(generateComplaints()));}
function getComplaints(){return JSON.parse(localStorage.getItem("tn_complaints")||"[]");}
function saveComplaints(c){localStorage.setItem("tn_complaints",JSON.stringify(c));}
function addComplaint(complaint){
  const c=getComplaints(),newId=Math.max(...c.map(x=>x.id),0)+1,now=new Date().toISOString();
  const d=TN_DISTRICTS.find(x=>x.name===complaint.district);
  c.push({...complaint,id:newId,status:"open",lat:d?d.lat+(Math.random()-.5)*.3:10,lng:d?d.lng+(Math.random()-.5)*.3:78,createdAt:now,updatedAt:now,resolution:""});
  saveComplaints(c);
}
function updateComplaintStatus(id,status,resolution=""){
  const c=getComplaints(),i=c.findIndex(x=>x.id===id);
  if(i!==-1){c[i].status=status;c[i].resolution=resolution;c[i].updatedAt=new Date().toISOString();saveComplaints(c);return c[i];}
  return null;
}
function getDistrictStats(){
  const c=getComplaints();
  return TN_DISTRICTS.map(d=>{const dc=c.filter(x=>x.district===d.name);return{...d,total:dc.length,open:dc.filter(x=>x.status==="open").length,inprogress:dc.filter(x=>x.status==="inprogress").length,resolved:dc.filter(x=>x.status==="resolved").length};});
}
function getWardStats(districtName){
  const c=getComplaints(),d=TN_DISTRICTS.find(x=>x.name===districtName);
  if(!d)return[];
  return d.wards.map(ward=>{const wc=c.filter(x=>x.district===districtName&&x.ward===ward);return{ward,total:wc.length,open:wc.filter(x=>x.status==="open").length,inprogress:wc.filter(x=>x.status==="inprogress").length,resolved:wc.filter(x=>x.status==="resolved").length};});
}
