// All stops are real locations with accurate coordinates
const stops = {
  // ── SEATTLE CORE ──────────────────────────────────────────────
  westlake: {
    id: 'westlake', name: 'Westlake Station', city: 'Seattle',
    lat: 47.6115, lon: -122.3370,
    agencies: ['kcm', 'sound-transit'], modes: ['light-rail', 'bus'],
    description: 'Central Seattle hub. Link 1-Line, Metro buses, Monorail.',
  },
  pioneer_sq: {
    id: 'pioneer_sq', name: 'Pioneer Square Station', city: 'Seattle',
    lat: 47.6014, lon: -122.3327,
    agencies: ['sound-transit'], modes: ['light-rail'],
    description: 'Link 1-Line station in historic Pioneer Square.',
  },
  intl_dist: {
    id: 'intl_dist', name: 'International District/Chinatown Station', city: 'Seattle',
    lat: 47.5983, lon: -122.3279,
    agencies: ['sound-transit'], modes: ['light-rail'],
    description: 'Junction of Link 1-Line and 2-Line. Near King Street Station.',
  },
  king_st: {
    id: 'king_st', name: 'King Street Station', city: 'Seattle',
    lat: 47.5983, lon: -122.3303,
    agencies: ['amtrak', 'sound-transit'], modes: ['intercity-rail', 'commuter-rail'],
    description: 'Amtrak Cascades, Sounder North & South commuter rail.',
  },
  capitol_hill: {
    id: 'capitol_hill', name: 'Capitol Hill Station', city: 'Seattle',
    lat: 47.6196, lon: -122.3196,
    agencies: ['sound-transit'], modes: ['light-rail'],
    description: 'Link 1-Line. Serves Capitol Hill neighborhood.',
  },
  uw_station: {
    id: 'uw_station', name: 'University of Washington Station', city: 'Seattle',
    lat: 47.6494, lon: -122.3037,
    agencies: ['sound-transit', 'kcm'], modes: ['light-rail', 'bus'],
    description: 'Link 1-Line. Connects to UW campus and Husky Stadium.',
  },
  northgate: {
    id: 'northgate', name: 'Northgate Station', city: 'Seattle',
    lat: 47.7057, lon: -122.3437,
    agencies: ['sound-transit', 'kcm'], modes: ['light-rail', 'bus'],
    description: 'Link 1-Line. Major north Seattle hub. Free parking.',
  },
  sodo: {
    id: 'sodo', name: 'SODO Station', city: 'Seattle',
    lat: 47.5771, lon: -122.3277,
    agencies: ['sound-transit'], modes: ['light-rail'],
    description: 'Link 1-Line. Near sports stadiums.',
  },
  beacon_hill: {
    id: 'beacon_hill', name: 'Beacon Hill Station', city: 'Seattle',
    lat: 47.5742, lon: -122.3118,
    agencies: ['sound-transit'], modes: ['light-rail'],
    description: 'Link 1-Line. Deepest station in the system.',
  },
  columbia_city: {
    id: 'columbia_city', name: 'Columbia City Station', city: 'Seattle',
    lat: 47.5600, lon: -122.2939,
    agencies: ['sound-transit'], modes: ['light-rail'],
    description: 'Link 1-Line. Vibrant neighborhood hub.',
  },
  othello: {
    id: 'othello', name: 'Othello Station', city: 'Seattle',
    lat: 47.5391, lon: -122.2832,
    agencies: ['sound-transit'], modes: ['light-rail'],
    description: 'Link 1-Line. Serves Rainier Valley.',
  },
  rainier_beach: {
    id: 'rainier_beach', name: 'Rainier Beach Station', city: 'Seattle',
    lat: 47.5218, lon: -122.2827,
    agencies: ['sound-transit'], modes: ['light-rail'],
    description: 'Link 1-Line. Southernmost Seattle station.',
  },
  colman_dock: {
    id: 'colman_dock', name: 'Seattle — Colman Dock (Ferry Terminal)', city: 'Seattle',
    lat: 47.6024, lon: -122.3384,
    agencies: ['wsf'], modes: ['ferry'],
    description: 'Washington State Ferries terminal. Bainbridge Island & Bremerton routes.',
  },
  fauntleroy_ferry: {
    id: 'fauntleroy_ferry', name: 'Fauntleroy Ferry Terminal', city: 'Seattle',
    lat: 47.5247, lon: -122.3907,
    agencies: ['wsf'], modes: ['ferry'],
    description: 'WSF triangle route to Vashon Island and Southworth.',
  },
  ballard: {
    id: 'ballard', name: 'Ballard (NW Market St & 15th Ave)', city: 'Seattle',
    lat: 47.6688, lon: -122.3836,
    agencies: ['kcm'], modes: ['bus'],
    description: 'RapidRide D Line terminus. Northwest Seattle.',
  },
  west_seattle: {
    id: 'west_seattle', name: 'West Seattle Junction', city: 'Seattle',
    lat: 47.5601, lon: -122.3802,
    agencies: ['kcm'], modes: ['bus'],
    description: 'RapidRide C Line. West Seattle neighborhood hub.',
  },
  aurora_village: {
    id: 'aurora_village', name: 'Aurora Village Transit Center', city: 'Shoreline',
    lat: 47.7741, lon: -122.3415,
    agencies: ['kcm', 'community-transit'], modes: ['bus'],
    description: 'Metro RapidRide E northern terminus. Community Transit connections.',
  },

  // ── SEATAC / SOUTH KING COUNTY ────────────────────────────────
  tukwila_link: {
    id: 'tukwila_link', name: 'Tukwila International Blvd Station', city: 'Tukwila',
    lat: 47.4680, lon: -122.2884,
    agencies: ['sound-transit', 'kcm'], modes: ['light-rail', 'bus'],
    description: 'Link 1-Line. Free shuttle to Tukwila Sounder station.',
  },
  seatac: {
    id: 'seatac', name: 'SeaTac/Airport Station', city: 'SeaTac',
    lat: 47.4443, lon: -122.2988,
    agencies: ['sound-transit'], modes: ['light-rail'],
    description: 'Link 1-Line direct to Seattle-Tacoma International Airport.',
  },
  angle_lake: {
    id: 'angle_lake', name: 'Angle Lake Station', city: 'SeaTac',
    lat: 47.4249, lon: -122.2980,
    agencies: ['sound-transit', 'kcm'], modes: ['light-rail', 'bus'],
    description: 'Link 1-Line southern end of original alignment. Free parking.',
  },
  federal_way_tc: {
    id: 'federal_way_tc', name: 'Federal Way Transit Center', city: 'Federal Way',
    lat: 47.3134, lon: -122.3127,
    agencies: ['sound-transit', 'kcm'], modes: ['light-rail', 'bus'],
    description: 'Link 1-Line southern terminus. Sound Transit & Metro buses.',
  },
  renton_tc: {
    id: 'renton_tc', name: 'Renton Transit Center', city: 'Renton',
    lat: 47.4801, lon: -122.2001,
    agencies: ['kcm', 'sound-transit'], modes: ['bus'],
    description: 'Major Renton hub. Metro & ST Express connections.',
  },
  burien_tc: {
    id: 'burien_tc', name: 'Burien Transit Center', city: 'Burien',
    lat: 47.4729, lon: -122.3449,
    agencies: ['kcm'], modes: ['bus'],
    description: 'RapidRide F terminus. Metro bus hub.',
  },
  tukwila_sounder: {
    id: 'tukwila_sounder', name: 'Tukwila Station (Sounder)', city: 'Tukwila',
    lat: 47.4674, lon: -122.2443,
    agencies: ['sound-transit'], modes: ['commuter-rail'],
    description: 'Sounder South commuter rail. Free shuttle to Link station.',
  },
  des_moines_marina: {
    id: 'des_moines_marina', name: 'Des Moines Park & Ride', city: 'Des Moines',
    lat: 47.4009, lon: -122.3247,
    agencies: ['kcm'], modes: ['bus'],
    description: 'King County Metro park & ride. Route 101/102 to Seattle.',
  },

  // ── EAST KING COUNTY / EASTSIDE ───────────────────────────────
  judkins_park: {
    id: 'judkins_park', name: 'Judkins Park Station', city: 'Seattle',
    lat: 47.5912, lon: -122.2963,
    agencies: ['sound-transit'], modes: ['light-rail'],
    description: 'Link 2-Line. Near I-90 lid parks.',
  },
  mercer_island: {
    id: 'mercer_island', name: 'Mercer Island Station', city: 'Mercer Island',
    lat: 47.5683, lon: -122.2220,
    agencies: ['sound-transit', 'kcm'], modes: ['light-rail', 'bus'],
    description: 'Link 2-Line. Bus intercept on Mercer Island.',
  },
  south_bellevue: {
    id: 'south_bellevue', name: 'South Bellevue Station', city: 'Bellevue',
    lat: 47.5721, lon: -122.1908,
    agencies: ['sound-transit'], modes: ['light-rail'],
    description: 'Link 2-Line. Free parking. Bellevue Slough Wetlands nearby.',
  },
  bellevue_downtown: {
    id: 'bellevue_downtown', name: 'Bellevue Downtown Station', city: 'Bellevue',
    lat: 47.6155, lon: -122.2009,
    agencies: ['sound-transit', 'kcm'], modes: ['light-rail', 'bus'],
    description: 'Link 2-Line. Heart of downtown Bellevue. Major bus connections.',
  },
  east_main: {
    id: 'east_main', name: 'East Main Station', city: 'Bellevue',
    lat: 47.6086, lon: -122.1917,
    agencies: ['sound-transit'], modes: ['light-rail'],
    description: 'Link 2-Line. Bellevue residential neighborhood.',
  },
  overlake_village: {
    id: 'overlake_village', name: 'Overlake Village Station', city: 'Redmond',
    lat: 47.6270, lon: -122.1439,
    agencies: ['sound-transit', 'kcm'], modes: ['light-rail', 'bus'],
    description: 'Link 2-Line. Near Microsoft campus.',
  },
  redmond_tech: {
    id: 'redmond_tech', name: 'Redmond Technology Station', city: 'Redmond',
    lat: 47.6422, lon: -122.1334,
    agencies: ['sound-transit', 'kcm'], modes: ['light-rail', 'bus'],
    description: 'Link 2-Line. Microsoft main campus. RapidRide B connections.',
  },
  downtown_redmond: {
    id: 'downtown_redmond', name: 'Downtown Redmond Station', city: 'Redmond',
    lat: 47.6798, lon: -122.1228,
    agencies: ['sound-transit'], modes: ['light-rail'],
    description: 'Link 2-Line eastern terminus. Downtown Redmond and Marymoor Park.',
  },
  eastgate_pr: {
    id: 'eastgate_pr', name: 'Eastgate Park & Ride', city: 'Bellevue',
    lat: 47.5726, lon: -122.1187,
    agencies: ['kcm', 'sound-transit'], modes: ['bus'],
    description: 'Major east Bellevue park & ride. ST 554 to Issaquah, Metro to Seattle.',
  },
  south_kirkland_pr: {
    id: 'south_kirkland_pr', name: 'South Kirkland Park & Ride', city: 'Kirkland',
    lat: 47.6373, lon: -122.2013,
    agencies: ['kcm', 'sound-transit'], modes: ['bus'],
    description: 'Park & ride with express bus connections to Seattle and Bellevue.',
  },
  kirkland_tc: {
    id: 'kirkland_tc', name: 'Kirkland Transit Center', city: 'Kirkland',
    lat: 47.6758, lon: -122.2029,
    agencies: ['kcm'], modes: ['bus'],
    description: 'Downtown Kirkland bus hub. Routes to Bellevue, Redmond, Totem Lake.',
  },
  totem_lake_tc: {
    id: 'totem_lake_tc', name: 'Totem Lake Transit Center', city: 'Kirkland',
    lat: 47.7015, lon: -122.1762,
    agencies: ['kcm', 'sound-transit'], modes: ['bus'],
    description: 'Major northeast Kirkland hub. ST Express and Metro routes.',
  },
  crossroads_bellevue: {
    id: 'crossroads_bellevue', name: 'Crossroads Bellevue (NE 8th & 156th)', city: 'Bellevue',
    lat: 47.6194, lon: -122.1380,
    agencies: ['kcm'], modes: ['bus'],
    description: 'Metro routes serving Crossroads area of east Bellevue.',
  },
  newport_hills_pr: {
    id: 'newport_hills_pr', name: 'Newport Hills Park & Ride', city: 'Bellevue',
    lat: 47.5500, lon: -122.1444,
    agencies: ['kcm'], modes: ['bus'],
    description: 'Park & ride in southeast Bellevue. Routes to downtown Seattle.',
  },
  issaquah_tc: {
    id: 'issaquah_tc', name: 'Issaquah Transit Center', city: 'Issaquah',
    lat: 47.5301, lon: -122.0323,
    agencies: ['kcm', 'sound-transit'], modes: ['bus'],
    description: 'Downtown Issaquah hub. ST Express 554 to Seattle, Metro routes.',
  },
  issaquah_highlands_pr: {
    id: 'issaquah_highlands_pr', name: 'Issaquah Highlands Park & Ride', city: 'Issaquah',
    lat: 47.5473, lon: -121.9887,
    agencies: ['sound-transit', 'kcm'], modes: ['bus'],
    description: 'Upper Issaquah Highlands P&R. ST Express 554 to Seattle/Bellevue.',
  },
  south_sammamish_pr: {
    id: 'south_sammamish_pr', name: 'South Sammamish Park & Ride', city: 'Sammamish',
    lat: 47.5640, lon: -122.0280,
    agencies: ['kcm'], modes: ['bus'],
    description: 'Sammamish P&R near SE 56th. Metro routes to Issaquah and Eastgate.',
  },
  sammamish_highlands: {
    id: 'sammamish_highlands', name: 'Sammamish — 228th Ave NE Park & Ride', city: 'Sammamish',
    lat: 47.6105, lon: -122.0369,
    agencies: ['kcm'], modes: ['bus'],
    description: 'North Sammamish P&R. Metro routes to Redmond and Kirkland.',
  },
  fall_city_pr: {
    id: 'fall_city_pr', name: 'Fall City Park & Ride', city: 'Fall City',
    lat: 47.5691, lon: -121.8877,
    agencies: ['kcm'], modes: ['bus'],
    description: 'Rural King County park & ride. Express to Seattle.',
  },
  snoqualmie_tc: {
    id: 'snoqualmie_tc', name: 'Snoqualmie Ridge Park & Ride', city: 'Snoqualmie',
    lat: 47.5226, lon: -121.8815,
    agencies: ['kcm'], modes: ['bus'],
    description: 'Snoqualmie/North Bend area park & ride. Metro routes.',
  },
  kenmore_pr: {
    id: 'kenmore_pr', name: 'Kenmore Park & Ride', city: 'Kenmore',
    lat: 47.7555, lon: -122.2408,
    agencies: ['kcm', 'sound-transit'], modes: ['bus'],
    description: 'Northeast King County P&R. ST Express to UW and downtown.',
  },
  woodinville_tc: {
    id: 'woodinville_tc', name: 'Woodinville Park & Ride', city: 'Woodinville',
    lat: 47.7571, lon: -122.1493,
    agencies: ['sound-transit', 'kcm'], modes: ['bus'],
    description: 'Northeast suburban P&R. ST Express 522 to Seattle.',
  },
  bothell_tc: {
    id: 'bothell_tc', name: 'Bothell — Canyon Park Park & Ride', city: 'Bothell',
    lat: 47.7929, lon: -122.2117,
    agencies: ['community-transit', 'sound-transit'], modes: ['bus'],
    description: 'Canyon Park P&R. Community Transit and ST express buses.',
  },

  // ── NORTH SOUND (SNOHOMISH COUNTY) ────────────────────────────
  shoreline_148th: {
    id: 'shoreline_148th', name: 'Shoreline South/148th Station', city: 'Shoreline',
    lat: 47.7224, lon: -122.3426,
    agencies: ['sound-transit'], modes: ['light-rail'],
    description: 'Link 1-Line. Free parking.',
  },
  shoreline_185th: {
    id: 'shoreline_185th', name: 'Shoreline North/185th Station', city: 'Shoreline',
    lat: 47.7549, lon: -122.3404,
    agencies: ['sound-transit', 'kcm'], modes: ['light-rail', 'bus'],
    description: 'Link 1-Line. Express bus connections.',
  },
  mountlake_terrace: {
    id: 'mountlake_terrace', name: 'Mountlake Terrace Station', city: 'Mountlake Terrace',
    lat: 47.7895, lon: -122.3130,
    agencies: ['sound-transit', 'community-transit'], modes: ['light-rail', 'bus'],
    description: 'Link 1-Line. Community Transit connections.',
  },
  lynnwood: {
    id: 'lynnwood', name: 'Lynnwood City Center Station', city: 'Lynnwood',
    lat: 47.8177, lon: -122.3130,
    agencies: ['sound-transit', 'community-transit'], modes: ['light-rail', 'bus'],
    description: 'Link 1-Line northern terminus. Major Snohomish County hub. Free parking.',
  },
  ash_way: {
    id: 'ash_way', name: 'Ash Way Park & Ride', city: 'Lynnwood',
    lat: 47.8553, lon: -122.2598,
    agencies: ['community-transit'], modes: ['bus'],
    description: 'Community Transit Swift Blue Line. Express bus to Seattle.',
  },
  mariner: {
    id: 'mariner', name: 'Mariner Park & Ride', city: 'Everett',
    lat: 47.8820, lon: -122.2650,
    agencies: ['community-transit', 'everett-transit'], modes: ['bus'],
    description: 'Swift Blue Line. Connection between CT and Everett Transit.',
  },
  everett_station: {
    id: 'everett_station', name: 'Everett Station', city: 'Everett',
    lat: 47.9767, lon: -122.2026,
    agencies: ['sound-transit', 'community-transit', 'everett-transit', 'amtrak'], modes: ['commuter-rail', 'bus', 'intercity-rail'],
    description: 'Sounder North terminus. Community Transit, Everett Transit, Amtrak Cascades.',
  },
  mukilteo_ferry: {
    id: 'mukilteo_ferry', name: 'Mukilteo Ferry Terminal', city: 'Mukilteo',
    lat: 47.9490, lon: -122.3040,
    agencies: ['wsf', 'community-transit'], modes: ['ferry', 'bus'],
    description: 'WSF to Clinton (Whidbey Island). 20-min crossing. CT bus connections.',
  },
  paine_field: {
    id: 'paine_field', name: 'Paine Field / Airport Road P&R', city: 'Everett',
    lat: 47.9215, lon: -122.2813,
    agencies: ['community-transit'], modes: ['bus'],
    description: 'Swift Blue Line stop near Paine Field/Boeing. CT bus connections.',
  },
  marysville_tc: {
    id: 'marysville_tc', name: 'Marysville Transit Center', city: 'Marysville',
    lat: 48.0520, lon: -122.1770,
    agencies: ['community-transit'], modes: ['bus'],
    description: 'Community Transit north Snohomish County hub.',
  },
  smokey_point_pr: {
    id: 'smokey_point_pr', name: 'Smokey Point Park & Ride', city: 'Arlington',
    lat: 48.1610, lon: -122.1875,
    agencies: ['community-transit'], modes: ['bus'],
    description: 'North Snohomish county P&R. CT express to Everett and Seattle.',
  },

  // ── KITSAP / FERRY TERMINALS ──────────────────────────────────
  bainbridge_ferry: {
    id: 'bainbridge_ferry', name: 'Bainbridge Island Ferry Terminal', city: 'Bainbridge Island',
    lat: 47.6234, lon: -122.5128,
    agencies: ['wsf', 'kitsap-transit'], modes: ['ferry', 'bus'],
    description: 'WSF ferry to/from Seattle. 35-min crossing. Kitsap Transit buses.',
  },
  bremerton_ferry: {
    id: 'bremerton_ferry', name: 'Bremerton Ferry Terminal', city: 'Bremerton',
    lat: 47.5628, lon: -122.6268,
    agencies: ['wsf', 'kitsap-transit'], modes: ['ferry', 'bus'],
    description: 'WSF ferry to/from Seattle. 60-min crossing.',
  },
  edmonds_ferry: {
    id: 'edmonds_ferry', name: 'Edmonds Ferry Terminal', city: 'Edmonds',
    lat: 47.8117, lon: -122.3851,
    agencies: ['wsf', 'amtrak', 'sound-transit'], modes: ['ferry', 'intercity-rail', 'commuter-rail'],
    description: 'WSF to Kingston. Amtrak Cascades stop. Sounder North stop.',
  },
  kingston_ferry: {
    id: 'kingston_ferry', name: 'Kingston Ferry Terminal', city: 'Kingston',
    lat: 47.7960, lon: -122.4960,
    agencies: ['wsf', 'kitsap-transit'], modes: ['ferry', 'bus'],
    description: 'WSF to Edmonds. 30-min crossing. Kitsap Transit connections.',
  },
  vashon_ferry: {
    id: 'vashon_ferry', name: 'Vashon Island Ferry Terminal (Vashon)', city: 'Vashon Island',
    lat: 47.5109, lon: -122.4618,
    agencies: ['wsf', 'kitsap-transit'], modes: ['ferry', 'bus'],
    description: 'WSF from Fauntleroy (Seattle) and Southworth. Kitsap Transit local.',
  },
  southworth_ferry: {
    id: 'southworth_ferry', name: 'Southworth Ferry Terminal', city: 'Port Orchard',
    lat: 47.5091, lon: -122.4978,
    agencies: ['wsf', 'kitsap-transit'], modes: ['ferry', 'bus'],
    description: 'WSF triangle route from Fauntleroy and Vashon.',
  },
  silverdale_tc: {
    id: 'silverdale_tc', name: 'Silverdale Transit Center', city: 'Silverdale',
    lat: 47.6449, lon: -122.7026,
    agencies: ['kitsap-transit'], modes: ['bus'],
    description: 'Kitsap Transit central hub. Routes to Bremerton, Poulsbo, Port Orchard.',
  },
  poulsbo_tc: {
    id: 'poulsbo_tc', name: 'Poulsbo Transit Center', city: 'Poulsbo',
    lat: 47.7349, lon: -122.6459,
    agencies: ['kitsap-transit'], modes: ['bus'],
    description: 'Kitsap Transit north hub. Connects to Kingston Ferry and Silverdale.',
  },
  port_orchard_tc: {
    id: 'port_orchard_tc', name: 'Port Orchard Transit Center', city: 'Port Orchard',
    lat: 47.5397, lon: -122.6329,
    agencies: ['kitsap-transit'], modes: ['bus'],
    description: 'Kitsap Transit south hub. Near Southworth Ferry.',
  },
  bremerton_tc: {
    id: 'bremerton_tc', name: 'Bremerton Transit Center', city: 'Bremerton',
    lat: 47.5673, lon: -122.6277,
    agencies: ['kitsap-transit'], modes: ['bus'],
    description: 'Downtown Bremerton hub adjacent to ferry terminal.',
  },
  bangor_base: {
    id: 'bangor_base', name: 'Bangor/Keyport (Kitsap Transit)', city: 'Silverdale',
    lat: 47.7008, lon: -122.7396,
    agencies: ['kitsap-transit'], modes: ['bus'],
    description: 'Kitsap Transit route serving Naval Base Kitsap Bangor.',
  },

  // ── PIERCE COUNTY ─────────────────────────────────────────────
  tacoma_dome: {
    id: 'tacoma_dome', name: 'Tacoma Dome Station', city: 'Tacoma',
    lat: 47.2388, lon: -122.4277,
    agencies: ['sound-transit', 'pierce-transit'], modes: ['commuter-rail', 'bus'],
    description: 'Sounder South terminus. Future Link 1-Line. Major bus hub.',
  },
  tacoma_tc: {
    id: 'tacoma_tc', name: 'Tacoma Transit Center', city: 'Tacoma',
    lat: 47.2527, lon: -122.4427,
    agencies: ['pierce-transit', 'sound-transit'], modes: ['bus', 'brt'],
    description: 'Pierce Transit & Sound Transit bus hub in downtown Tacoma.',
  },
  tacoma_community_college: {
    id: 'tacoma_community_college', name: 'Tacoma Community College Transit Center', city: 'Tacoma',
    lat: 47.2586, lon: -122.5213,
    agencies: ['pierce-transit'], modes: ['bus'],
    description: 'Pierce Transit hub serving TCC campus and west Tacoma.',
  },
  tacoma_mall: {
    id: 'tacoma_mall', name: 'Tacoma Mall Transit Center', city: 'Tacoma',
    lat: 47.2234, lon: -122.4623,
    agencies: ['pierce-transit', 'sound-transit'], modes: ['bus'],
    description: 'Pierce Transit hub near Tacoma Mall. ST Express connections.',
  },
  puyallup_station: {
    id: 'puyallup_station', name: 'Puyallup Station (Sounder)', city: 'Puyallup',
    lat: 47.1875, lon: -122.2930,
    agencies: ['sound-transit', 'pierce-transit'], modes: ['commuter-rail', 'bus'],
    description: 'Sounder South stop. Pierce Transit connections.',
  },
  sumner_station: {
    id: 'sumner_station', name: 'Sumner Station (Sounder)', city: 'Sumner',
    lat: 47.2040, lon: -122.2412,
    agencies: ['sound-transit'], modes: ['commuter-rail'],
    description: 'Sounder South stop.',
  },
  auburn_station: {
    id: 'auburn_station', name: 'Auburn Station (Sounder)', city: 'Auburn',
    lat: 47.3024, lon: -122.2280,
    agencies: ['sound-transit', 'kcm'], modes: ['commuter-rail', 'bus'],
    description: 'Sounder South stop. Metro bus connections.',
  },
  kent_station: {
    id: 'kent_station', name: 'Kent Station (Sounder)', city: 'Kent',
    lat: 47.3812, lon: -122.2340,
    agencies: ['sound-transit', 'kcm'], modes: ['commuter-rail', 'bus'],
    description: 'Sounder South stop. Metro bus connections.',
  },
  lakewood_tc: {
    id: 'lakewood_tc', name: 'Lakewood Station', city: 'Lakewood',
    lat: 47.1726, lon: -122.5185,
    agencies: ['pierce-transit', 'amtrak', 'sound-transit'], modes: ['bus', 'intercity-rail'],
    description: 'Pierce Transit hub. Amtrak Cascades stop. ST Express to Tacoma Dome.',
  },
  spanaway_tc: {
    id: 'spanaway_tc', name: 'Spanaway Transit Center', city: 'Spanaway',
    lat: 47.1025, lon: -122.4314,
    agencies: ['pierce-transit'], modes: ['bus'],
    description: 'Pierce Transit hub in south Pierce County.',
  },
  gig_harbor_tc: {
    id: 'gig_harbor_tc', name: 'Gig Harbor Transit Center', city: 'Gig Harbor',
    lat: 47.3319, lon: -122.5793,
    agencies: ['pierce-transit'], modes: ['bus'],
    description: 'Pierce Transit serving Gig Harbor peninsula.',
  },
  south_hill_pr: {
    id: 'south_hill_pr', name: 'South Hill Park & Ride', city: 'Puyallup',
    lat: 47.1450, lon: -122.2979,
    agencies: ['pierce-transit', 'sound-transit'], modes: ['bus'],
    description: 'South Pierce County P&R. ST Express to Tacoma and beyond.',
  },
  steilacoom: {
    id: 'steilacoom', name: 'Steilacoom Ferry Terminal', city: 'Steilacoom',
    lat: 47.1690, lon: -122.5988,
    agencies: ['wsf', 'pierce-transit'], modes: ['ferry', 'bus'],
    description: 'WSF to Anderson Island. Pierce Transit local buses.',
  },

  // ── THURSTON COUNTY (FREE) ────────────────────────────────────
  olympia_tc: {
    id: 'olympia_tc', name: 'Olympia Transit Center', city: 'Olympia',
    lat: 47.0454, lon: -122.9007,
    agencies: ['intercity-transit'], modes: ['bus'],
    description: 'Intercity Transit hub — ALL rides FREE. State Capitol area.',
  },
  lacey_tc: {
    id: 'lacey_tc', name: 'Lacey Transit Center', city: 'Lacey',
    lat: 47.0432, lon: -122.8024,
    agencies: ['intercity-transit'], modes: ['bus'],
    description: 'Intercity Transit — FREE. Connects to Olympia and Tumwater.',
  },
  tumwater_tc: {
    id: 'tumwater_tc', name: 'Tumwater Transit Center', city: 'Tumwater',
    lat: 47.0101, lon: -122.9087,
    agencies: ['intercity-transit'], modes: ['bus'],
    description: 'Intercity Transit — FREE. Near I-5 and Tumwater Falls.',
  },
  amtrak_olympia: {
    id: 'amtrak_olympia', name: 'Olympia/Lacey Amtrak Station', city: 'Lacey',
    lat: 46.9882, lon: -122.9149,
    agencies: ['amtrak'], modes: ['intercity-rail'],
    description: 'Amtrak Cascades stop. Intercity Transit bus to downtown Olympia.',
  },
  yelm_pr: {
    id: 'yelm_pr', name: 'Yelm Park & Ride', city: 'Yelm',
    lat: 46.9427, lon: -122.6367,
    agencies: ['intercity-transit'], modes: ['bus'],
    description: 'Intercity Transit east Thurston County — FREE service.',
  },

  // ── CLARK COUNTY / VANCOUVER WA ───────────────────────────────
  vancouver_ctran: {
    id: 'vancouver_ctran', name: 'Vancouver C-TRAN Transit Center', city: 'Vancouver',
    lat: 45.6312, lon: -122.5060,
    agencies: ['ctran'], modes: ['bus', 'brt'],
    description: 'C-TRAN hub. The Vine BRT. Express buses to Portland.',
  },
  amtrak_vancouver_wa: {
    id: 'amtrak_vancouver_wa', name: 'Vancouver, WA Amtrak Station', city: 'Vancouver',
    lat: 45.6286, lon: -122.6748,
    agencies: ['amtrak'], modes: ['intercity-rail'],
    description: 'Amtrak Cascades. Near downtown Vancouver, WA.',
  },
  fisher_s_landing: {
    id: 'fisher_s_landing', name: 'Fisher\'s Landing Transit Center', city: 'Vancouver',
    lat: 45.6012, lon: -122.4960,
    agencies: ['ctran'], modes: ['bus'],
    description: 'C-TRAN east Vancouver hub. Express routes to downtown.',
  },

  // ── EASTERN WASHINGTON — SPOKANE AREA ────────────────────────
  spokane_sta: {
    id: 'spokane_sta', name: 'Spokane STA Plaza', city: 'Spokane',
    lat: 47.6590, lon: -117.4259,
    agencies: ['sta'], modes: ['bus', 'brt'],
    description: 'STA main hub. City Line BRT. Downtown Spokane.',
  },
  spokane_valley_tc: {
    id: 'spokane_valley_tc', name: 'Spokane Valley Transit Center', city: 'Spokane Valley',
    lat: 47.6727, lon: -117.2414,
    agencies: ['sta'], modes: ['bus'],
    description: 'STA hub in Spokane Valley near Sullivan Rd.',
  },
  cheney_tc: {
    id: 'cheney_tc', name: 'Cheney Transit Center (STA)', city: 'Cheney',
    lat: 47.4874, lon: -117.5753,
    agencies: ['sta'], modes: ['bus'],
    description: 'STA service to Eastern Washington University and Cheney.',
  },
  airway_heights_tc: {
    id: 'airway_heights_tc', name: 'Airway Heights Transit Center', city: 'Airway Heights',
    lat: 47.6449, lon: -117.5975,
    agencies: ['sta'], modes: ['bus'],
    description: 'STA west Spokane hub near Fairchild Air Force Base.',
  },
  medical_lake_tc: {
    id: 'medical_lake_tc', name: 'Medical Lake Park & Ride', city: 'Medical Lake',
    lat: 47.5710, lon: -117.6873,
    agencies: ['sta'], modes: ['bus'],
    description: 'STA stop in Medical Lake. Connects to Cheney and Spokane.',
  },
  spokane_amtrak: {
    id: 'spokane_amtrak', name: 'Spokane Amtrak Station', city: 'Spokane',
    lat: 47.6576, lon: -117.4123,
    agencies: ['amtrak', 'sta'], modes: ['intercity-rail', 'bus'],
    description: 'Amtrak Empire Builder (Chicago-Seattle). STA bus connections.',
  },
  liberty_lake_pr: {
    id: 'liberty_lake_pr', name: 'Liberty Lake Park & Ride', city: 'Liberty Lake',
    lat: 47.6671, lon: -117.1010,
    agencies: ['sta'], modes: ['bus'],
    description: 'STA easternmost park & ride. Near Idaho border.',
  },
  northside_spokane: {
    id: 'northside_spokane', name: 'Northside Park & Ride (STA)', city: 'Spokane',
    lat: 47.7316, lon: -117.4255,
    agencies: ['sta'], modes: ['bus'],
    description: 'STA north Spokane park & ride on Division St.',
  },
  south_spokane: {
    id: 'south_spokane', name: 'South Spokane Park & Ride', city: 'Spokane',
    lat: 47.6118, lon: -117.4070,
    agencies: ['sta'], modes: ['bus'],
    description: 'STA south Spokane hub near 57th Ave.',
  },

  // ── EASTERN WASHINGTON — TRI-CITIES ──────────────────────────
  kennewick_bft: {
    id: 'kennewick_bft', name: 'Kennewick Transit Center (BFT)', city: 'Kennewick',
    lat: 46.2110, lon: -119.1370,
    agencies: ['bft'], modes: ['bus'],
    description: 'Ben Franklin Transit. Tri-Cities area hub.',
  },
  richland_bft: {
    id: 'richland_bft', name: 'Richland — George Washington Way (BFT)', city: 'Richland',
    lat: 46.2855, lon: -119.2852,
    agencies: ['bft'], modes: ['bus'],
    description: 'Ben Franklin Transit stop in Richland.',
  },
  pasco_bft: {
    id: 'pasco_bft', name: 'Pasco Transfer Point (BFT)', city: 'Pasco',
    lat: 46.2399, lon: -119.1034,
    agencies: ['bft'], modes: ['bus'],
    description: 'Ben Franklin Transit. Pasco hub near train depot.',
  },
  pasco_amtrak: {
    id: 'pasco_amtrak', name: 'Pasco Amtrak Station', city: 'Pasco',
    lat: 46.2430, lon: -119.0982,
    agencies: ['amtrak', 'bft'], modes: ['intercity-rail', 'bus'],
    description: 'Amtrak Empire Builder stop. BFT bus connections.',
  },
  west_richland: {
    id: 'west_richland', name: 'West Richland Park & Ride (BFT)', city: 'West Richland',
    lat: 46.2971, lon: -119.3596,
    agencies: ['bft'], modes: ['bus'],
    description: 'Ben Franklin Transit west Richland stop.',
  },

  // ── EASTERN WASHINGTON — YAKIMA ───────────────────────────────
  yakima_tc: {
    id: 'yakima_tc', name: 'Yakima Transit Center', city: 'Yakima',
    lat: 46.6021, lon: -120.5059,
    agencies: ['yakima-transit'], modes: ['bus'],
    description: 'Yakima Transit downtown hub. Local routes throughout Yakima Valley.',
  },
  yakima_amtrak: {
    id: 'yakima_amtrak', name: 'Yakima Amtrak Station', city: 'Yakima',
    lat: 46.5964, lon: -120.5239,
    agencies: ['amtrak'], modes: ['intercity-rail'],
    description: 'Amtrak Empire Builder stop in Yakima.',
  },
  union_gap: {
    id: 'union_gap', name: 'Union Gap Transit Center', city: 'Union Gap',
    lat: 46.5577, lon: -120.4831,
    agencies: ['yakima-transit'], modes: ['bus'],
    description: 'Yakima Transit south hub serving Union Gap area.',
  },
  selah: {
    id: 'selah', name: 'Selah Park & Ride', city: 'Selah',
    lat: 46.6540, lon: -120.5290,
    agencies: ['yakima-transit'], modes: ['bus'],
    description: 'Yakima Transit north stop serving Selah.',
  },

  // ── EASTERN WASHINGTON — OTHER ────────────────────────────────
  wenatchee_link: {
    id: 'wenatchee_link', name: 'Wenatchee Transit Center', city: 'Wenatchee',
    lat: 47.4275, lon: -120.3340,
    agencies: ['link-transit'], modes: ['bus'],
    description: 'Link Transit hub for Chelan/Douglas counties.',
  },
  east_wenatchee: {
    id: 'east_wenatchee', name: 'East Wenatchee Park & Ride', city: 'East Wenatchee',
    lat: 47.4169, lon: -120.2959,
    agencies: ['link-transit'], modes: ['bus'],
    description: 'Link Transit east side hub across the Columbia River.',
  },
  leavenworth_tc: {
    id: 'leavenworth_tc', name: 'Leavenworth Transit Center', city: 'Leavenworth',
    lat: 47.5960, lon: -120.6615,
    agencies: ['link-transit'], modes: ['bus'],
    description: 'Link Transit stop in Bavarian-themed Leavenworth.',
  },
  ellensburg_tc: {
    id: 'ellensburg_tc', name: 'Ellensburg Transit Center', city: 'Ellensburg',
    lat: 47.0060, lon: -120.5389,
    agencies: ['kittitas-transit'], modes: ['bus'],
    description: 'Kittitas County Transit. Near Central Washington University.',
  },
  moses_lake_tc: {
    id: 'moses_lake_tc', name: 'Moses Lake Transit Center', city: 'Moses Lake',
    lat: 47.1310, lon: -119.2785,
    agencies: ['grant-transit'], modes: ['bus'],
    description: 'Grant Transit Authority hub in Moses Lake.',
  },
  ephrata_tc: {
    id: 'ephrata_tc', name: 'Ephrata Park & Ride', city: 'Ephrata',
    lat: 47.3173, lon: -119.5524,
    agencies: ['grant-transit'], modes: ['bus'],
    description: 'Grant Transit Authority stop in Grant County seat.',
  },
  quincy_pr: {
    id: 'quincy_pr', name: 'Quincy Park & Ride', city: 'Quincy',
    lat: 47.2340, lon: -119.8524,
    agencies: ['grant-transit'], modes: ['bus'],
    description: 'Grant Transit connecting Quincy to Moses Lake.',
  },
  pullman_tc: {
    id: 'pullman_tc', name: 'Pullman Transit Center', city: 'Pullman',
    lat: 46.7298, lon: -117.1817,
    agencies: ['pullman-transit'], modes: ['bus'],
    description: 'Pullman Transit & WSU Cougar Xpress. Near Washington State University.',
  },
  wsu_campus: {
    id: 'wsu_campus', name: 'WSU Campus Transit Center', city: 'Pullman',
    lat: 46.7306, lon: -117.1559,
    agencies: ['pullman-transit'], modes: ['bus'],
    description: 'Washington State University campus bus hub.',
  },
  walla_walla_vt: {
    id: 'walla_walla_vt', name: 'Walla Walla Transit Center', city: 'Walla Walla',
    lat: 46.0646, lon: -118.3430,
    agencies: ['valley-transit'], modes: ['bus'],
    description: 'Valley Transit — ALL rides FREE. Walla Walla area.',
  },
  college_place: {
    id: 'college_place', name: 'College Place Transit Stop', city: 'College Place',
    lat: 46.0453, lon: -118.3879,
    agencies: ['valley-transit'], modes: ['bus'],
    description: 'Valley Transit — FREE. Walla Walla Valley Medical Center area.',
  },
  clarkston_tc: {
    id: 'clarkston_tc', name: 'Clarkston Transit Center (SMART)', city: 'Clarkston',
    lat: 46.4161, lon: -117.0467,
    agencies: ['smart-transit'], modes: ['bus'],
    description: 'SMART transit serving Clarkston–Asotin County area.',
  },
  colville_tc: {
    id: 'colville_tc', name: 'Colville Connections Transit', city: 'Colville',
    lat: 48.5526, lon: -117.8995,
    agencies: ['connections-transit'], modes: ['bus'],
    description: 'Ferry/Stevens County rural transit. Connections to Spokane.',
  },

  // ── NORTHWEST WASHINGTON ──────────────────────────────────────
  bellingham_wta: {
    id: 'bellingham_wta', name: 'Bellingham Station (WTA)', city: 'Bellingham',
    lat: 48.7560, lon: -122.4756,
    agencies: ['wta', 'amtrak'], modes: ['bus', 'intercity-rail'],
    description: 'WTA transit hub. Amtrak Cascades. Near Western Washington University.',
  },
  bellingham_ferry: {
    id: 'bellingham_ferry', name: 'Bellingham Cruise Terminal', city: 'Bellingham',
    lat: 48.7217, lon: -122.5077,
    agencies: ['wsf', 'wta'], modes: ['ferry', 'bus'],
    description: 'Alaska Marine Highway and seasonal services. WTA bus connections.',
  },
  mount_vernon: {
    id: 'mount_vernon', name: 'Mt. Vernon Transit Center', city: 'Mount Vernon',
    lat: 48.4217, lon: -122.3349,
    agencies: ['skagit'], modes: ['bus'],
    description: 'Skagit Transit hub. Connects to WTA and Island Transit.',
  },
  burlington_tc: {
    id: 'burlington_tc', name: 'Burlington Transit Center', city: 'Burlington',
    lat: 48.4774, lon: -122.3313,
    agencies: ['skagit'], modes: ['bus'],
    description: 'Skagit Transit connecting Burlington to Mount Vernon and Anacortes.',
  },
  sedro_woolley: {
    id: 'sedro_woolley', name: 'Sedro-Woolley Park & Ride', city: 'Sedro-Woolley',
    lat: 48.5026, lon: -122.2361,
    agencies: ['skagit'], modes: ['bus'],
    description: 'Skagit Transit east county hub.',
  },
  anacortes: {
    id: 'anacortes', name: 'Anacortes Ferry Terminal', city: 'Anacortes',
    lat: 48.5140, lon: -122.6127,
    agencies: ['wsf', 'skagit'], modes: ['ferry', 'bus'],
    description: 'WSF ferries to San Juan Islands & Sidney, BC. Skagit Transit bus.',
  },
  friday_harbor: {
    id: 'friday_harbor', name: 'Friday Harbor Ferry Terminal', city: 'Friday Harbor',
    lat: 48.5349, lon: -123.0177,
    agencies: ['wsf', 'san-juan-transit'], modes: ['ferry', 'bus'],
    description: 'WSF to Anacortes/other San Juan Islands. San Juan Transit.',
  },
  oak_harbor_tc: {
    id: 'oak_harbor_tc', name: 'Oak Harbor Transit Center', city: 'Oak Harbor',
    lat: 48.2929, lon: -122.6466,
    agencies: ['island-transit'], modes: ['bus'],
    description: 'Island Transit — FREE. Main hub for north Whidbey Island.',
  },
  coupeville_tc: {
    id: 'coupeville_tc', name: 'Coupeville Transit Center', city: 'Coupeville',
    lat: 48.2193, lon: -122.6868,
    agencies: ['island-transit'], modes: ['bus'],
    description: 'Island Transit — FREE. Historic Coupeville on Whidbey Island.',
  },
  clinton_ferry: {
    id: 'clinton_ferry', name: 'Clinton Ferry Terminal (Whidbey Island)', city: 'Clinton',
    lat: 47.9753, lon: -122.3529,
    agencies: ['wsf', 'island-transit'], modes: ['ferry', 'bus'],
    description: 'WSF to Mukilteo. Island Transit bus north to Oak Harbor.',
  },
  port_townsend: {
    id: 'port_townsend', name: 'Port Townsend Ferry Terminal', city: 'Port Townsend',
    lat: 48.1135, lon: -122.7600,
    agencies: ['wsf', 'jefferson-transit'], modes: ['ferry', 'bus'],
    description: 'WSF to Keystone (Whidbey Island). Jefferson Transit buses.',
  },
  sequim_tc: {
    id: 'sequim_tc', name: 'Sequim Transit Center', city: 'Sequim',
    lat: 48.0797, lon: -123.1008,
    agencies: ['clallam-transit'], modes: ['bus'],
    description: 'Clallam Transit. Connects to Port Angeles and Port Townsend area.',
  },
  port_angeles_tc: {
    id: 'port_angeles_tc', name: 'Port Angeles Transit Center', city: 'Port Angeles',
    lat: 48.1178, lon: -123.4307,
    agencies: ['clallam-transit'], modes: ['bus'],
    description: 'Clallam Transit hub. Coho Ferry to Victoria, BC.',
  },
  stanwood_tc: {
    id: 'stanwood_tc', name: 'Stanwood Transit Center', city: 'Stanwood',
    lat: 48.2395, lon: -122.3706,
    agencies: ['community-transit'], modes: ['bus'],
    description: 'Community Transit north hub connecting to Marysville and Everett.',
  },
};

// Bidirectional connections representing transit links.
const connectionList = [

  // ── SOUND TRANSIT LINK 1-LINE ──────────────────────────────────
  { from: 'tacoma_dome', to: 'federal_way_tc', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 14, fare: 2.25 },
  { from: 'federal_way_tc', to: 'angle_lake', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 13, fare: 2.25 },
  { from: 'angle_lake', to: 'seatac', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 3, fare: 2.25 },
  { from: 'seatac', to: 'tukwila_link', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 3, fare: 2.25 },
  { from: 'tukwila_link', to: 'rainier_beach', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 7, fare: 2.50 },
  { from: 'rainier_beach', to: 'othello', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 3, fare: 2.50 },
  { from: 'othello', to: 'columbia_city', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 3, fare: 2.50 },
  { from: 'columbia_city', to: 'beacon_hill', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 4, fare: 2.50 },
  { from: 'beacon_hill', to: 'sodo', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 3, fare: 2.25 },
  { from: 'sodo', to: 'intl_dist', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 3, fare: 2.25 },
  { from: 'intl_dist', to: 'pioneer_sq', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 2, fare: 2.25 },
  { from: 'pioneer_sq', to: 'westlake', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 3, fare: 2.25 },
  { from: 'westlake', to: 'capitol_hill', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 3, fare: 2.25 },
  { from: 'capitol_hill', to: 'uw_station', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 3, fare: 2.25 },
  { from: 'uw_station', to: 'northgate', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 5, fare: 2.25 },
  { from: 'northgate', to: 'shoreline_148th', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 6, fare: 2.25 },
  { from: 'shoreline_148th', to: 'shoreline_185th', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 3, fare: 2.25 },
  { from: 'shoreline_185th', to: 'mountlake_terrace', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 4, fare: 2.50 },
  { from: 'mountlake_terrace', to: 'lynnwood', route: 'ST Link 1 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 3, fare: 2.75 },

  // ── SOUND TRANSIT LINK 2-LINE ──────────────────────────────────
  { from: 'intl_dist', to: 'judkins_park', route: 'ST Link 2 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 4, fare: 2.25 },
  { from: 'judkins_park', to: 'mercer_island', route: 'ST Link 2 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 7, fare: 2.50 },
  { from: 'mercer_island', to: 'south_bellevue', route: 'ST Link 2 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 3, fare: 2.75 },
  { from: 'south_bellevue', to: 'bellevue_downtown', route: 'ST Link 2 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 9, fare: 3.00 },
  { from: 'bellevue_downtown', to: 'east_main', route: 'ST Link 2 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 2, fare: 3.00 },
  { from: 'east_main', to: 'overlake_village', route: 'ST Link 2 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 8, fare: 3.00 },
  { from: 'overlake_village', to: 'redmond_tech', route: 'ST Link 2 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 3, fare: 3.00 },
  { from: 'redmond_tech', to: 'downtown_redmond', route: 'ST Link 2 Line', agency: 'sound-transit', mode: 'light-rail', minutes: 6, fare: 3.25 },

  // ── SOUNDER SOUTH ─────────────────────────────────────────────
  { from: 'king_st', to: 'tukwila_sounder', route: 'Sounder South', agency: 'sound-transit', mode: 'commuter-rail', minutes: 16, fare: 3.50 },
  { from: 'tukwila_sounder', to: 'kent_station', route: 'Sounder South', agency: 'sound-transit', mode: 'commuter-rail', minutes: 9, fare: 3.75 },
  { from: 'kent_station', to: 'auburn_station', route: 'Sounder South', agency: 'sound-transit', mode: 'commuter-rail', minutes: 11, fare: 4.00 },
  { from: 'auburn_station', to: 'sumner_station', route: 'Sounder South', agency: 'sound-transit', mode: 'commuter-rail', minutes: 14, fare: 4.50 },
  { from: 'sumner_station', to: 'puyallup_station', route: 'Sounder South', agency: 'sound-transit', mode: 'commuter-rail', minutes: 3, fare: 4.75 },
  { from: 'puyallup_station', to: 'tacoma_dome', route: 'Sounder South', agency: 'sound-transit', mode: 'commuter-rail', minutes: 10, fare: 5.25 },

  // ── SOUNDER NORTH ─────────────────────────────────────────────
  { from: 'king_st', to: 'edmonds_ferry', route: 'Sounder North', agency: 'sound-transit', mode: 'commuter-rail', minutes: 26, fare: 3.50 },
  { from: 'edmonds_ferry', to: 'everett_station', route: 'Sounder North', agency: 'sound-transit', mode: 'commuter-rail', minutes: 18, fare: 4.00 },

  // ── WASHINGTON STATE FERRIES ──────────────────────────────────
  { from: 'colman_dock', to: 'bainbridge_ferry', route: 'WSF Seattle–Bainbridge', agency: 'wsf', mode: 'ferry', minutes: 35, fare: 3.65 },
  { from: 'colman_dock', to: 'bremerton_ferry', route: 'WSF Seattle–Bremerton', agency: 'wsf', mode: 'ferry', minutes: 60, fare: 3.65 },
  { from: 'edmonds_ferry', to: 'kingston_ferry', route: 'WSF Edmonds–Kingston', agency: 'wsf', mode: 'ferry', minutes: 30, fare: 2.90 },
  { from: 'fauntleroy_ferry', to: 'vashon_ferry', route: 'WSF Fauntleroy–Vashon', agency: 'wsf', mode: 'ferry', minutes: 15, fare: 2.90 },
  { from: 'vashon_ferry', to: 'southworth_ferry', route: 'WSF Vashon–Southworth', agency: 'wsf', mode: 'ferry', minutes: 10, fare: 2.90 },
  { from: 'fauntleroy_ferry', to: 'southworth_ferry', route: 'WSF Fauntleroy–Southworth', agency: 'wsf', mode: 'ferry', minutes: 35, fare: 2.90 },
  { from: 'mukilteo_ferry', to: 'clinton_ferry', route: 'WSF Mukilteo–Clinton', agency: 'wsf', mode: 'ferry', minutes: 20, fare: 2.90 },
  { from: 'anacortes', to: 'friday_harbor', route: 'WSF Anacortes–Friday Harbor', agency: 'wsf', mode: 'ferry', minutes: 75, fare: 7.90 },
  { from: 'steilacoom', to: 'southworth_ferry', route: 'WSF Pierce County Ferries', agency: 'wsf', mode: 'ferry', minutes: 30, fare: 2.90 },
  { from: 'port_townsend', to: 'coupeville_tc', route: 'WSF Port Townsend–Keystone', agency: 'wsf', mode: 'ferry', minutes: 35, fare: 3.40 },

  // ── AMTRAK CASCADES ───────────────────────────────────────────
  { from: 'king_st', to: 'edmonds_ferry', route: 'Amtrak Cascades', agency: 'amtrak', mode: 'intercity-rail', minutes: 28, fare: 7.00 },
  { from: 'edmonds_ferry', to: 'everett_station', route: 'Amtrak Cascades', agency: 'amtrak', mode: 'intercity-rail', minutes: 20, fare: 7.00 },
  { from: 'everett_station', to: 'bellingham_wta', route: 'Amtrak Cascades', agency: 'amtrak', mode: 'intercity-rail', minutes: 75, fare: 12.00 },
  { from: 'king_st', to: 'tacoma_dome', route: 'Amtrak Cascades', agency: 'amtrak', mode: 'intercity-rail', minutes: 37, fare: 7.00 },
  { from: 'tacoma_dome', to: 'lakewood_tc', route: 'Amtrak Cascades', agency: 'amtrak', mode: 'intercity-rail', minutes: 12, fare: 5.00 },
  { from: 'lakewood_tc', to: 'amtrak_olympia', route: 'Amtrak Cascades', agency: 'amtrak', mode: 'intercity-rail', minutes: 23, fare: 7.00 },
  { from: 'amtrak_olympia', to: 'amtrak_vancouver_wa', route: 'Amtrak Cascades', agency: 'amtrak', mode: 'intercity-rail', minutes: 52, fare: 9.00 },

  // ── AMTRAK EMPIRE BUILDER ─────────────────────────────────────
  { from: 'king_st', to: 'yakima_amtrak', route: 'Amtrak Empire Builder', agency: 'amtrak', mode: 'intercity-rail', minutes: 185, fare: 34.00 },
  { from: 'yakima_amtrak', to: 'pasco_amtrak', route: 'Amtrak Empire Builder', agency: 'amtrak', mode: 'intercity-rail', minutes: 80, fare: 20.00 },
  { from: 'pasco_amtrak', to: 'spokane_amtrak', route: 'Amtrak Empire Builder', agency: 'amtrak', mode: 'intercity-rail', minutes: 90, fare: 22.00 },

  // ── KC METRO RAPIDRIDE ─────────────────────────────────────────
  { from: 'westlake', to: 'ballard', route: 'RapidRide D', agency: 'kcm', mode: 'brt', minutes: 25, fare: 2.75 },
  { from: 'westlake', to: 'west_seattle', route: 'RapidRide C', agency: 'kcm', mode: 'brt', minutes: 25, fare: 2.75 },
  { from: 'westlake', to: 'aurora_village', route: 'RapidRide E', agency: 'kcm', mode: 'brt', minutes: 40, fare: 2.75 },
  { from: 'federal_way_tc', to: 'seatac', route: 'RapidRide A', agency: 'kcm', mode: 'brt', minutes: 30, fare: 2.75 },
  { from: 'renton_tc', to: 'burien_tc', route: 'RapidRide F', agency: 'kcm', mode: 'brt', minutes: 35, fare: 2.75 },
  { from: 'bellevue_downtown', to: 'redmond_tech', route: 'RapidRide B', agency: 'kcm', mode: 'brt', minutes: 28, fare: 2.75 },

  // ── KC METRO EXPRESS BUSES ─────────────────────────────────────
  { from: 'seatac', to: 'renton_tc', route: 'Metro Route 169', agency: 'kcm', mode: 'bus', minutes: 30, fare: 2.75 },
  { from: 'burien_tc', to: 'seatac', route: 'Metro Route 124', agency: 'kcm', mode: 'bus', minutes: 20, fare: 2.75 },
  { from: 'tukwila_link', to: 'renton_tc', route: 'Metro Route 140', agency: 'kcm', mode: 'bus', minutes: 25, fare: 2.75 },
  { from: 'westlake', to: 'bellevue_downtown', route: 'Metro Route 550', agency: 'kcm', mode: 'bus', minutes: 30, fare: 2.75 },
  { from: 'uw_station', to: 'eastgate_pr', route: 'Metro Route 271', agency: 'kcm', mode: 'bus', minutes: 35, fare: 2.75 },
  { from: 'eastgate_pr', to: 'bellevue_downtown', route: 'Metro Route 271', agency: 'kcm', mode: 'bus', minutes: 12, fare: 2.75 },
  { from: 'bellevue_downtown', to: 'kirkland_tc', route: 'Metro Route 255', agency: 'kcm', mode: 'bus', minutes: 22, fare: 2.75 },
  { from: 'kirkland_tc', to: 'totem_lake_tc', route: 'Metro Route 255', agency: 'kcm', mode: 'bus', minutes: 15, fare: 2.75 },
  { from: 'totem_lake_tc', to: 'bothell_tc', route: 'Metro Route 236', agency: 'kcm', mode: 'bus', minutes: 20, fare: 2.75 },
  { from: 'south_kirkland_pr', to: 'bellevue_downtown', route: 'Metro Route 234', agency: 'kcm', mode: 'bus', minutes: 18, fare: 2.75 },
  { from: 'south_kirkland_pr', to: 'kirkland_tc', route: 'Metro Route 234', agency: 'kcm', mode: 'bus', minutes: 12, fare: 2.75 },
  { from: 'bellevue_downtown', to: 'crossroads_bellevue', route: 'Metro Route 226', agency: 'kcm', mode: 'bus', minutes: 15, fare: 2.75 },
  { from: 'crossroads_bellevue', to: 'overlake_village', route: 'Metro Route 226', agency: 'kcm', mode: 'bus', minutes: 12, fare: 2.75 },
  { from: 'newport_hills_pr', to: 'bellevue_downtown', route: 'Metro Route 241', agency: 'kcm', mode: 'bus', minutes: 20, fare: 2.75 },
  { from: 'uw_station', to: 'kenmore_pr', route: 'Metro Route 372', agency: 'kcm', mode: 'bus', minutes: 40, fare: 2.75 },
  { from: 'kenmore_pr', to: 'woodinville_tc', route: 'Metro Route 372', agency: 'kcm', mode: 'bus', minutes: 15, fare: 2.75 },
  { from: 'eastgate_pr', to: 'issaquah_tc', route: 'Metro Route 554', agency: 'kcm', mode: 'bus', minutes: 20, fare: 2.75 },
  { from: 'issaquah_tc', to: 'issaquah_highlands_pr', route: 'Metro Route 927', agency: 'kcm', mode: 'bus', minutes: 15, fare: 2.75 },
  { from: 'issaquah_tc', to: 'south_sammamish_pr', route: 'Metro Route 200', agency: 'kcm', mode: 'bus', minutes: 18, fare: 2.75 },
  { from: 'south_sammamish_pr', to: 'eastgate_pr', route: 'Metro Route 554', agency: 'kcm', mode: 'bus', minutes: 12, fare: 2.75 },
  { from: 'sammamish_highlands', to: 'downtown_redmond', route: 'Metro Route 931', agency: 'kcm', mode: 'bus', minutes: 20, fare: 2.75 },
  { from: 'issaquah_tc', to: 'fall_city_pr', route: 'Metro Route 208', agency: 'kcm', mode: 'bus', minutes: 20, fare: 2.75 },
  { from: 'fall_city_pr', to: 'snoqualmie_tc', route: 'Metro Route 208', agency: 'kcm', mode: 'bus', minutes: 15, fare: 2.75 },
  { from: 'des_moines_marina', to: 'federal_way_tc', route: 'Metro Route 183', agency: 'kcm', mode: 'bus', minutes: 25, fare: 2.75 },
  { from: 'westlake', to: 'fauntleroy_ferry', route: 'RapidRide H', agency: 'kcm', mode: 'brt', minutes: 30, fare: 2.75 },

  // ── SOUND TRANSIT EXPRESS ─────────────────────────────────────
  { from: 'westlake', to: 'lynnwood', route: 'ST Express 512', agency: 'sound-transit', mode: 'bus', minutes: 45, fare: 3.25 },
  { from: 'lynnwood', to: 'everett_station', route: 'ST Express 512', agency: 'sound-transit', mode: 'bus', minutes: 25, fare: 3.25 },
  { from: 'westlake', to: 'federal_way_tc', route: 'ST Express 577', agency: 'sound-transit', mode: 'bus', minutes: 50, fare: 3.25 },
  { from: 'westlake', to: 'tacoma_dome', route: 'ST Express 594', agency: 'sound-transit', mode: 'bus', minutes: 70, fare: 3.50 },
  { from: 'tacoma_dome', to: 'tacoma_tc', route: 'ST Express 594', agency: 'sound-transit', mode: 'bus', minutes: 5, fare: 0 },
  { from: 'westlake', to: 'issaquah_tc', route: 'ST Express 554', agency: 'sound-transit', mode: 'bus', minutes: 40, fare: 3.25 },
  { from: 'issaquah_tc', to: 'issaquah_highlands_pr', route: 'ST Express 554', agency: 'sound-transit', mode: 'bus', minutes: 10, fare: 3.25 },
  { from: 'uw_station', to: 'woodinville_tc', route: 'ST Express 522', agency: 'sound-transit', mode: 'bus', minutes: 35, fare: 3.25 },
  { from: 'woodinville_tc', to: 'bothell_tc', route: 'ST Express 522', agency: 'sound-transit', mode: 'bus', minutes: 10, fare: 3.00 },
  { from: 'south_kirkland_pr', to: 'westlake', route: 'ST Express 255', agency: 'sound-transit', mode: 'bus', minutes: 30, fare: 3.25 },
  { from: 'south_hill_pr', to: 'tacoma_dome', route: 'ST Express 402', agency: 'sound-transit', mode: 'bus', minutes: 30, fare: 3.25 },
  { from: 'tacoma_dome', to: 'gig_harbor_tc', route: 'ST Express 400', agency: 'sound-transit', mode: 'bus', minutes: 25, fare: 3.25 },
  { from: 'totem_lake_tc', to: 'uw_station', route: 'ST Express 540', agency: 'sound-transit', mode: 'bus', minutes: 28, fare: 3.25 },

  // ── COMMUNITY TRANSIT (SNOHOMISH) ────────────────────────────
  { from: 'lynnwood', to: 'ash_way', route: 'CT Swift Blue', agency: 'community-transit', mode: 'brt', minutes: 15, fare: 2.00 },
  { from: 'ash_way', to: 'paine_field', route: 'CT Swift Blue', agency: 'community-transit', mode: 'brt', minutes: 8, fare: 2.00 },
  { from: 'paine_field', to: 'mariner', route: 'CT Swift Blue', agency: 'community-transit', mode: 'brt', minutes: 5, fare: 2.00 },
  { from: 'mariner', to: 'everett_station', route: 'CT Swift Blue', agency: 'community-transit', mode: 'brt', minutes: 15, fare: 2.00 },
  { from: 'aurora_village', to: 'lynnwood', route: 'CT Route 105', agency: 'community-transit', mode: 'bus', minutes: 20, fare: 2.00 },
  { from: 'lynnwood', to: 'everett_station', route: 'CT Route 402', agency: 'community-transit', mode: 'bus', minutes: 35, fare: 3.25 },
  { from: 'everett_station', to: 'marysville_tc', route: 'CT Route 201', agency: 'community-transit', mode: 'bus', minutes: 25, fare: 2.00 },
  { from: 'marysville_tc', to: 'smokey_point_pr', route: 'CT Route 230', agency: 'community-transit', mode: 'bus', minutes: 20, fare: 2.00 },
  { from: 'mukilteo_ferry', to: 'everett_station', route: 'CT Route 113', agency: 'community-transit', mode: 'bus', minutes: 25, fare: 2.00 },
  { from: 'bothell_tc', to: 'lynnwood', route: 'CT Route 105', agency: 'community-transit', mode: 'bus', minutes: 20, fare: 2.00 },
  { from: 'stanwood_tc', to: 'marysville_tc', route: 'CT Route 240', agency: 'community-transit', mode: 'bus', minutes: 30, fare: 2.00 },

  // ── INTERCITY TRANSIT (THURSTON — FREE) ──────────────────────
  { from: 'olympia_tc', to: 'lacey_tc', route: 'IT Route 41', agency: 'intercity-transit', mode: 'bus', minutes: 20, fare: 0 },
  { from: 'lacey_tc', to: 'tumwater_tc', route: 'IT Route 62', agency: 'intercity-transit', mode: 'bus', minutes: 15, fare: 0 },
  { from: 'tumwater_tc', to: 'olympia_tc', route: 'IT Route 62', agency: 'intercity-transit', mode: 'bus', minutes: 15, fare: 0 },
  { from: 'olympia_tc', to: 'amtrak_olympia', route: 'IT Route 94', agency: 'intercity-transit', mode: 'bus', minutes: 12, fare: 0 },
  { from: 'lacey_tc', to: 'yelm_pr', route: 'IT Route 94X', agency: 'intercity-transit', mode: 'bus', minutes: 30, fare: 0 },

  // ── PIERCE TRANSIT ────────────────────────────────────────────
  { from: 'tacoma_dome', to: 'tacoma_tc', route: 'PT Route 1', agency: 'pierce-transit', mode: 'bus', minutes: 8, fare: 2.00 },
  { from: 'tacoma_tc', to: 'tacoma_community_college', route: 'PT Route 1', agency: 'pierce-transit', mode: 'bus', minutes: 20, fare: 2.00 },
  { from: 'tacoma_tc', to: 'tacoma_mall', route: 'PT Route 2', agency: 'pierce-transit', mode: 'bus', minutes: 15, fare: 2.00 },
  { from: 'tacoma_mall', to: 'puyallup_station', route: 'PT Route 400', agency: 'pierce-transit', mode: 'bus', minutes: 25, fare: 2.00 },
  { from: 'tacoma_dome', to: 'south_hill_pr', route: 'PT Route 402', agency: 'pierce-transit', mode: 'bus', minutes: 35, fare: 2.00 },
  { from: 'tacoma_tc', to: 'gig_harbor_tc', route: 'PT Route 100', agency: 'pierce-transit', mode: 'bus', minutes: 35, fare: 2.00 },
  { from: 'tacoma_dome', to: 'lakewood_tc', route: 'PT Route 212', agency: 'pierce-transit', mode: 'bus', minutes: 20, fare: 2.00 },
  { from: 'lakewood_tc', to: 'spanaway_tc', route: 'PT Route 206', agency: 'pierce-transit', mode: 'bus', minutes: 25, fare: 2.00 },
  { from: 'tacoma_dome', to: 'steilacoom', route: 'PT Route 212', agency: 'pierce-transit', mode: 'bus', minutes: 30, fare: 2.00 },

  // ── KITSAP TRANSIT ────────────────────────────────────────────
  { from: 'bremerton_ferry', to: 'bremerton_tc', route: 'Walk', agency: null, mode: 'walk', minutes: 3, fare: 0 },
  { from: 'bremerton_tc', to: 'silverdale_tc', route: 'KT Route 31', agency: 'kitsap-transit', mode: 'bus', minutes: 25, fare: 2.00 },
  { from: 'silverdale_tc', to: 'poulsbo_tc', route: 'KT Route 34', agency: 'kitsap-transit', mode: 'bus', minutes: 20, fare: 2.00 },
  { from: 'poulsbo_tc', to: 'kingston_ferry', route: 'KT Route 36', agency: 'kitsap-transit', mode: 'bus', minutes: 20, fare: 2.00 },
  { from: 'silverdale_tc', to: 'port_orchard_tc', route: 'KT Route 35', agency: 'kitsap-transit', mode: 'bus', minutes: 25, fare: 2.00 },
  { from: 'port_orchard_tc', to: 'southworth_ferry', route: 'KT Route 22', agency: 'kitsap-transit', mode: 'bus', minutes: 15, fare: 2.00 },
  { from: 'bainbridge_ferry', to: 'silverdale_tc', route: 'KT Route 90', agency: 'kitsap-transit', mode: 'bus', minutes: 40, fare: 2.00 },
  { from: 'silverdale_tc', to: 'bangor_base', route: 'KT Route 30', agency: 'kitsap-transit', mode: 'bus', minutes: 20, fare: 2.00 },

  // ── BEN FRANKLIN TRANSIT (TRI-CITIES) ────────────────────────
  { from: 'kennewick_bft', to: 'richland_bft', route: 'BFT Route 5', agency: 'bft', mode: 'bus', minutes: 20, fare: 1.00 },
  { from: 'richland_bft', to: 'pasco_bft', route: 'BFT Route 3', agency: 'bft', mode: 'bus', minutes: 25, fare: 1.00 },
  { from: 'kennewick_bft', to: 'pasco_bft', route: 'BFT Route 3', agency: 'bft', mode: 'bus', minutes: 15, fare: 1.00 },
  { from: 'richland_bft', to: 'west_richland', route: 'BFT Route 2', agency: 'bft', mode: 'bus', minutes: 15, fare: 1.00 },
  { from: 'pasco_bft', to: 'pasco_amtrak', route: 'Walk', agency: null, mode: 'walk', minutes: 3, fare: 0 },

  // ── C-TRAN (VANCOUVER WA) ────────────────────────────────────
  { from: 'vancouver_ctran', to: 'amtrak_vancouver_wa', route: 'C-TRAN Route 4', agency: 'ctran', mode: 'bus', minutes: 15, fare: 1.75 },
  { from: 'vancouver_ctran', to: 'fisher_s_landing', route: 'C-TRAN The Vine', agency: 'ctran', mode: 'brt', minutes: 25, fare: 1.75 },

  // ── STA (SPOKANE) ─────────────────────────────────────────────
  { from: 'spokane_sta', to: 'spokane_amtrak', route: 'Walk', agency: null, mode: 'walk', minutes: 5, fare: 0 },
  { from: 'spokane_sta', to: 'spokane_valley_tc', route: 'STA City Line BRT', agency: 'sta', mode: 'brt', minutes: 30, fare: 1.00 },
  { from: 'spokane_valley_tc', to: 'liberty_lake_pr', route: 'STA Route 174', agency: 'sta', mode: 'bus', minutes: 25, fare: 1.00 },
  { from: 'spokane_sta', to: 'cheney_tc', route: 'STA Route 66', agency: 'sta', mode: 'bus', minutes: 35, fare: 1.00 },
  { from: 'cheney_tc', to: 'medical_lake_tc', route: 'STA Route 66', agency: 'sta', mode: 'bus', minutes: 15, fare: 1.00 },
  { from: 'medical_lake_tc', to: 'airway_heights_tc', route: 'STA Route 65', agency: 'sta', mode: 'bus', minutes: 15, fare: 1.00 },
  { from: 'airway_heights_tc', to: 'spokane_sta', route: 'STA Route 60', agency: 'sta', mode: 'bus', minutes: 30, fare: 1.00 },
  { from: 'spokane_sta', to: 'northside_spokane', route: 'STA Route 25', agency: 'sta', mode: 'bus', minutes: 25, fare: 1.00 },
  { from: 'spokane_sta', to: 'south_spokane', route: 'STA Route 27', agency: 'sta', mode: 'bus', minutes: 20, fare: 1.00 },

  // ── YAKIMA TRANSIT ────────────────────────────────────────────
  { from: 'yakima_tc', to: 'yakima_amtrak', route: 'Walk', agency: null, mode: 'walk', minutes: 8, fare: 0 },
  { from: 'yakima_tc', to: 'union_gap', route: 'Yakima Route 1', agency: 'yakima-transit', mode: 'bus', minutes: 20, fare: 1.00 },
  { from: 'yakima_tc', to: 'selah', route: 'Yakima Route 3', agency: 'yakima-transit', mode: 'bus', minutes: 18, fare: 1.00 },

  // ── LINK TRANSIT (WENATCHEE) ──────────────────────────────────
  { from: 'wenatchee_link', to: 'east_wenatchee', route: 'Link Transit Route 1', agency: 'link-transit', mode: 'bus', minutes: 10, fare: 0 },
  { from: 'wenatchee_link', to: 'leavenworth_tc', route: 'Link Transit Route 22', agency: 'link-transit', mode: 'bus', minutes: 45, fare: 0 },

  // ── GRANT TRANSIT ─────────────────────────────────────────────
  { from: 'moses_lake_tc', to: 'ephrata_tc', route: 'Grant Transit Route 3', agency: 'grant-transit', mode: 'bus', minutes: 30, fare: 1.00 },
  { from: 'moses_lake_tc', to: 'quincy_pr', route: 'Grant Transit Route 2', agency: 'grant-transit', mode: 'bus', minutes: 35, fare: 1.00 },

  // ── PULLMAN TRANSIT ───────────────────────────────────────────
  { from: 'pullman_tc', to: 'wsu_campus', route: 'Cougar Xpress', agency: 'pullman-transit', mode: 'bus', minutes: 8, fare: 0 },

  // ── VALLEY TRANSIT (WALLA WALLA — FREE) ──────────────────────
  { from: 'walla_walla_vt', to: 'college_place', route: 'VT Route 1', agency: 'valley-transit', mode: 'bus', minutes: 15, fare: 0 },

  // ── NORTHWEST CONNECTIONS ─────────────────────────────────────
  { from: 'bellingham_wta', to: 'mount_vernon', route: 'Skagit-WTA Route 80X', agency: 'skagit', mode: 'bus', minutes: 45, fare: 1.00 },
  { from: 'mount_vernon', to: 'burlington_tc', route: 'Skagit Route 610', agency: 'skagit', mode: 'bus', minutes: 10, fare: 0.50 },
  { from: 'burlington_tc', to: 'sedro_woolley', route: 'Skagit Route 615', agency: 'skagit', mode: 'bus', minutes: 20, fare: 0.50 },
  { from: 'mount_vernon', to: 'anacortes', route: 'Skagit Route 410', agency: 'skagit', mode: 'bus', minutes: 35, fare: 0.50 },
  { from: 'oak_harbor_tc', to: 'coupeville_tc', route: 'Island Transit Route 1', agency: 'island-transit', mode: 'bus', minutes: 25, fare: 0 },
  { from: 'coupeville_tc', to: 'clinton_ferry', route: 'Island Transit Route 1', agency: 'island-transit', mode: 'bus', minutes: 30, fare: 0 },
  { from: 'port_townsend', to: 'sequim_tc', route: 'Jefferson Transit Route 7', agency: 'jefferson-transit', mode: 'bus', minutes: 40, fare: 1.00 },
  { from: 'sequim_tc', to: 'port_angeles_tc', route: 'Clallam Transit Route 30', agency: 'clallam-transit', mode: 'bus', minutes: 30, fare: 1.25 },

  // ── WALKING/SHUTTLE CONNECTIONS ────────────────────────────────
  { from: 'king_st', to: 'intl_dist', route: 'Walk', agency: null, mode: 'walk', minutes: 5, fare: 0 },
  { from: 'colman_dock', to: 'westlake', route: 'Walk', agency: null, mode: 'walk', minutes: 10, fare: 0 },
  { from: 'tukwila_sounder', to: 'tukwila_link', route: 'Shuttle', agency: 'sound-transit', mode: 'bus', minutes: 8, fare: 0 },
  { from: 'spokane_sta', to: 'spokane_amtrak', route: 'Walk', agency: null, mode: 'walk', minutes: 5, fare: 0 },
  { from: 'yakima_tc', to: 'yakima_amtrak', route: 'Walk', agency: null, mode: 'walk', minutes: 8, fare: 0 },
  { from: 'pasco_bft', to: 'pasco_amtrak', route: 'Walk', agency: null, mode: 'walk', minutes: 3, fare: 0 },
];

function buildGraph() {
  const graph = {};
  for (const c of connectionList) {
    if (!graph[c.from]) graph[c.from] = [];
    if (!graph[c.to]) graph[c.to] = [];
    graph[c.from].push({ ...c, toStop: c.to });
    graph[c.to].push({ ...c, fromStop: c.to, toStop: c.from, from: c.to, to: c.from });
  }
  return graph;
}

module.exports = { stops, connectionList, buildGraph };
