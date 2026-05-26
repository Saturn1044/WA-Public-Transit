import { useEffect, useState } from 'react'
import MapView from '../components/MapView'
import StopSearch from '../components/StopSearch'
import RouteResults from '../components/RouteResults'
import { getAllStops, planTrip } from '../api/transit'

const POPULAR = [
  { label: 'Airport ✈️', origin: 'westlake', dest: 'seatac' },
  { label: 'Bellevue', origin: 'westlake', dest: 'bellevue_downtown' },
  { label: 'Tacoma', origin: 'westlake', dest: 'tacoma_dome' },
  { label: 'Bainbridge ⛴️', origin: 'colman_dock', dest: 'bainbridge_ferry' },
  { label: 'Everett', origin: 'westlake', dest: 'everett_station' },
  { label: 'Olympia 🆓', origin: 'westlake', dest: 'olympia_tc' },
  { label: 'Lynnwood', origin: 'westlake', dest: 'lynnwood' },
  { label: 'Redmond', origin: 'westlake', dest: 'downtown_redmond' },
]

export default function Home() {
  const [allStops, setAllStops] = useState([])
  const [selectedStop, setSelectedStop] = useState(null)
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [mapLegs, setMapLegs] = useState([])
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    getAllStops().then(setAllStops).catch(() => {})
    // Open panel by default on desktop only
    if (window.innerWidth >= 768) setPanelOpen(true)
  }, [])

  const handleSearch = async (orig = origin, dest = destination) => {
    if (!orig || !dest) return
    setLoading(true)
    setError(null)
    setResults(null)
    setSelectedRoute(null)
    setMapLegs([])
    try {
      const data = await planTrip(orig.id, dest.id)
      setResults(data)
    } catch (e) {
      setError(e.response?.data?.error || 'No route found')
    } finally {
      setLoading(false)
    }
  }

  const handleQuick = (q) => {
    const o = allStops.find(s => s.id === q.origin)
    const d = allStops.find(s => s.id === q.dest)
    if (o && d) {
      setOrigin(o)
      setDestination(d)
      setResults(null)
      setMapLegs([])
      setSelectedRoute(null)
      handleSearch(o, d)
      setPanelOpen(true)
    }
  }

  return (
    <div className="h-full flex">
      {/* ── Side panel ── */}
      <div className={`flex-col bg-white shadow-xl border-r border-gray-200 flex-shrink-0
        ${panelOpen ? 'flex w-full md:w-96' : 'hidden md:flex md:w-0 md:overflow-hidden'}
      `}>
        <div className="flex-shrink-0 p-4 bg-[#0d1b2a] text-white">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-bold text-lg">Trip Planner</h1>
            <button
              onClick={() => setPanelOpen(false)}
              className="text-gray-400 hover:text-white text-2xl leading-none w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            >×</button>
          </div>

          <div className="space-y-2">
            <StopSearch
              label="From"
              placeholder="Search origin stop…"
              value={origin}
              onSelect={s => { setOrigin(s); setResults(null) }}
            />
            <StopSearch
              label="To"
              placeholder="Search destination stop…"
              value={destination}
              onSelect={s => { setDestination(s); setResults(null) }}
            />
          </div>

          <button
            onClick={() => handleSearch()}
            disabled={!origin || !destination || loading}
            className="mt-3 w-full py-2.5 rounded-lg bg-[#005DAA] text-white font-bold text-sm
              hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Finding routes…' : 'Find Routes →'}
          </button>

          {error && (
            <p className="mt-2 text-xs text-red-300 bg-red-900/30 rounded p-2">{error}</p>
          )}
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Popular routes */}
          {!results && !loading && (
            <div className="p-4 border-b border-gray-200">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Popular Routes
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {POPULAR.map(q => (
                  <button
                    key={q.label}
                    onClick={() => handleQuick(q)}
                    disabled={allStops.length === 0}
                    className="text-left text-xs px-2.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100
                      text-blue-800 font-medium transition-colors border border-blue-100 disabled:opacity-40"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Route results */}
          {loading && (
            <div className="flex items-center justify-center h-32 text-gray-400">
              <div className="text-center">
                <div className="text-3xl mb-2 animate-pulse">🚌</div>
                <p className="text-sm">Finding best routes…</p>
              </div>
            </div>
          )}
          {results && !loading && (
            <RouteResults
              results={results}
              onRouteSelect={r => { setSelectedRoute(r); setMapLegs(r.legs) }}
              selectedRoute={selectedRoute}
            />
          )}

          {/* Selected stop info */}
          {selectedStop && !results && (
            <div className="border-t border-gray-200 p-3 bg-gray-50">
              <div className="flex justify-between items-start mb-1">
                <div className="font-semibold text-sm">{selectedStop.name}</div>
                <button onClick={() => setSelectedStop(null)} className="text-gray-400 text-lg leading-none">×</button>
              </div>
              {selectedStop.address && (
                <p className="text-xs text-gray-500 mb-2">📍 {selectedStop.address}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => { setOrigin(selectedStop); setResults(null) }}
                  className="flex-1 text-xs bg-[#005DAA] text-white py-1.5 rounded font-medium"
                >Start here</button>
                <button
                  onClick={() => { setDestination(selectedStop); setResults(null) }}
                  className="flex-1 text-xs border border-[#005DAA] text-[#005DAA] py-1.5 rounded font-medium"
                >End here</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Map ── */}
      <div className={`flex-1 relative ${panelOpen ? 'hidden md:block' : 'block'}`}>
        <MapView
          stops={allStops}
          selectedStop={selectedStop}
          onStopClick={s => { setSelectedStop(s); setPanelOpen(true) }}
          routeLegs={mapLegs}
        />

        {!panelOpen && (
          <button
            onClick={() => setPanelOpen(true)}
            className="absolute top-4 left-4 z-[500] bg-white shadow-xl border border-gray-200
              rounded-xl px-4 py-2.5 text-sm font-bold text-[#005DAA] hover:bg-blue-50 flex items-center gap-2"
          >
            🗺️ Plan a Trip
          </button>
        )}

        {selectedRoute && (
          <div className="absolute bottom-4 left-4 right-4 z-[500] bg-white rounded-xl shadow-xl border border-gray-200 p-3">
            <div className="flex items-center justify-between gap-4 text-sm">
              <div className="font-semibold truncate text-gray-800">{selectedRoute.summary}</div>
              <div className="flex gap-5 flex-shrink-0 text-right">
                <div>
                  <div className="text-gray-400 text-xs">Time</div>
                  <div className="font-bold">
                    {selectedRoute.totalMinutes < 60
                      ? `${selectedRoute.totalMinutes} min`
                      : `${Math.floor(selectedRoute.totalMinutes/60)} hr ${selectedRoute.totalMinutes%60} min`}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Fare</div>
                  <div className={`font-bold ${selectedRoute.totalFare === 0 ? 'text-green-600' : ''}`}>
                    {selectedRoute.totalFare === 0 ? 'FREE' : `$${selectedRoute.totalFare.toFixed(2)}`}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Transfers</div>
                  <div className="font-bold">{selectedRoute.transfers}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
