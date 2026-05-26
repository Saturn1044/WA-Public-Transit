import { useState } from 'react'

const MODE_LABELS = {
  'bus': 'Bus',
  'brt': 'Rapid Bus (BRT)',
  'light-rail': 'Light Rail',
  'commuter-rail': 'Commuter Rail',
  'intercity-rail': 'Intercity Rail',
  'ferry': 'Ferry',
}

const MODE_ICONS = {
  'bus': '🚌',
  'brt': '🚌',
  'light-rail': '🚈',
  'commuter-rail': '🚆',
  'intercity-rail': '🚄',
  'ferry': '⛴️',
}

const REGION_LABELS = {
  'puget-sound': 'Puget Sound',
  'northwest': 'Northwest WA',
  'southwest': 'Southwest WA',
  'eastern': 'Eastern WA',
  'statewide': 'Statewide',
}

function FareRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm py-1 border-b border-gray-100 last:border-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">
        {typeof value === 'number'
          ? value === 0 ? <span className="text-green-600 font-bold">FREE</span> : `$${value.toFixed(2)}`
          : typeof value === 'object' && value !== null
          ? `${value.foot === 0 ? 'FREE' : `$${value.foot.toFixed(2)}`} walk · $${value.car.toFixed(2)} car`
          : value
        }
      </span>
    </div>
  )
}

export default function AgencyCard({ agency }) {
  const [expanded, setExpanded] = useState(false)
  const fareEntries = Object.entries(agency.fares || {}).filter(([k]) => k !== 'note')

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      style={{ borderTop: `4px solid ${agency.color}` }}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{agency.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{agency.serviceArea}</p>
          </div>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full flex-shrink-0">
            {REGION_LABELS[agency.region] || agency.region}
          </span>
        </div>

        {/* Modes */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {agency.modes.map(mode => (
            <span
              key={mode}
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: `${agency.color}20`, color: agency.color }}
            >
              {MODE_ICONS[mode]} {MODE_LABELS[mode] || mode}
            </span>
          ))}
          {agency.orcaAccepted && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
              ORCA Card
            </span>
          )}
        </div>

        {/* Base fare highlight */}
        <div className="mt-3 flex items-center justify-between">
          <div>
            {agency.fares.base === 0 ? (
              <span className="text-lg font-bold text-green-600">FREE</span>
            ) : agency.fares.base ? (
              <span className="text-lg font-bold text-gray-900">${agency.fares.base.toFixed(2)}</span>
            ) : agency.fares.local ? (
              <span className="text-lg font-bold text-gray-900">${agency.fares.local.toFixed(2)}</span>
            ) : null}
            <span className="text-xs text-gray-500 ml-1">base fare</span>
          </div>
          <button
            onClick={() => setExpanded(e => !e)}
            className="text-xs text-[#005DAA] hover:underline font-medium"
          >
            {expanded ? 'Less info ▲' : 'Full fares ▼'}
          </button>
        </div>
      </div>

      {/* Expanded fare table */}
      {expanded && (
        <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Fare Table</div>
          {fareEntries.map(([key, val]) => (
            <FareRow key={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())} value={val} />
          ))}
          {agency.fares.note && (
            <p className="text-xs text-gray-500 mt-2 italic">{agency.fares.note}</p>
          )}
          <div className="mt-3 flex gap-2">
            <a
              href={agency.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#005DAA] hover:underline"
            >
              Website →
            </a>
            {agency.phone && (
              <span className="text-xs text-gray-500">{agency.phone}</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
