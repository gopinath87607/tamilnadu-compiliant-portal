// Tamil Nadu — 38 Districts, 261 Taluks, 1200+ Wards with PIN codes
// Structure: District → Taluk → Ward (with pincode)
// Flat d.wards[] computed at end for backward compatibility

const TN_DISTRICTS=[
/* ── 1. Chennai ─────────────────────────────────────────── */
{id:1,name:"Chennai",lat:13.0827,lng:80.2707,headquarters:"Chennai",taluks:[
  {name:"Thiruvottiyur Zone",wards:[
    {name:"Thiruvottiyur",pincode:"600019"},{name:"Kathivakkam",pincode:"600057"},
    {name:"Kodungaiyur",pincode:"600118"},{name:"Manali",pincode:"600068"},
    {name:"Manali New Town",pincode:"600103"},{name:"Madhavaram",pincode:"600060"},
    {name:"Kolathur",pincode:"600099"},{name:"Villivakkam",pincode:"600049"}
  ]},
  {name:"Ambattur Zone",wards:[
    {name:"Ambattur",pincode:"600053"},{name:"Avadi",pincode:"600054"},
    {name:"Poonamallee",pincode:"600056"},{name:"Mogappair East",pincode:"600037"},
    {name:"Mogappair West",pincode:"600058"},{name:"Ambattur Industrial Estate",pincode:"600058"},
    {name:"Koyambedu",pincode:"600107"},{name:"Arumbakkam",pincode:"600106"}
  ]},
  {name:"Anna Nagar Zone",wards:[
    {name:"Anna Nagar East",pincode:"600102"},{name:"Anna Nagar West",pincode:"600040"},
    {name:"Kilpauk",pincode:"600010"},{name:"Aminjikarai",pincode:"600029"},
    {name:"Ayanavaram",pincode:"600023"},{name:"Purasaiwalkam",pincode:"600007"},
    {name:"Perambur",pincode:"600011"},{name:"Villivakkam",pincode:"600049"}
  ]},
  {name:"Teynampet Zone",wards:[
    {name:"T. Nagar",pincode:"600017"},{name:"Nungambakkam",pincode:"600034"},
    {name:"Alwarpet",pincode:"600018"},{name:"Teynampet",pincode:"600018"},
    {name:"Gopalapuram",pincode:"600086"},{name:"Abhiramapuram",pincode:"600018"},
    {name:"Saidapet",pincode:"600015"},{name:"Shenoy Nagar",pincode:"600030"}
  ]},
  {name:"Kodambakkam Zone",wards:[
    {name:"Kodambakkam",pincode:"600024"},{name:"Virugambakkam",pincode:"600092"},
    {name:"Valasaravakkam",pincode:"600087"},{name:"Saligramam",pincode:"600093"},
    {name:"Vadapalani",pincode:"600026"},{name:"Nerkundram",pincode:"600107"},
    {name:"Porur",pincode:"600116"},{name:"Ramapuram",pincode:"600089"}
  ]},
  {name:"Adyar Zone",wards:[
    {name:"Adyar",pincode:"600020"},{name:"Besant Nagar",pincode:"600090"},
    {name:"Thiruvanmiyur",pincode:"600041"},{name:"Mylapore",pincode:"600004"},
    {name:"Mandaveli",pincode:"600028"},{name:"Alandur",pincode:"600016"},
    {name:"St. Thomas Mount",pincode:"600016"},{name:"Nanganallur",pincode:"600061"}
  ]},
  {name:"Sholinganallur Zone",wards:[
    {name:"Sholinganallur",pincode:"600119"},{name:"Perungudi",pincode:"600096"},
    {name:"Pallikaranai",pincode:"600100"},{name:"Madipakkam",pincode:"600091"},
    {name:"Velachery",pincode:"600042"},{name:"Guindy",pincode:"600032"},
    {name:"Chromepet",pincode:"600044"},{name:"Pammal",pincode:"600075"}
  ]},
  {name:"Tambaram Zone",wards:[
    {name:"Tambaram",pincode:"600045"},{name:"Pallavaram",pincode:"600043"},
    {name:"Chromepet",pincode:"600044"},{name:"Mudichur",pincode:"600048"},
    {name:"Vandalur",pincode:"600048"},{name:"Selaiyur",pincode:"600073"},
    {name:"Perungalathur",pincode:"600063"},{name:"Kundrathur",pincode:"600069"}
  ]},
  {name:"Royapuram Zone",wards:[
    {name:"Royapuram",pincode:"600013"},{name:"Tondiarpet",pincode:"600081"},
    {name:"Washermanpet",pincode:"600021"},{name:"Harbour",pincode:"600001"},
    {name:"Parrys Corner",pincode:"600001"},{name:"Sowcarpet",pincode:"600079"},
    {name:"Park Town",pincode:"600003"},{name:"Flower Bazaar",pincode:"600001"}
  ]},
]},

/* ── 2. Coimbatore ──────────────────────────────────────── */
{id:2,name:"Coimbatore",lat:11.0168,lng:76.9558,headquarters:"Coimbatore",taluks:[
  {name:"Coimbatore North",wards:[
    {name:"Gandhipuram",pincode:"641012"},{name:"Saravanampatti",pincode:"641035"},
    {name:"Vadavalli",pincode:"641041"},{name:"Kalapatti",pincode:"641048"},
    {name:"Vellalore",pincode:"641111"},{name:"Edayarpalayam",pincode:"641025"},
    {name:"Kavundampalayam",pincode:"641030"},{name:"Kovaipudur",pincode:"641042"}
  ]},
  {name:"Coimbatore South",wards:[
    {name:"RS Puram",pincode:"641002"},{name:"Peelamedu",pincode:"641004"},
    {name:"Singanallur",pincode:"641005"},{name:"Ukkadam",pincode:"641001"},
    {name:"Ganapathy",pincode:"641006"},{name:"Race Course",pincode:"641018"},
    {name:"Podanur",pincode:"641023"},{name:"Siddhapudur",pincode:"641044"}
  ]},
  {name:"Mettupalayam",wards:[
    {name:"Mettupalayam Town",pincode:"641301"},{name:"Karamadai",pincode:"641104"},
    {name:"Sirumugai",pincode:"641302"},{name:"Aliyar",pincode:"642101"},
    {name:"Negamam",pincode:"642003"}
  ]},
  {name:"Pollachi",wards:[
    {name:"Pollachi Town",pincode:"642001"},{name:"Anamalai",pincode:"642003"},
    {name:"Valparai",pincode:"642127"},{name:"Ettimanur",pincode:"642005"},
    {name:"Kinathukadavu",pincode:"642201"},{name:"Madukarai",pincode:"641105"}
  ]},
  {name:"Annur",wards:[
    {name:"Annur Town",pincode:"641653"},{name:"Avinashi",pincode:"641654"},
    {name:"Periyanaickenpalayam",pincode:"641020"},{name:"Thondamuthur",pincode:"641032"}
  ]},
  {name:"Sulur",wards:[
    {name:"Sulur",pincode:"641401"},{name:"Irugur",pincode:"641103"},
    {name:"Chettipalayam",pincode:"641201"},{name:"Narasimhanaickenpalayam",pincode:"641031"}
  ]},
]},

/* ── 3. Madurai ─────────────────────────────────────────── */
{id:3,name:"Madurai",lat:9.9252,lng:78.1198,headquarters:"Madurai",taluks:[
  {name:"Madurai North",wards:[
    {name:"Anna Nagar",pincode:"625020"},{name:"KK Nagar",pincode:"625021"},
    {name:"Vilangudi",pincode:"625018"},{name:"Kochadai",pincode:"625016"},
    {name:"Aruppukkottai Road",pincode:"625011"},{name:"Thirumangalam",pincode:"625010"},
    {name:"Narimedu",pincode:"625002"},{name:"Sivagangai Road",pincode:"625009"}
  ]},
  {name:"Madurai South",wards:[
    {name:"Tallakulam",pincode:"625002"},{name:"Thirupparankundram",pincode:"625005"},
    {name:"Avaniyapuram",pincode:"625012"},{name:"Teppakulam",pincode:"625001"},
    {name:"Goripalayam",pincode:"625002"},{name:"Palanganatham",pincode:"625003"},
    {name:"Simmakkal",pincode:"625001"},{name:"Mattuthavani",pincode:"625107"}
  ]},
  {name:"Tirumangalam",wards:[
    {name:"Tirumangalam Town",pincode:"625706"},{name:"Kallupatti",pincode:"625701"},
    {name:"Usilampatti",pincode:"625532"},{name:"Sedapatti",pincode:"625704"},
    {name:"Checkanurani",pincode:"625703"}
  ]},
  {name:"Melur",wards:[
    {name:"Melur Town",pincode:"625106"},{name:"Keelaiyur",pincode:"625107"},
    {name:"Sakkimangalam",pincode:"625103"},{name:"T. Kallupatti",pincode:"625104"}
  ]},
  {name:"Peraiyur",wards:[
    {name:"Peraiyur Town",pincode:"625601"},{name:"Chellampatti",pincode:"625602"},
    {name:"Alagarkoil",pincode:"625301"},{name:"Sholavandan",pincode:"625215"}
  ]},
]},

/* ── 4. Tiruchirappalli ─────────────────────────────────── */
{id:4,name:"Tiruchirappalli",lat:10.7905,lng:78.7047,headquarters:"Tiruchirappalli",taluks:[
  {name:"Tiruchirappalli",wards:[
    {name:"Chatram",pincode:"620002"},{name:"Thillai Nagar",pincode:"620018"},
    {name:"Woraiyur",pincode:"620003"},{name:"Cantonment",pincode:"620001"},
    {name:"KK Nagar Trichy",pincode:"620021"},{name:"Puthur",pincode:"620017"},
    {name:"Ariyamangalam",pincode:"620010"},{name:"Mannarpuram",pincode:"620020"}
  ]},
  {name:"Srirangam",wards:[
    {name:"Srirangam",pincode:"620006"},{name:"Thiruverumbur",pincode:"620013"},
    {name:"Panchapur",pincode:"621213"},{name:"Kailasapuram",pincode:"620014"},
    {name:"Vayalur",pincode:"621010"}
  ]},
  {name:"Lalgudi",wards:[
    {name:"Lalgudi Town",pincode:"621601"},{name:"Manikandam",pincode:"621005"},
    {name:"Thumbalam",pincode:"621602"},{name:"Pullambadi",pincode:"621714"}
  ]},
  {name:"Musiri",wards:[
    {name:"Musiri Town",pincode:"621201"},{name:"Thuraiyur",pincode:"621010"},
    {name:"Marungapuri",pincode:"621301"},{name:"Uppiliyapuram",pincode:"621102"}
  ]},
  {name:"Manapparai",wards:[
    {name:"Manapparai Town",pincode:"621306"},{name:"Viralimalai",pincode:"621316"},
    {name:"Karur Road",pincode:"621307"},{name:"Navalpattu",pincode:"621005"}
  ]},
  {name:"Golden Rock",wards:[
    {name:"Golden Rock",pincode:"620004"},{name:"Kattur",pincode:"620019"},
    {name:"Karumandapam",pincode:"620001"},{name:"Edamalaipattipudur",pincode:"620012"}
  ]},
]},

/* ── 5. Salem ───────────────────────────────────────────── */
{id:5,name:"Salem",lat:11.6643,lng:78.1460,headquarters:"Salem",taluks:[
  {name:"Salem",wards:[
    {name:"Shevapet",pincode:"636002"},{name:"Suramangalam",pincode:"636005"},
    {name:"Hasthampatti",pincode:"636007"},{name:"Ammapet",pincode:"636003"},
    {name:"Kondalampatti",pincode:"636010"},{name:"Five Roads",pincode:"636004"},
    {name:"Fairlands",pincode:"636016"},{name:"Swarnapuri",pincode:"636004"},
    {name:"Alagapuram",pincode:"636004"}
  ]},
  {name:"Omalur",wards:[
    {name:"Omalur Town",pincode:"636455"},{name:"Edapadi",pincode:"637101"},
    {name:"Mecheri",pincode:"636453"},{name:"Valappadi",pincode:"636115"},
    {name:"Veerapandi",pincode:"636101"}
  ]},
  {name:"Mettur",wards:[
    {name:"Mettur Town",pincode:"636401"},{name:"Mettur Dam",pincode:"636402"},
    {name:"Peddanaickenpalayam",pincode:"636403"},{name:"Kuppanur",pincode:"636455"}
  ]},
  {name:"Attur",wards:[
    {name:"Attur Town",pincode:"636102"},{name:"Yercaud",pincode:"636601"},
    {name:"Thalaivasal",pincode:"636112"},{name:"Gangavalli",pincode:"636105"},
    {name:"Vazhapadi",pincode:"636115"}
  ]},
  {name:"Sankari",wards:[
    {name:"Sankari Town",pincode:"637301"},{name:"Tiruchengode",pincode:"637211"},
    {name:"Komarapalayam",pincode:"638183"},{name:"Idappadi",pincode:"637101"},
    {name:"Erumapalayam",pincode:"636015"}
  ]},
  {name:"Yercaud",wards:[
    {name:"Yercaud Hills",pincode:"636601"},{name:"Servarayan Hills",pincode:"636602"},
    {name:"Pagoda Point",pincode:"636601"}
  ]},
]},

/* ── 6. Tirunelveli ─────────────────────────────────────── */
{id:6,name:"Tirunelveli",lat:8.7139,lng:77.7567,headquarters:"Tirunelveli",taluks:[
  {name:"Tirunelveli",wards:[
    {name:"Palayamkottai",pincode:"627002"},{name:"Tirunelveli Town",pincode:"627001"},
    {name:"Vannarpet",pincode:"627003"},{name:"Melapalayam",pincode:"627005"},
    {name:"Pettai",pincode:"627004"},{name:"Krishnapuram",pincode:"627011"},
    {name:"Nehruji Nagar",pincode:"627007"},{name:"Maharajanagar",pincode:"627011"}
  ]},
  {name:"Ambasamudram",wards:[
    {name:"Ambasamudram Town",pincode:"627401"},{name:"Cheranmahadevi",pincode:"627414"},
    {name:"Papanasam Dam",pincode:"627415"},{name:"Manimuthar",pincode:"627408"},
    {name:"Sengottai",pincode:"627809"}
  ]},
  {name:"Nanguneri",wards:[
    {name:"Nanguneri Town",pincode:"627108"},{name:"Radhapuram",pincode:"627111"},
    {name:"Thisayanvilai",pincode:"627657"},{name:"Vikramasingapuram",pincode:"627108"}
  ]},
  {name:"Valliyoor",wards:[
    {name:"Valliyoor Town",pincode:"627117"},{name:"Kalakad",pincode:"627502"},
    {name:"Mukkudal",pincode:"627753"},{name:"Kayamozhi",pincode:"627752"}
  ]},
  {name:"Palayamkottai",wards:[
    {name:"Junction",pincode:"627001"},{name:"Nellai Nagar",pincode:"627006"},
    {name:"NGO Colony",pincode:"627007"},{name:"Ananda Nagar",pincode:"627002"}
  ]},
]},

/* ── 7. Vellore ─────────────────────────────────────────── */
{id:7,name:"Vellore",lat:12.9165,lng:79.1325,headquarters:"Vellore",taluks:[
  {name:"Vellore",wards:[
    {name:"Katpadi",pincode:"632007"},{name:"Sathuvachari",pincode:"632009"},
    {name:"Bagayam",pincode:"632002"},{name:"Gandhi Nagar",pincode:"632006"},
    {name:"VIT Campus",pincode:"632014"},{name:"Konavattam",pincode:"632003"},
    {name:"Kosapet",pincode:"632001"},{name:"Officers Line",pincode:"632001"},
    {name:"Virudhambut",pincode:"632004"}
  ]},
  {name:"Gudiyattam",wards:[
    {name:"Gudiyattam Town",pincode:"632602"},{name:"Kalavai",pincode:"632454"},
    {name:"Pernambut",pincode:"635810"},{name:"Melvisharam",pincode:"632509"}
  ]},
  {name:"Wallajah",wards:[
    {name:"Walajah Town",pincode:"632513"},{name:"Arcot",pincode:"632503"},
    {name:"Pernamallur",pincode:"632505"},{name:"Musiri Vilagam",pincode:"632514"}
  ]},
  {name:"Anaicut",wards:[
    {name:"Anaicut",pincode:"632101"},{name:"Kannamangalam",pincode:"632102"},
    {name:"Alangayam",pincode:"635701"},{name:"Natrampalli",pincode:"635851"}
  ]},
  {name:"Sholinghur",wards:[
    {name:"Sholinghur Town",pincode:"631102"},{name:"Arakkonam",pincode:"631001"},
    {name:"Nemili",pincode:"631051"},{name:"Thiruparkadal",pincode:"631302"}
  ]},
]},

/* ── 8. Erode ───────────────────────────────────────────── */
{id:8,name:"Erode",lat:11.3410,lng:77.7172,headquarters:"Erode",taluks:[
  {name:"Erode",wards:[
    {name:"Erode Town",pincode:"638001"},{name:"Kavindapadi",pincode:"638455"},
    {name:"Perundurai",pincode:"638052"},{name:"Surampatti",pincode:"638003"},
    {name:"Veerappanchatram",pincode:"638002"},{name:"Erode East",pincode:"638011"},
    {name:"Chithode",pincode:"638102"},{name:"Kasipalayam",pincode:"638302"}
  ]},
  {name:"Bhavani",wards:[
    {name:"Bhavani Town",pincode:"638301"},{name:"Anthiyur",pincode:"638501"},
    {name:"Bhavanisagar",pincode:"638451"},{name:"Ingur",pincode:"638302"},
    {name:"Satyamangalam",pincode:"638401"}
  ]},
  {name:"Gobichettipalayam",wards:[
    {name:"Gobichettipalayam Town",pincode:"638452"},{name:"Talavadi",pincode:"638461"},
    {name:"Sathyamangalam",pincode:"638401"},{name:"Hasanur",pincode:"638462"},
    {name:"Thalavadi Forest",pincode:"638463"}
  ]},
  {name:"Kangeyam",wards:[
    {name:"Kangeyam Town",pincode:"638701"},{name:"Dharapuram",pincode:"638656"},
    {name:"Palladam",pincode:"641662"},{name:"Vellakoil",pincode:"638111"},
    {name:"Uthukuli",pincode:"638752"}
  ]},
]},

/* ── 9. Thoothukudi ─────────────────────────────────────── */
{id:9,name:"Thoothukudi",lat:8.7642,lng:78.1348,headquarters:"Thoothukudi",taluks:[
  {name:"Thoothukudi",wards:[
    {name:"Harbour",pincode:"628001"},{name:"Millerpuram",pincode:"628008"},
    {name:"Caldwell Colony",pincode:"628002"},{name:"VOC Port Area",pincode:"628004"},
    {name:"Toovipuram",pincode:"628005"},{name:"Meelavittan",pincode:"628007"},
    {name:"Sipcot",pincode:"628008"},{name:"Annanagar Thoothukudi",pincode:"628003"}
  ]},
  {name:"Kovilpatti",wards:[
    {name:"Kovilpatti Town",pincode:"628501"},{name:"Ettayapuram",pincode:"628601"},
    {name:"Kadambur",pincode:"628502"},{name:"Kayathar",pincode:"628952"}
  ]},
  {name:"Srivaikundam",wards:[
    {name:"Srivaikundam Town",pincode:"628601"},{name:"Ottapidaram",pincode:"628101"},
    {name:"Kayalpatnam",pincode:"628204"},{name:"Mukkuperi",pincode:"628216"}
  ]},
  {name:"Sathankulam",wards:[
    {name:"Sathankulam Town",pincode:"628704"},{name:"Vilathikulam",pincode:"628902"},
    {name:"Pudur",pincode:"628721"},{name:"Thisayanvilai",pincode:"627657"}
  ]},
  {name:"Tiruchendur",wards:[
    {name:"Tiruchendur Town",pincode:"628215"},{name:"Alwarthirunagari",pincode:"628101"},
    {name:"Manapad",pincode:"628216"},{name:"Arumuganeri",pincode:"628202"}
  ]},
]},

/* ── 10. Dindigul ───────────────────────────────────────── */
{id:10,name:"Dindigul",lat:10.3673,lng:77.9803,headquarters:"Dindigul",taluks:[
  {name:"Dindigul",wards:[
    {name:"Dindigul Town",pincode:"624001"},{name:"Dindigul East",pincode:"624005"},
    {name:"Neikarappatti",pincode:"624003"},{name:"Thadicombu",pincode:"624004"},
    {name:"Begampur",pincode:"624006"},{name:"Rajaji Nagar",pincode:"624005"}
  ]},
  {name:"Palani",wards:[
    {name:"Palani Town",pincode:"624601"},{name:"Vedasandur",pincode:"624801"},
    {name:"Oddanchatram",pincode:"624619"},{name:"Natham",pincode:"624401"},
    {name:"Chinnalapatti",pincode:"624403"}
  ]},
  {name:"Kodaikanal",wards:[
    {name:"Kodaikanal Town",pincode:"624101"},{name:"Kodaikanal Hills",pincode:"624102"},
    {name:"Perumalmalai",pincode:"624103"},{name:"Berijam",pincode:"624104"},
    {name:"Poomparai",pincode:"624104"}
  ]},
  {name:"Athoor",wards:[
    {name:"Athoor Town",pincode:"624701"},{name:"Silukuvarpatti",pincode:"624702"},
    {name:"Nilakottai",pincode:"624208"},{name:"Gujiliamparai",pincode:"624703"}
  ]},
  {name:"Sanarpatti",wards:[
    {name:"Sanarpatti",pincode:"624402"},{name:"Vadamadurai",pincode:"624802"},
    {name:"Batlagundu",pincode:"624202"}
  ]},
]},

/* ── 11. Thanjavur ──────────────────────────────────────── */
{id:11,name:"Thanjavur",lat:10.7870,lng:79.1378,headquarters:"Thanjavur",taluks:[
  {name:"Thanjavur",wards:[
    {name:"Thanjavur Town",pincode:"613001"},{name:"Thanjavur East",pincode:"613002"},
    {name:"Thanjavur West",pincode:"613003"},{name:"Medical College Ward",pincode:"613004"},
    {name:"Vallam",pincode:"613403"},{name:"Thiruvaiyaru",pincode:"613204"}
  ]},
  {name:"Kumbakonam",wards:[
    {name:"Kumbakonam Town",pincode:"612001"},{name:"Thiruvidaimarudur",pincode:"612104"},
    {name:"Aduthurai",pincode:"612101"},{name:"Papanasam",pincode:"614205"},
    {name:"Swamimalai",pincode:"612302"},{name:"Darasuram",pincode:"612702"}
  ]},
  {name:"Orathanadu",wards:[
    {name:"Orathanadu Town",pincode:"614625"},{name:"Thiruvaiyaru",pincode:"613204"},
    {name:"Budalur",pincode:"613401"},{name:"Boothalur",pincode:"614625"}
  ]},
  {name:"Pattukottai",wards:[
    {name:"Pattukottai Town",pincode:"614601"},{name:"Peravurani",pincode:"614804"},
    {name:"Aranthangi",pincode:"614616"},{name:"Karambayam",pincode:"614614"}
  ]},
  {name:"Papanasam",wards:[
    {name:"Papanasam Town",pincode:"614205"},{name:"Thirukkattupalli",pincode:"614902"},
    {name:"Madukkur",pincode:"614903"},{name:"HuzurGranth",pincode:"613401"}
  ]},
]},

/* ── 12. Tiruppur ───────────────────────────────────────── */
{id:12,name:"Tiruppur",lat:11.1075,lng:77.3398,headquarters:"Tiruppur",taluks:[
  {name:"Tiruppur North",wards:[
    {name:"Tiruppur Town",pincode:"641601"},{name:"Sarovaram",pincode:"641602"},
    {name:"Perumanallur",pincode:"641651"},{name:"Veerapandi",pincode:"641605"},
    {name:"Anupparpalayam",pincode:"641652"}
  ]},
  {name:"Tiruppur South",wards:[
    {name:"Kasipalayam",pincode:"641604"},{name:"Rayapuram",pincode:"641605"},
    {name:"Velampalayam",pincode:"641606"},{name:"Muthur",pincode:"641607"},
    {name:"Mangalam",pincode:"641653"}
  ]},
  {name:"Avinashi",wards:[
    {name:"Avinashi Town",pincode:"641654"},{name:"Cheyur",pincode:"641655"},
    {name:"Pichanur",pincode:"641021"},{name:"Madathukulam",pincode:"642127"}
  ]},
  {name:"Palladam",wards:[
    {name:"Palladam Town",pincode:"641662"},{name:"Mulanur",pincode:"638106"},
    {name:"Avinashipalayam",pincode:"641663"},{name:"Etipur",pincode:"641663"}
  ]},
  {name:"Udumalpet",wards:[
    {name:"Udumalpet Town",pincode:"642126"},{name:"Gudimangalam",pincode:"641201"},
    {name:"Dharapuram",pincode:"638656"},{name:"Kangeyam",pincode:"638701"}
  ]},
]},

/* ── 13. Kancheepuram ───────────────────────────────────── */
{id:13,name:"Kancheepuram",lat:12.8342,lng:79.7036,headquarters:"Kancheepuram",taluks:[
  {name:"Kancheepuram",wards:[
    {name:"Kancheepuram Town",pincode:"631501"},{name:"Walajabad",pincode:"631605"},
    {name:"Uthiramerur",pincode:"603406"},{name:"Kancheepuram East",pincode:"631502"},
    {name:"Thirukazhukundram",pincode:"603109"}
  ]},
  {name:"Sriperumbudur",wards:[
    {name:"Sriperumbudur Town",pincode:"602105"},{name:"Oragadam",pincode:"602105"},
    {name:"Irungattukottai",pincode:"602117"},{name:"Vallam Vadagal",pincode:"602001"}
  ]},
  {name:"Uthiramerur",wards:[
    {name:"Uthiramerur Town",pincode:"603406"},{name:"Maduranthakam",pincode:"603306"},
    {name:"Cheyyur",pincode:"603302"},{name:"Kottivakkam",pincode:"603112"}
  ]},
  {name:"Tirukalukundram",wards:[
    {name:"Tirukalukundram Town",pincode:"603109"},{name:"Mahabalipuram",pincode:"603104"},
    {name:"Singaperumalkoil",pincode:"603204"},{name:"Saluvankuppam",pincode:"603105"}
  ]},
  {name:"Acharapakkam",wards:[
    {name:"Acharapakkam",pincode:"603301"},{name:"Vandalur",pincode:"600048"},
    {name:"Kelambakkam",pincode:"603103"},{name:"Potheri",pincode:"603203"}
  ]},
]},

/* ── 14. Cuddalore ──────────────────────────────────────── */
{id:14,name:"Cuddalore",lat:11.7480,lng:79.7714,headquarters:"Cuddalore",taluks:[
  {name:"Cuddalore",wards:[
    {name:"Cuddalore Town",pincode:"607001"},{name:"Cuddalore Old Town",pincode:"607002"},
    {name:"Parangipettai",pincode:"608502"},{name:"Semmandalam",pincode:"607001"},
    {name:"SIPCOT Cuddalore",pincode:"607005"}
  ]},
  {name:"Panruti",wards:[
    {name:"Panruti Town",pincode:"607106"},{name:"Virudhachalam",pincode:"606001"},
    {name:"Kattumannarkoil",pincode:"608301"},{name:"Mangalur",pincode:"607107"}
  ]},
  {name:"Chidambaram",wards:[
    {name:"Chidambaram Town",pincode:"608001"},{name:"Sirkazhi",pincode:"609110"},
    {name:"Pichavaram",pincode:"608002"},{name:"Killai",pincode:"608304"},
    {name:"Kollidam",pincode:"609302"}
  ]},
  {name:"Neyveli",wards:[
    {name:"Neyveli Town",pincode:"607801"},{name:"Bhuvanagiri",pincode:"608601"},
    {name:"Pennadam",pincode:"606105"},{name:"Vriddhachalam",pincode:"606001"}
  ]},
]},

/* ── 15. Villupuram ─────────────────────────────────────── */
{id:15,name:"Villupuram",lat:11.9389,lng:79.4933,headquarters:"Villupuram",taluks:[
  {name:"Villupuram",wards:[
    {name:"Villupuram Town",pincode:"605601"},{name:"Tindivanam",pincode:"604001"},
    {name:"Vikravandi",pincode:"605652"},{name:"Mailam",pincode:"604304"}
  ]},
  {name:"Gingee",wards:[
    {name:"Gingee Town",pincode:"604202"},{name:"Mailam",pincode:"604304"},
    {name:"Rishivandiyam",pincode:"606213"},{name:"Marakanam",pincode:"604303"}
  ]},
  {name:"Kallakurichi",wards:[
    {name:"Kallakurichi Town",pincode:"606213"},{name:"Chinnasalem",pincode:"606201"},
    {name:"Sankarapuram",pincode:"606401"},{name:"Avalurpet",pincode:"606702"}
  ]},
  {name:"Tirukoilur",wards:[
    {name:"Tirukoilur Town",pincode:"605754"},{name:"Ulundurpet",pincode:"606107"},
    {name:"Melsathambur",pincode:"605651"},{name:"Perangiyur",pincode:"606107"}
  ]},
  {name:"Vanur",wards:[
    {name:"Vanur Town",pincode:"605111"},{name:"Marakanam",pincode:"604303"},
    {name:"Pondicherry Border",pincode:"605101"},{name:"Vikravandi",pincode:"605652"}
  ]},
]},

/* ── 16. Namakkal ───────────────────────────────────────── */
{id:16,name:"Namakkal",lat:11.2189,lng:78.1674,headquarters:"Namakkal",taluks:[
  {name:"Namakkal",wards:[
    {name:"Namakkal Town",pincode:"637001"},{name:"Namakkal North",pincode:"637002"},
    {name:"Thevur",pincode:"637003"},{name:"Mallasamudram",pincode:"637401"},
    {name:"Puduchatram",pincode:"637016"}
  ]},
  {name:"Rasipuram",wards:[
    {name:"Rasipuram Town",pincode:"637408"},{name:"Paramathi",pincode:"637207"},
    {name:"Velur",pincode:"637205"},{name:"Senthamangalam",pincode:"637410"},
    {name:"Vennandur",pincode:"637402"}
  ]},
  {name:"Tiruchengode",wards:[
    {name:"Tiruchengode Town",pincode:"637211"},{name:"Komarapalayam",pincode:"638183"},
    {name:"Mohanur",pincode:"637015"},{name:"Kumarapalayam",pincode:"638183"}
  ]},
  {name:"Kolli Hills",wards:[
    {name:"Arappaleeswarampalayam",pincode:"637401"},{name:"Semmedu",pincode:"637403"},
    {name:"Kambalapatti",pincode:"637411"},{name:"Valavanthi",pincode:"637406"}
  ]},
  {name:"Sendamangalam",wards:[
    {name:"Sendamangalam Town",pincode:"637409"},{name:"Kumarapalayam",pincode:"638183"},
    {name:"Elachipalayam",pincode:"637202"}
  ]},
]},

/* ── 17. Krishnagiri ────────────────────────────────────── */
{id:17,name:"Krishnagiri",lat:12.5266,lng:78.2137,headquarters:"Krishnagiri",taluks:[
  {name:"Krishnagiri",wards:[
    {name:"Krishnagiri Town",pincode:"635001"},{name:"Mathur",pincode:"635304"},
    {name:"Kelamangalam",pincode:"635201"},{name:"Veppanapalli",pincode:"635104"},
    {name:"Evenari",pincode:"635001"}
  ]},
  {name:"Hosur",wards:[
    {name:"Hosur Town",pincode:"635109"},{name:"Thally",pincode:"635118"},
    {name:"Rayakottai",pincode:"635118"},{name:"Mathigiri",pincode:"635110"},
    {name:"Sipcot Hosur",pincode:"635126"}
  ]},
  {name:"Denkanikottai",wards:[
    {name:"Denkanikottai Town",pincode:"635107"},{name:"Kaveripattanam",pincode:"635112"},
    {name:"Uthangarai",pincode:"635207"},{name:"Anchetti",pincode:"635301"}
  ]},
  {name:"Bargur",wards:[
    {name:"Bargur Town",pincode:"635104"},{name:"Pochampalli",pincode:"635204"},
    {name:"Kaveripattinam",pincode:"635112"}
  ]},
  {name:"Shoolagiri",wards:[
    {name:"Shoolagiri Town",pincode:"635117"},{name:"Anchetty",pincode:"635301"},
    {name:"Elathagiri",pincode:"635116"},{name:"Natrampalayam",pincode:"635302"}
  ]},
]},

/* ── 18. Dharmapuri ─────────────────────────────────────── */
{id:18,name:"Dharmapuri",lat:12.1281,lng:78.1576,headquarters:"Dharmapuri",taluks:[
  {name:"Dharmapuri",wards:[
    {name:"Dharmapuri Town",pincode:"636701"},{name:"Dharmapuri North",pincode:"636702"},
    {name:"Morappur",pincode:"636810"},{name:"Harur",pincode:"635654"},
    {name:"Karimangalam",pincode:"636906"}
  ]},
  {name:"Palacode",wards:[
    {name:"Palacode Town",pincode:"636808"},{name:"Pennagaram",pincode:"636812"},
    {name:"Nallampalli",pincode:"636813"},{name:"Kadathur",pincode:"636807"}
  ]},
  {name:"Harur",wards:[
    {name:"Harur Town",pincode:"635654"},{name:"Papireddipatti",pincode:"636906"},
    {name:"Bommidi",pincode:"636805"},{name:"Karimangalam",pincode:"636906"}
  ]},
  {name:"Hogenakkal",wards:[
    {name:"Hogenakkal",pincode:"636805"},{name:"Marandahalli",pincode:"636905"},
    {name:"Pappireddipatti",pincode:"636906"}
  ]},
]},

/* ── 19. Pudukkottai ────────────────────────────────────── */
{id:19,name:"Pudukkottai",lat:10.3797,lng:78.8202,headquarters:"Pudukkottai",taluks:[
  {name:"Pudukkottai",wards:[
    {name:"Pudukkottai Town",pincode:"622001"},{name:"Pudukkottai East",pincode:"622002"},
    {name:"Thirumayam",pincode:"622001"},{name:"Ponnamaravathy",pincode:"622407"},
    {name:"Keeranur",pincode:"622502"}
  ]},
  {name:"Karaikudi",wards:[
    {name:"Karaikudi Town",pincode:"630001"},{name:"Devakottai",pincode:"630302"},
    {name:"Tiruppattur",pincode:"630211"},{name:"Kanadukathan",pincode:"630103"}
  ]},
  {name:"Aranthangi",wards:[
    {name:"Aranthangi Town",pincode:"614616"},{name:"Alangudi",pincode:"614701"},
    {name:"Illuppur",pincode:"621115"},{name:"Manamelkudi",pincode:"614701"}
  ]},
  {name:"Gandarvakottai",wards:[
    {name:"Gandarvakottai Town",pincode:"613303"},{name:"Viralimalai",pincode:"621316"},
    {name:"Kunnandarkoil",pincode:"622301"}
  ]},
]},

/* ── 20. Sivaganga ──────────────────────────────────────── */
{id:20,name:"Sivaganga",lat:9.8473,lng:78.4809,headquarters:"Sivaganga",taluks:[
  {name:"Sivaganga",wards:[
    {name:"Sivaganga Town",pincode:"630561"},{name:"Kalaiyarkoil",pincode:"630551"},
    {name:"Maravamangalam",pincode:"630556"},{name:"Kannangudi",pincode:"630561"}
  ]},
  {name:"Karaikudi",wards:[
    {name:"Karaikudi",pincode:"630001"},{name:"Devakottai",pincode:"630302"},
    {name:"Ilayangudi",pincode:"630702"},{name:"Attangudi",pincode:"630103"}
  ]},
  {name:"Manamadurai",wards:[
    {name:"Manamadurai Town",pincode:"630606"},{name:"Tiruppattur",pincode:"630211"},
    {name:"Singampunari",pincode:"630611"},{name:"Paramakudi Road",pincode:"630701"}
  ]},
]},

/* ── 21. Virudhunagar ───────────────────────────────────── */
{id:21,name:"Virudhunagar",lat:9.5851,lng:77.9624,headquarters:"Virudhunagar",taluks:[
  {name:"Virudhunagar",wards:[
    {name:"Virudhunagar Town",pincode:"626001"},{name:"Virudhunagar East",pincode:"626002"},
    {name:"Aruppukkottai",pincode:"626101"},{name:"Koothambuli",pincode:"626002"}
  ]},
  {name:"Sivakasi",wards:[
    {name:"Sivakasi Town",pincode:"626123"},{name:"Srivilliputhur",pincode:"626125"},
    {name:"Watrap",pincode:"626111"},{name:"Vembakottai",pincode:"626131"}
  ]},
  {name:"Sattur",wards:[
    {name:"Sattur Town",pincode:"626203"},{name:"Vembakottai",pincode:"626131"},
    {name:"Rajapalayam",pincode:"626117"},{name:"Srivilliputhur",pincode:"626125"}
  ]},
  {name:"Rajapalayam",wards:[
    {name:"Rajapalayam Town",pincode:"626117"},{name:"Kariapatti",pincode:"626106"},
    {name:"Krishnankoil",pincode:"626190"},{name:"Mudalur",pincode:"626201"}
  ]},
  {name:"Aruppukkottai",wards:[
    {name:"Aruppukkottai Town",pincode:"626101"},{name:"Mallankinaru",pincode:"626102"},
    {name:"Eral",pincode:"628201"},{name:"Narikudi",pincode:"626102"}
  ]},
]},

/* ── 22. Ramanathapuram ─────────────────────────────────── */
{id:22,name:"Ramanathapuram",lat:9.3762,lng:78.8342,headquarters:"Ramanathapuram",taluks:[
  {name:"Ramanathapuram",wards:[
    {name:"Ramanathapuram Town",pincode:"623501"},{name:"Kadaladi",pincode:"623705"},
    {name:"Mudukulathur",pincode:"623704"},{name:"Bogalur",pincode:"623706"}
  ]},
  {name:"Paramakudi",wards:[
    {name:"Paramakudi Town",pincode:"623701"},{name:"Alagankulam",pincode:"623601"},
    {name:"Tiruvadanai",pincode:"623407"},{name:"Kamuthi",pincode:"623604"}
  ]},
  {name:"Rameswaram",wards:[
    {name:"Rameswaram Town",pincode:"623526"},{name:"Mandapam",pincode:"623519"},
    {name:"Pamban",pincode:"623528"},{name:"Dhanushkodi",pincode:"623533"}
  ]},
]},

/* ── 23. Tenkasi ────────────────────────────────────────── */
{id:23,name:"Tenkasi",lat:8.9594,lng:77.3152,headquarters:"Tenkasi",taluks:[
  {name:"Tenkasi",wards:[
    {name:"Tenkasi Town",pincode:"627811"},{name:"Shengottai",pincode:"627809"},
    {name:"Veerakeralamputhur",pincode:"627860"},{name:"Pavoorchatram",pincode:"627803"}
  ]},
  {name:"Kadayanallur",wards:[
    {name:"Kadayanallur Town",pincode:"627751"},{name:"Sankarankovil",pincode:"627756"},
    {name:"Sennelkudi",pincode:"627752"},{name:"Rajagopalapuram",pincode:"627754"}
  ]},
  {name:"Alangulam",wards:[
    {name:"Alangulam Town",pincode:"627851"},{name:"Sivagiri",pincode:"627757"},
    {name:"Gangaikondan",pincode:"627352"},{name:"Keezhapavoor",pincode:"627852"}
  ]},
  {name:"Puliyangudi",wards:[
    {name:"Puliyangudi Town",pincode:"627855"},{name:"Surandai",pincode:"627859"},
    {name:"Vasudevanallur",pincode:"627758"},{name:"Mayiladumparai",pincode:"627856"}
  ]},
]},

/* ── 24. Tiruvannamalai ─────────────────────────────────── */
{id:24,name:"Tiruvannamalai",lat:12.2253,lng:79.0747,headquarters:"Tiruvannamalai",taluks:[
  {name:"Tiruvannamalai",wards:[
    {name:"Tiruvannamalai Town",pincode:"606601"},{name:"Chengam",pincode:"606702"},
    {name:"Vembakkam",pincode:"606604"},{name:"Thandrampet",pincode:"606708"},
    {name:"Tiruvannamalai North",pincode:"606602"}
  ]},
  {name:"Arni",wards:[
    {name:"Arni Town",pincode:"632301"},{name:"Vandavasi",pincode:"604408"},
    {name:"Arani Junction",pincode:"632302"},{name:"Polur",pincode:"606803"}
  ]},
  {name:"Kilpennathur",wards:[
    {name:"Kilpennathur Town",pincode:"606710"},{name:"Polur",pincode:"606803"},
    {name:"Pudupalayam",pincode:"606906"},{name:"Javvadhu Hills",pincode:"632506"}
  ]},
  {name:"Cheyyar",wards:[
    {name:"Cheyyar Town",pincode:"604407"},{name:"Marakanam",pincode:"604303"},
    {name:"Chetpet",pincode:"604302"},{name:"Vandavasi",pincode:"604408"}
  ]},
]},

/* ── 25. Nagapattinam ───────────────────────────────────── */
{id:25,name:"Nagapattinam",lat:10.7648,lng:79.8423,headquarters:"Nagapattinam",taluks:[
  {name:"Nagapattinam",wards:[
    {name:"Nagapattinam Town",pincode:"611001"},{name:"Akkaraipettai",pincode:"611002"},
    {name:"Velankanni",pincode:"611111"},{name:"Keelaperungulattur",pincode:"611108"}
  ]},
  {name:"Vedaranyam",wards:[
    {name:"Vedaranyam Town",pincode:"614809"},{name:"Pushpavanam",pincode:"614804"},
    {name:"Kodiakkarai",pincode:"614805"},{name:"Thirumarugal",pincode:"611106"}
  ]},
  {name:"Kilvelur",wards:[
    {name:"Kilvelur Town",pincode:"611106"},{name:"Tharangambadi",pincode:"609313"},
    {name:"Sirkazhi",pincode:"609110"},{name:"Kollidam",pincode:"609302"}
  ]},
]},

/* ── 26. Ariyalur ───────────────────────────────────────── */
{id:26,name:"Ariyalur",lat:11.1432,lng:79.0771,headquarters:"Ariyalur",taluks:[
  {name:"Ariyalur",wards:[
    {name:"Ariyalur Town",pincode:"621704"},{name:"T. Palur",pincode:"621210"},
    {name:"Andimadam",pincode:"621802"},{name:"Kumbakonam Road Ariyalur",pincode:"621706"}
  ]},
  {name:"Jayankondam",wards:[
    {name:"Jayankondam Town",pincode:"621802"},{name:"Sendurai",pincode:"621010"},
    {name:"Udayarpalayam",pincode:"621212"},{name:"Thirumandurai",pincode:"621211"}
  ]},
  {name:"Udayarpalayam",wards:[
    {name:"Udayarpalayam Town",pincode:"621212"},{name:"Pennadam",pincode:"606105"},
    {name:"Kunnam",pincode:"621714"}
  ]},
]},

/* ── 27. Perambalur ─────────────────────────────────────── */
{id:27,name:"Perambalur",lat:11.2333,lng:78.8833,headquarters:"Perambalur",taluks:[
  {name:"Perambalur",wards:[
    {name:"Perambalur Town",pincode:"621212"},{name:"Eraiyur",pincode:"621006"},
    {name:"Veppur",pincode:"606105"},{name:"Perambalur South",pincode:"621213"}
  ]},
  {name:"Veppanthattai",wards:[
    {name:"Veppanthattai Town",pincode:"621117"},{name:"Kunnam",pincode:"621714"},
    {name:"Alathur",pincode:"621805"}
  ]},
  {name:"Kunnam",wards:[
    {name:"Kunnam Town",pincode:"621714"},{name:"Siruvachur",pincode:"621115"},
    {name:"Manachanallur",pincode:"621004"}
  ]},
]},

/* ── 28. Karur ──────────────────────────────────────────── */
{id:28,name:"Karur",lat:10.9601,lng:78.0766,headquarters:"Karur",taluks:[
  {name:"Karur",wards:[
    {name:"Karur Town",pincode:"639001"},{name:"Karur West",pincode:"639002"},
    {name:"Karur North",pincode:"639003"},{name:"Pugalur",pincode:"639113"},
    {name:"Thanthoni",pincode:"639003"}
  ]},
  {name:"Kulithalai",wards:[
    {name:"Kulithalai Town",pincode:"639104"},{name:"Krishnarayapuram",pincode:"639202"},
    {name:"Aravakurichi",pincode:"639108"},{name:"Mayanur",pincode:"639120"}
  ]},
  {name:"Kadavur",wards:[
    {name:"Kadavur Town",pincode:"639111"},{name:"K. Paramathi",pincode:"639202"},
    {name:"Nangavaram",pincode:"639002"},{name:"Gujiliamparai Road",pincode:"639111"}
  ]},
  {name:"Manapparai",wards:[
    {name:"Manapparai Town",pincode:"621306"},{name:"Paramathi",pincode:"639006"},
    {name:"Ayyampalayam",pincode:"639003"}
  ]},
]},

/* ── 29. Nilgiris ───────────────────────────────────────── */
{id:29,name:"Nilgiris",lat:11.4102,lng:76.6950,headquarters:"Udhagamandalam",taluks:[
  {name:"Udhagamandalam",wards:[
    {name:"Ooty (Udhagamandalam)",pincode:"643001"},{name:"Ettines",pincode:"643002"},
    {name:"Kundah",pincode:"643219"},{name:"Sholur",pincode:"643103"},
    {name:"Kotagiri",pincode:"643217"},{name:"Emerald",pincode:"643007"}
  ]},
  {name:"Coonoor",wards:[
    {name:"Coonoor Town",pincode:"643101"},{name:"Ketti",pincode:"643215"},
    {name:"Aravenu",pincode:"643104"},{name:"Burliar",pincode:"632102"},
    {name:"Wellington",pincode:"643231"}
  ]},
  {name:"Gudalur",wards:[
    {name:"Gudalur Town",pincode:"643212"},{name:"Pandalur",pincode:"643253"},
    {name:"Theppakadu",pincode:"643213"},{name:"Cherambadi",pincode:"643215"},
    {name:"Devala",pincode:"643216"}
  ]},
]},

/* ── 30. Kallakurichi ───────────────────────────────────── */
{id:30,name:"Kallakurichi",lat:11.7363,lng:78.9598,headquarters:"Kallakurichi",taluks:[
  {name:"Kallakurichi",wards:[
    {name:"Kallakurichi Town",pincode:"606213"},{name:"Chinnasalem",pincode:"606201"},
    {name:"Sankarapuram",pincode:"606401"},{name:"Asanapuram",pincode:"606213"}
  ]},
  {name:"Ulundurpet",wards:[
    {name:"Ulundurpet Town",pincode:"606107"},{name:"Tirukoilur",pincode:"605754"},
    {name:"Rishivandiyam",pincode:"606213"},{name:"Mugaiyur",pincode:"606401"}
  ]},
  {name:"Tirukoilur",wards:[
    {name:"Tirukoilur Town",pincode:"605754"},{name:"Vettavalam",pincode:"605755"},
    {name:"Theerthagiri",pincode:"606756"}
  ]},
]},

/* ── 31. Ranipet ────────────────────────────────────────── */
{id:31,name:"Ranipet",lat:12.9257,lng:79.3325,headquarters:"Ranipet",taluks:[
  {name:"Walajah",wards:[
    {name:"Ranipet Town",pincode:"632401"},{name:"Walajah Town",pincode:"632513"},
    {name:"Arcot",pincode:"632503"},{name:"Nemili",pincode:"631051"},
    {name:"Melvishaaram",pincode:"632509"}
  ]},
  {name:"Arakkonam",wards:[
    {name:"Arakkonam Town",pincode:"631001"},{name:"Sholinghur",pincode:"631102"},
    {name:"Kalavai",pincode:"632454"},{name:"Thiruparkadal",pincode:"631302"}
  ]},
  {name:"Vellore East",wards:[
    {name:"Katpadi",pincode:"632007"},{name:"Sathuvachari",pincode:"632009"},
    {name:"Gandhinagar Ranipet",pincode:"632006"},{name:"Senji Panambakkam",pincode:"631051"}
  ]},
]},

/* ── 32. Chengalpattu ───────────────────────────────────── */
{id:32,name:"Chengalpattu",lat:12.6921,lng:79.9759,headquarters:"Chengalpattu",taluks:[
  {name:"Chengalpattu",wards:[
    {name:"Chengalpattu Town",pincode:"603001"},{name:"Vandalur",pincode:"600048"},
    {name:"Singaperumalkoil",pincode:"603204"},{name:"Guduvanchery",pincode:"603202"},
    {name:"Usilampattu",pincode:"603001"}
  ]},
  {name:"Mahabalipuram",wards:[
    {name:"Mahabalipuram",pincode:"603104"},{name:"Tirukalukundram",pincode:"603109"},
    {name:"Saluvankuppam",pincode:"603105"},{name:"Kovalam",pincode:"603112"}
  ]},
  {name:"Cheyyur",wards:[
    {name:"Cheyyur Town",pincode:"603302"},{name:"Maduranthakam",pincode:"603306"},
    {name:"Lathur",pincode:"603302"},{name:"Kayar",pincode:"603306"}
  ]},
  {name:"Sriperumbudur",wards:[
    {name:"Sriperumbudur Town",pincode:"602105"},{name:"Oragadam",pincode:"602105"},
    {name:"Perungalathur",pincode:"600063"},{name:"Kelambakkam",pincode:"603103"}
  ]},
]},

/* ── 33. Tirupattur ─────────────────────────────────────── */
{id:33,name:"Tirupattur",lat:12.4964,lng:78.5728,headquarters:"Tirupattur",taluks:[
  {name:"Tirupattur",wards:[
    {name:"Tirupattur Town",pincode:"635601"},{name:"Natrampalli",pincode:"635851"},
    {name:"Jolarpettai",pincode:"635851"},{name:"Tirupattur East",pincode:"635602"}
  ]},
  {name:"Ambur",wards:[
    {name:"Ambur Town",pincode:"635802"},{name:"Ambur North",pincode:"635803"},
    {name:"Pernambut",pincode:"635810"},{name:"Amur North Extension",pincode:"635802"}
  ]},
  {name:"Vaniyambadi",wards:[
    {name:"Vaniyambadi Town",pincode:"635751"},{name:"Vaniyambadi North",pincode:"635752"},
    {name:"Jolarpet",pincode:"635851"},{name:"Pernambut",pincode:"635810"}
  ]},
  {name:"Gudiyattam",wards:[
    {name:"Gudiyattam Town",pincode:"632602"},{name:"Gudiyattam East",pincode:"632603"},
    {name:"Pennathur",pincode:"635810"}
  ]},
]},

/* ── 34. Mayiladuthurai ─────────────────────────────────── */
{id:34,name:"Mayiladuthurai",lat:11.1026,lng:79.6516,headquarters:"Mayiladuthurai",taluks:[
  {name:"Mayiladuthurai",wards:[
    {name:"Mayiladuthurai Town",pincode:"609001"},{name:"Kollidam",pincode:"609302"},
    {name:"Sembanarkoil",pincode:"609303"},{name:"Mayiladuthurai West",pincode:"609002"},
    {name:"Sirkali Road",pincode:"609001"}
  ]},
  {name:"Sirkazhi",wards:[
    {name:"Sirkazhi Town",pincode:"609110"},{name:"Poompuhar",pincode:"609105"},
    {name:"Tharangambadi",pincode:"609313"},{name:"Tranquebar Heritage",pincode:"609314"}
  ]},
  {name:"Tharangambadi",wards:[
    {name:"Tharangambadi Town",pincode:"609313"},{name:"Adirampattinam",pincode:"614701"},
    {name:"Muthupettai",pincode:"614804"}
  ]},
]},

/* ── 35. Tiruvarur ──────────────────────────────────────── */
{id:35,name:"Tiruvarur",lat:10.7734,lng:79.6341,headquarters:"Tiruvarur",taluks:[
  {name:"Tiruvarur",wards:[
    {name:"Tiruvarur Town",pincode:"610001"},{name:"Tiruvarur South",pincode:"610002"},
    {name:"Nannilam",pincode:"612001"},{name:"Needamangalam",pincode:"614401"}
  ]},
  {name:"Mannargudi",wards:[
    {name:"Mannargudi Town",pincode:"614001"},{name:"Mannargudi North",pincode:"614002"},
    {name:"Thiruthuraipundi",pincode:"614713"},{name:"Muthupettai",pincode:"614804"}
  ]},
  {name:"Valangaiman",wards:[
    {name:"Valangaiman Town",pincode:"612804"},{name:"Papanasam",pincode:"614205"},
    {name:"Budalur",pincode:"613401"}
  ]},
]},

/* ── 36. Theni ──────────────────────────────────────────── */
{id:36,name:"Theni",lat:10.0104,lng:77.4766,headquarters:"Theni",taluks:[
  {name:"Theni",wards:[
    {name:"Theni Town",pincode:"625531"},{name:"Kothangudi",pincode:"625537"},
    {name:"Bodinayakkanur",pincode:"625513"},{name:"Theni East",pincode:"625532"},
    {name:"Veerapandi",pincode:"625535"}
  ]},
  {name:"Periyakulam",wards:[
    {name:"Periyakulam Town",pincode:"625601"},{name:"Gudalur",pincode:"625601"},
    {name:"Kambam",pincode:"625612"},{name:"Thekkady Road",pincode:"625516"}
  ]},
  {name:"Uthamapalayam",wards:[
    {name:"Uthamapalayam Town",pincode:"625533"},{name:"Andipatti",pincode:"625501"},
    {name:"Cumbum",pincode:"625516"},{name:"Chinnamanur",pincode:"625514"}
  ]},
  {name:"Bodinayakkanur",wards:[
    {name:"Bodinayakkanur Town",pincode:"625513"},{name:"Thamaraikulam",pincode:"625519"},
    {name:"Kodaikanal Road",pincode:"625514"}
  ]},
]},

/* ── 37. Tirupathur ─────────────────────────────────────── */
{id:37,name:"Tirupathur",lat:12.4964,lng:78.5728,headquarters:"Tirupattur",taluks:[
  {name:"Tirupattur North",wards:[
    {name:"Tirupathur Town",pincode:"635601"},{name:"Pernambut",pincode:"635810"},
    {name:"Natrampalli",pincode:"635851"}
  ]},
  {name:"Vaniyambadi",wards:[
    {name:"Vaniyambadi Town",pincode:"635751"},{name:"Jolarpet",pincode:"635851"},
    {name:"Madhanapalle Area",pincode:"635751"},{name:"Ambur Junction",pincode:"635802"}
  ]},
]},

/* ── 38. Kanyakumari ────────────────────────────────────── */
{id:38,name:"Kanyakumari",lat:8.0883,lng:77.5385,headquarters:"Nagercoil",taluks:[
  {name:"Agastheeswaram",wards:[
    {name:"Nagercoil",pincode:"629001"},{name:"Colachel",pincode:"629251"},
    {name:"Thuckalay",pincode:"629175"},{name:"Kulasekaram",pincode:"629161"},
    {name:"Kanyakumari Town",pincode:"629702"},{name:"Kottar",pincode:"629002"}
  ]},
  {name:"Kalkulam",wards:[
    {name:"Padmanabhapuram",pincode:"629151"},{name:"Kuzhithurai",pincode:"629163"},
    {name:"Eraniel",pincode:"629152"},{name:"Marthandom",pincode:"629165"},
    {name:"Kaliyakkavilai",pincode:"629153"}
  ]},
  {name:"Vilavancode",wards:[
    {name:"Marthandam",pincode:"629165"},{name:"Thiruvattar",pincode:"629177"},
    {name:"Aralvaimozhi",pincode:"627808"},{name:"Boothapandi",pincode:"629852"}
  ]},
  {name:"Thovalai",wards:[
    {name:"Thuckalay",pincode:"629175"},{name:"Kattathurai",pincode:"629176"},
    {name:"Vattakottai",pincode:"629002"},{name:"Rajakkamangalam",pincode:"629502"}
  ]},
]},
];

// ── Backward-compatible flat wards array ──────────────────────────────────────
TN_DISTRICTS.forEach(d => {
  d.wards = d.taluks.flatMap(t => t.wards.map(w => w.name));
});

// ── Helper functions ──────────────────────────────────────────────────────────
function getDistrictTaluks(districtName) {
  const d = TN_DISTRICTS.find(x => x.name === districtName);
  return d ? d.taluks : [];
}
function getTalukWards(districtName, talukName) {
  const d = TN_DISTRICTS.find(x => x.name === districtName);
  if (!d) return [];
  const t = d.taluks.find(x => x.name === talukName);
  return t ? t.wards : [];
}
function getWardPincode(wardName) {
  for (const d of TN_DISTRICTS) {
    for (const t of d.taluks) {
      const w = t.wards.find(w => w.name === wardName);
      if (w) return w.pincode;
    }
  }
  return '';
}

// ── Complaint categories ──────────────────────────────────────────────────────
const CATEGORIES = [
  "Road & Infrastructure",
  "Water Supply & Distribution",
  "Electricity & Power",
  "Sanitation & Waste Management",
  "Street Lights",
  "Drainage & Flooding",
  "Parks & Public Spaces",
  "Public Health & Hygiene",
  "Building & Construction Violations",
  "Noise Pollution",
  "Stray Animals",
  "Environment & Pollution",
  "Traffic & Transportation",
  "Education & Schools",
  "Healthcare Facilities",
  "Revenue & Property Issues",
  "Encroachment",
  "Others"
];

const PRIORITIES = {
  low:    { label:"Low",    color:"#6b7280" },
  medium: { label:"Medium", color:"#f59e0b" },
  high:   { label:"High",   color:"#ef4444" },
  urgent: { label:"Urgent", color:"#7c3aed" }
};

const STATUSES = {
  open:       { label:"Open",        color:"#ef4444" },
  inprogress: { label:"In Progress", color:"#f59e0b" },
  resolved:   { label:"Resolved",    color:"#22c55e" }
};

