import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// ── Route corridor definitions ────────────────────────────────────────────────
const TRANSIT_ROUTES = [
  {
    id: 'link-1',
    name: 'Link 1 Line',
    agency: 'Sound Transit',
    mode: 'light-rail',
    color: '#005DAA',
    weight: 6,
    coords: [
      [47.2388, -122.4277], [47.3134, -122.3127], [47.4249, -122.2980],
      [47.4443, -122.2988], [47.4680, -122.2884], [47.5218, -122.2827],
      [47.5391, -122.2832], [47.5600, -122.2939], [47.5742, -122.3118],
      [47.5771, -122.3277], [47.5983, -122.3279], [47.6014, -122.3327],
      [47.6115, -122.3370], [47.6196, -122.3196], [47.6494, -122.3037],
      [47.7057, -122.3437], [47.7224, -122.3426], [47.7549, -122.3404],
      [47.7895, -122.3130], [47.8177, -122.3130],
    ],
  },
  {
    id: 'link-2',
    name: 'Link 2 Line',
    agency: 'Sound Transit',
    mode: 'light-rail',
    color: '#E31837',
    weight: 6,
    coords: [
      [47.5983, -122.3279], [47.5912, -122.2963], [47.5683, -122.2220],
      [47.5721, -122.1908], [47.6155, -122.2009], [47.6086, -122.1917],
      [47.6270, -122.1439], [47.6422, -122.1334], [47.6798, -122.1228],
    ],
  },
  {
    id: 'sounder-south',
    name: 'Sounder South',
    agency: 'Sound Transit',
    mode: 'commuter-rail',
    color: '#7B3F96',
    weight: 4,
    dashArray: '10 5',
    coords: [
      [47.5983, -122.3303], [47.4674, -122.2443], [47.3812, -122.2340],
      [47.3024, -122.2280], [47.2040, -122.2412], [47.1875, -122.2930],
      [47.2388, -122.4277],
    ],
  },
  {
    id: 'sounder-north',
    name: 'Sounder North',
    agency: 'Sound Transit',
    mode: 'commuter-rail',
    color: '#7B3F96',
    weight: 4,
    dashArray: '10 5',
    coords: [
      [47.5983, -122.3303], [47.8117, -122.3851], [47.9767, -122.2026],
    ],
  },
  {
    id: 'amtrak',
    name: 'Amtrak Cascades',
    agency: 'Amtrak',
    mode: 'intercity-rail',
    color: '#CC0033',
    weight: 3,
    dashArray: '14 5',
    coords: [
      [48.7441, -122.4809], [47.9767, -122.2026], [47.8117, -122.3851],
      [47.5983, -122.3303], [47.2388, -122.4277], [46.9882, -122.9149],
      [45.6286, -122.6748],
    ],
  },
  {
    id: 'wsf-bainbridge',
    name: 'WSF Seattle–Bainbridge',
    agency: 'WA State Ferries',
    mode: 'ferry',
    color: '#007BC3',
    weight: 4,
    dashArray: '6 6',
    coords: [[47.6024, -122.3384], [47.6234, -122.5128]],
  },
  {
    id: 'wsf-bremerton',
    name: 'WSF Seattle–Bremerton',
    agency: 'WA State Ferries',
    mode: 'ferry',
    color: '#007BC3',
    weight: 4,
    dashArray: '6 6',
    coords: [[47.6024, -122.3384], [47.5628, -122.6268]],
  },
  {
    id: 'wsf-edmonds',
    name: 'WSF Edmonds–Kingston',
    agency: 'WA State Ferries',
    mode: 'ferry',
    color: '#007BC3',
    weight: 4,
    dashArray: '6 6',
    coords: [[47.8117, -122.3851], [47.7960, -122.4960]],
  },
  {
    id: 'swift-blue',
    name: 'Community Transit Swift Blue',
    agency: 'Community Transit',
    mode: 'brt',
    color: '#00A651',
    weight: 4,
    coords: [
      [47.8177, -122.3130], [47.8553, -122.2598], [47.8820, -122.2650],
      [47.9767, -122.2026],
    ],
  },
  {
    id: 'st-express-594',
    name: 'ST Express 594',
    agency: 'Sound Transit',
    mode: 'bus',
    color: '#005DAA',
    weight: 3,
    dashArray: '8 4',
    coords: [[47.6115, -122.3370], [47.2388, -122.4277]],
  },
]

// ── Mode styling ──────────────────────────────────────────────────────────────
const MODE_STYLE = {
  'light-rail':     { color: '#005DAA', icon: '🚈', label: 'Light Rail' },
  'commuter-rail':  { color: '#7B3F96', icon: '🚆', label: 'Commuter Rail' },
  'intercity-rail': { color: '#CC0033', icon: '🚄', label: 'Intercity Rail (Amtrak)' },
  'brt':            { color: '#E31837', icon: '🚌', label: 'Rapid Bus (BRT)' },
  'bus':            { color: '#1a6b3c', icon: '🚌', label: 'Express Bus' },
  'ferry':          { color: '#007BC3', icon: '⛴️', label: 'Ferry' },
  'walk':           { color: '#888',    icon: '🚶', label: 'Walk' },
}

const AGENCY_COLORS = {
  'sound-transit':     '#005DAA',
  'kcm':               '#1a6b3c',
  'pierce-transit':    '#E31837',
  'community-transit': '#00A651',
  'wsf':               '#007BC3',
  'amtrak':            '#CC0033',
  'intercity-transit': '#F7941D',
  'kitsap-transit':    '#0072BC',
  'everett-transit':   '#7B3F96',
  'sta':               '#C8102E',
  'ctran':             '#00833E',
  'bft':               '#00A0DF',
}

function getStopColor(stop) {
  if (stop.modes?.includes('ferry')) return '#007BC3'
  if (stop.modes?.includes('light-rail')) return '#005DAA'
  if (stop.modes?.includes('commuter-rail') || stop.modes?.includes('intercity-rail')) return '#7B3F96'
  return AGENCY_COLORS[stop.agencies?.[0]] || '#555'
}

function buildTooltip(stop) {
  const modeIcons = (stop.modes || []).map(m => MODE_STYLE[m]?.icon || '').join(' ')
  return `
    <div style="min-width:200px; font-family: -apple-system, sans-serif;">
      <div style="font-weight:700; font-size:13px; margin-bottom:4px;">${stop.name}</div>
      ${stop.address ? `<div style="font-size:11px; color:#555; margin-bottom:4px;">📍 ${stop.address}</div>` : ''}
      <div style="font-size:11px; color:#666; margin-bottom:4px;">${stop.city}, WA</div>
      ${modeIcons ? `<div style="font-size:13px; margin-top:4px;">${modeIcons}</div>` : ''}
      ${stop.description ? `<div style="font-size:11px; color:#888; margin-top:5px; line-height:1.4;">${stop.description}</div>` : ''}
    </div>
  `
}

// ── Legend items ──────────────────────────────────────────────────────────────
const LEGEND_ITEMS = [
  { color: '#005DAA', dash: false,  weight: 5, label: 'Link 1 Line (Light Rail)' },
  { color: '#E31837', dash: false,  weight: 5, label: 'Link 2 Line (Light Rail)' },
  { color: '#7B3F96', dash: true,   weight: 4, label: 'Sounder Commuter Rail' },
  { color: '#CC0033', dash: true,   weight: 3, label: 'Amtrak Cascades' },
  { color: '#007BC3', dash: 'dots', weight: 3, label: 'WSF Ferries' },
  { color: '#00A651', dash: false,  weight: 4, label: 'Community Transit BRT' },
  { color: '#005DAA', dash: 'short',weight: 3, label: 'Sound Transit Express' },
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function MapView({ stops, selectedStop, onStopClick, routeLegs }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const routeLayerRef = useRef(null)
  const [legendCollapsed, setLegendCollapsed] = useState(false)

  // Invalidate map size whenever the container is resized or shown
  useEffect(() => {
    if (!mapRef.current) return
    const observer = new ResizeObserver(() => {
      mapInstanceRef.current?.invalidateSize()
    })
    observer.observe(mapRef.current)
    return () => observer.disconnect()
  }, [])

  // Initialize map
  useEffect(() => {
    if (mapInstanceRef.current) return

    const map = L.map(mapRef.current, { center: [47.6, -122.3], zoom: 10 })
    mapInstanceRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> · © <a href="https://carto.com">CARTO</a>',
      maxZoom: 19,
    }).addTo(map)

    // Draw all transit route corridors
    for (const route of TRANSIT_ROUTES) {
      const line = L.polyline(route.coords, {
        color: route.color,
        weight: route.weight || 4,
        opacity: 0.85,
        dashArray: route.dashArray || null,
        lineCap: 'round',
        lineJoin: 'round',
      })
      line.bindTooltip(
        `<b>${route.name}</b><br><small>${route.agency} · ${MODE_STYLE[route.mode]?.label || route.mode}</small>`,
        { sticky: true, direction: 'top', className: 'transit-tooltip' }
      )
      line.addTo(map)
    }

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Update stop markers
  useEffect(() => {
    if (!mapInstanceRef.current) return
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []
    if (!stops || stops.length === 0) return

    for (const stop of stops) {
      const isSelected = selectedStop?.id === stop.id
      const color = getStopColor(stop)

      const marker = L.circleMarker([stop.lat, stop.lon], {
        radius: isSelected ? 10 : 6,
        fillColor: isSelected ? '#FFD700' : color,
        color: 'white',
        weight: isSelected ? 3 : 2,
        opacity: 1,
        fillOpacity: 1,
      })

      marker.bindTooltip(buildTooltip(stop), {
        permanent: false,
        direction: 'top',
        offset: [0, -6],
        opacity: 1,
      })

      marker.on('click', () => onStopClick?.(stop))
      marker.addTo(mapInstanceRef.current)
      markersRef.current.push(marker)
    }
  }, [stops, selectedStop])

  // Draw selected route legs
  useEffect(() => {
    if (!mapInstanceRef.current) return
    routeLayerRef.current?.remove()
    if (!routeLegs || routeLegs.length === 0) return

    const group = L.layerGroup()
    const allCoords = []

    for (const leg of routeLegs) {
      const fromStop = stops?.find(s => s.id === leg.from)
      const toStop = stops?.find(s => s.id === leg.to)
      if (!fromStop || !toStop) continue

      const coords = [[fromStop.lat, fromStop.lon], [toStop.lat, toStop.lon]]
      allCoords.push(...coords)

      L.polyline(coords, {
        color: MODE_STYLE[leg.mode]?.color || '#333',
        weight: 8,
        opacity: 0.9,
        lineCap: 'round',
      })
        .bindTooltip(`${leg.route} · ${leg.minutes} min${leg.fare > 0 ? ` · $${leg.fare.toFixed(2)}` : ' · FREE'}`, {
          sticky: true,
          direction: 'top',
        })
        .addTo(group)

      // Origin marker
      L.circleMarker([fromStop.lat, fromStop.lon], {
        radius: 8, fillColor: '#fff', color: MODE_STYLE[leg.mode]?.color || '#333',
        weight: 3, fillOpacity: 1,
      }).addTo(group)
    }

    // Destination marker
    if (routeLegs.length > 0) {
      const lastLeg = routeLegs[routeLegs.length - 1]
      const destStop = stops?.find(s => s.id === lastLeg.to)
      if (destStop) {
        L.circleMarker([destStop.lat, destStop.lon], {
          radius: 10, fillColor: '#22c55e', color: 'white', weight: 3, fillOpacity: 1,
        }).addTo(group)
      }
    }

    group.addTo(mapInstanceRef.current)
    routeLayerRef.current = group

    if (allCoords.length > 0) {
      mapInstanceRef.current.fitBounds(allCoords, { padding: [50, 50], maxZoom: 14 })
    }
  }, [routeLegs, stops])

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" style={{ touchAction: 'none' }} />

      {/* ── Legend ── */}
      <div className="absolute bottom-4 right-3 z-[500] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
           style={{ minWidth: legendCollapsed ? 0 : 210, maxWidth: 230 }}>
        <button
          onClick={() => setLegendCollapsed(c => !c)}
          className="w-full bg-[#0d1b2a] text-white text-xs font-bold px-3 py-2 tracking-wide uppercase flex items-center justify-between"
        >
          <span>Map Legend</span>
          <span className="text-gray-400 text-base leading-none">{legendCollapsed ? '+' : '−'}</span>
        </button>
        {!legendCollapsed && (
          <>
            <div className="px-3 py-2 space-y-1.5">
              {LEGEND_ITEMS.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg width="36" height="10" className="flex-shrink-0">
                    <line
                      x1="2" y1="5" x2="34" y2="5"
                      stroke={item.color}
                      strokeWidth={item.weight}
                      strokeDasharray={
                        item.dash === 'dots' ? '3 3'
                        : item.dash === 'short' ? '6 3'
                        : item.dash ? '8 4'
                        : 'none'
                      }
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-xs text-gray-700 leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 px-3 py-2 space-y-1.5">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Stops</div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14"><circle cx="7" cy="7" r="5" fill="#005DAA" stroke="white" strokeWidth="2"/></svg>
                <span className="text-xs text-gray-700">Transit Stop</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14"><circle cx="7" cy="7" r="6" fill="#FFD700" stroke="white" strokeWidth="2"/></svg>
                <span className="text-xs text-gray-700">Selected Stop</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14"><circle cx="7" cy="7" r="6" fill="#22c55e" stroke="white" strokeWidth="2"/></svg>
                <span className="text-xs text-gray-700">Destination</span>
              </div>
            </div>
            <div className="bg-gray-50 px-3 py-1.5 border-t border-gray-100">
              <p className="text-xs text-gray-400 italic">Tap any stop or line for details</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
