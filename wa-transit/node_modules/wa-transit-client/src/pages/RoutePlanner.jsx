import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import StopSearch from '../components/StopSearch'
import RouteResults from '../components/RouteResults'
import MapView from '../components/MapView'
import { planTrip, getAllStops } from '../api/transit'

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

  useEffect(() => {
    getAllStops().then(setAllStops).catch(() => {})
  }, [])

  // Pre-fill from URL params
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

  // Auto-search when both stops are set from URL
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

  const handleRouteSelect = (route) => {
    setSelectedRoute(route)
    setMapLegs(route.legs)
  }

  const swap = () => {
    setOrigin(destination)
    setDestination(origin)
    setResults(null)
    setMapLegs([])
    setSelectedRoute(null)
  }

  return (
    <div className="flex h-full">
      {/* Left panel */}
      <div className="w-96 flex-shrink-0 flex flex-col bg-white border-r border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-bold text-gray-900 mb-3">Plan Your Trip</h2>

          <div className="space-y-2 relative">
            <StopSearch
              label="From"
              placeholder="Search origin stop…"
              value={origin}
              onSelect={(s) => { setOrigin(s); setResults(null) }}
            />

            {/* Swap button */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10">
              <button
                onClick={swap}
                className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center
                  justify-center text-gray-500 hover:bg-gray-50 shadow-sm text-sm"
                title="Swap origin and destination"
              >
                ⇅
              </button>
            </div>

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
            {loading ? 'Finding routes…' : 'Find Routes'}
          </button>

          {error && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-hidden">
          {loading && (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-3 animate-pulse">🚌</div>
                <p className="text-sm">Finding best routes…</p>
              </div>
            </div>
          )}

          {!loading && !results && !error && (
            <div className="flex items-center justify-center h-full text-gray-400 px-6">
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

      {/* Map */}
      <div className="flex-1 relative">
        <MapView
          stops={allStops}
          selectedStop={null}
          routeLegs={mapLegs}
          onStopClick={null}
        />

        {/* Info overlay when a route is selected */}
        {selectedRoute && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-xl p-3 border border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <div className="font-semibold">{selectedRoute.summary}</div>
              <div className="flex gap-4 text-right">
                <div>
                  <span className="text-gray-500 text-xs">Time</span>
                  <div className="font-bold">
                    {selectedRoute.totalMinutes < 60
                      ? `${selectedRoute.totalMinutes} min`
                      : `${Math.floor(selectedRoute.totalMinutes/60)}h ${selectedRoute.totalMinutes%60}m`}
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
