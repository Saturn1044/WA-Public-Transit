import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import StopSearch from '../components/StopSearch'
import RouteResults from '../components/RouteResults'
import MapView from '../components/MapView'
import { planTrip, getAllStops } from '../api/transit'

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

export default function RoutePlanner() {
  const [searchParams] = useSearchParams()
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [allStops, setAllStops] = useState([])
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [mapLegs, setMapLegs] = useState([])
  const [panelOpen, setPanelOpen] = useState(true)

  useEffect(() => {
    getAllStops().then(setAllStops).catch(() => {})
  }, [])

  useEffect(() => {
    const originId = searchParams.get('origin')
    const destId = searchParams.get('dest')
    if ((originId || destId) && allStops.length > 0) {
      if (originId) {
        const s = allStops.find(s => s.id === originId)
        if (s) setOrigin(s)
      }
      if (destId) {
        const s = allStops.find(s => s.id === destId)
        if (s) setDestination(s)
      }
    }
  }, [searchParams, allStops])

  useEffect(() => {
    if (origin && destination && !results && !loading) {
      handleSearch(origin, destination)
    }
  }, [origin, destination])

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
      setError(e.response?.data?.error || 'Failed to plan route')
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
    }
  }

  const handleRouteSelect = (route) => {
    setSelectedRoute(route)
    setMapLegs(route.legs)
  }


  return (
    <div className="flex h-full">

      {/* Panel — full width on mobile, sidebar on desktop */}
      <div className={`flex-col bg-white border-r border-gray-200 shadow-sm flex-shrink-0
        ${panelOpen ? 'flex w-full md:w-96' : 'hidden md:flex md:w-0 md:overflow-hidden'}
      `}>

        {/* Sticky header */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-900">Plan Your Trip</h2>
            <button
              onClick={() => setPanelOpen(false)}
              className="md:hidden text-gray-400 hover:text-gray-600 text-2xl leading-none w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >×</button>
          </div>

          <div className="space-y-2">
            <StopSearch
              label="From"
              placeholder="Search origin stop…"
              value={origin}
              onSelect={(s) => { setOrigin(s); setResults(null) }}
            />
            <StopSearch
              label="To"
              placeholder="Search destination stop…"
              value={destination}
              onSelect={(s) => { setDestination(s); setResults(null) }}
            />
          </div>

          <button
            onClick={() => handleSearch()}
            disabled={!origin || !destination || loading}
            className="mt-3 w-full py-2.5 rounded-lg bg-[#005DAA] text-white font-semibold text-sm
              hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Finding routes…' : 'Find Routes →'}
          </button>

          {error && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</div>
          )}
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {!results && !loading && (
            <div className="p-4 border-b border-gray-100">
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

          {loading && (
            <div className="flex items-center justify-center h-48 text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-3 animate-pulse">🚌</div>
                <p className="text-sm">Finding best routes…</p>
              </div>
            </div>
          )}

          {!loading && !results && !error && (
            <div className="flex items-center justify-center h-48 text-gray-400 px-6">
              <div className="text-center">
                <div className="text-5xl mb-3">🗺️</div>
                <p className="text-sm font-medium">Enter origin and destination</p>
                <p className="text-xs mt-1">Search for any transit stop in Washington state</p>
              </div>
            </div>
          )}

          {results && !loading && (
            <RouteResults
              results={results}
              onRouteSelect={handleRouteSelect}
              selectedRoute={selectedRoute}
            />
          )}
        </div>
      </div>

      {/* Map — hidden on mobile when panel is open */}
      <div className={`flex-1 relative ${panelOpen ? 'hidden md:block' : 'block'}`}>
        <MapView
          stops={allStops}
          selectedStop={null}
          routeLegs={mapLegs}
          onStopClick={null}
        />

        {!panelOpen && (
          <button
            onClick={() => setPanelOpen(true)}
            className="absolute top-4 right-4 z-[500] bg-white shadow-xl border border-gray-200
              rounded-xl px-4 py-2.5 text-sm font-bold text-[#005DAA] hover:bg-blue-50 flex items-center gap-2"
          >
            🗺️ Plan a Trip
          </button>
        )}

        {selectedRoute && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-xl p-3 border border-gray-200 z-[500]">
            <div className="flex items-center justify-between text-sm">
              <div className="font-semibold truncate">{selectedRoute.summary}</div>
              <div className="flex gap-4 flex-shrink-0 text-right">
                <div>
                  <span className="text-gray-500 text-xs">Time</span>
                  <div className="font-bold">
                    {selectedRoute.totalMinutes < 60
                      ? `${selectedRoute.totalMinutes} min`
                      : `${Math.floor(selectedRoute.totalMinutes/60)} hr ${selectedRoute.totalMinutes%60} min`}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Fare</span>
                  <div className={`font-bold ${selectedRoute.totalFare === 0 ? 'text-green-600' : ''}`}>
                    {selectedRoute.totalFare === 0 ? 'FREE' : `$${selectedRoute.totalFare.toFixed(2)}`}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Transfers</span>
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
