import { useState } from 'react'

const MODE_ICONS = {
  'light-rail': '🚈',
  'commuter-rail': '🚆',
  'intercity-rail': '🚄',
  'brt': '🚌',
  'bus': '🚌',
  'ferry': '⛴️',
  'walk': '🚶',
}

const MODE_COLORS = {
  'light-rail': 'bg-blue-100 text-blue-800',
  'commuter-rail': 'bg-purple-100 text-purple-800',
  'intercity-rail': 'bg-red-100 text-red-800',
  'brt': 'bg-orange-100 text-orange-800',
  'bus': 'bg-green-100 text-green-800',
  'ferry': 'bg-cyan-100 text-cyan-800',
  'walk': 'bg-gray-100 text-gray-600',
}

function formatTime(minutes) {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`
}

function formatFare(fare) {
  return fare === 0 ? 'FREE' : `$${fare.toFixed(2)}`
}

function RouteCard({ route, index, onSelect, selected }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all cursor-pointer ${
        selected
          ? 'border-[#005DAA] shadow-md ring-2 ring-blue-200'
          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
      }`}
      onClick={() => {
        setExpanded(e => !e)
        onSelect?.(route)
      }}
    >
      {/* Header */}
      <div className="p-3 bg-white">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {[...new Set(route.legs.map(l => l.mode))].map(m => (
              <span key={m} className={`text-xs px-2 py-0.5 rounded-full font-medium ${MODE_COLORS[m] || 'bg-gray-100'}`}>
                {MODE_ICONS[m]}{' '}
                {m.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </span>
            ))}
          </div>
          <div className="text-xs text-gray-400">{expanded ? '▲' : '▼'}</div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div>
              <span className="font-bold text-xl text-gray-900">{formatTime(route.totalMinutes)}</span>
            </div>
            <div className="text-gray-500">
              {route.transfers === 0 ? 'Direct' : `${route.transfers} transfer${route.transfers > 1 ? 's' : ''}`}
            </div>
          </div>
          <div className={`font-bold text-lg ${route.totalFare === 0 ? 'text-green-600' : 'text-gray-900'}`}>
            {formatFare(route.totalFare)}
          </div>
        </div>

        <div className="mt-1 text-xs text-gray-500 truncate">
          {route.summary}
        </div>
      </div>

      {/* Expanded itinerary */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 p-3 space-y-0">
          {route.legs.map((leg, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                  MODE_COLORS[leg.mode] || 'bg-gray-100'
                }`}>
                  {MODE_ICONS[leg.mode] || '•'}
                </div>
                {i < route.legs.length - 1 && (
                  <div className="w-0.5 h-6 bg-gray-300 my-0.5" />
                )}
              </div>
              <div className="pb-3 min-w-0">
                <div className="text-xs font-semibold text-gray-700">
                  {leg.fromName}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {leg.route} · {leg.minutes} min
                  {leg.fare > 0 && ` · $${leg.fare.toFixed(2)}`}
                  {leg.fare === 0 && leg.mode !== 'walk' && ' · FREE'}
                </div>
                {leg.waitMinutes > 0 && (
                  <div className="text-xs text-amber-600 mt-0.5">
                    ~{leg.waitMinutes} min wait/transfer
                  </div>
                )}
              </div>
            </div>
          ))}
          {/* Final stop */}
          {route.legs.length > 0 && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm flex-shrink-0">
                📍
              </div>
              <div className="text-xs font-semibold text-gray-700 pt-1.5">
                {route.legs[route.legs.length - 1].toName}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const TABS = [
  { key: 'fastest', label: 'Fastest', icon: '⚡' },
  { key: 'cheapest', label: 'Cheapest', icon: '💰' },
  { key: 'fewestTransfers', label: 'Fewest Transfers', icon: '↔️' },
]

export default function RouteResults({ results, onRouteSelect, selectedRoute }) {
  const [activeTab, setActiveTab] = useState('fastest')

  if (!results) return null

  const routes = results[activeTab] || []

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
              activeTab === tab.key
                ? 'border-b-2 border-[#005DAA] text-[#005DAA]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {routes.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-sm">No routes found for this combination.</p>
            <p className="text-xs mt-1 text-gray-400">Try different stops or check if they're in the same region.</p>
          </div>
        )}
        {routes.map((route, i) => (
          <RouteCard
            key={i}
            route={route}
            index={i}
            onSelect={onRouteSelect}
            selected={selectedRoute === route}
          />
        ))}
      </div>

      {/* Cost comparison footer */}
      {results.fastest?.length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50 p-3">
          <div className="text-xs text-gray-500 font-medium mb-1">Cost comparison</div>
          <div className="flex gap-4 text-xs">
            <div>
              <span className="text-gray-400">Fastest: </span>
              <span className="font-semibold">
                {results.fastest[0]?.totalFare === 0 ? 'FREE' : `$${results.fastest[0]?.totalFare?.toFixed(2)}`}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Cheapest: </span>
              <span className="font-semibold text-green-600">
                {results.cheapest[0]?.totalFare === 0 ? 'FREE' : `$${results.cheapest[0]?.totalFare?.toFixed(2)}`}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
