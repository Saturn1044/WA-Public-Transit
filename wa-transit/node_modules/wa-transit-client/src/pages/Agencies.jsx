import { useEffect, useState } from 'react'
import AgencyCard from '../components/AgencyCard'
import { getAgencies } from '../api/transit'

const REGIONS = [
  { value: '', label: 'All Regions' },
  { value: 'puget-sound', label: 'Puget Sound' },
  { value: 'northwest', label: 'Northwest WA' },
  { value: 'southwest', label: 'Southwest WA' },
  { value: 'eastern', label: 'Eastern WA' },
  { value: 'statewide', label: 'Statewide' },
]

const MODES = [
  { value: '', label: 'All Modes' },
  { value: 'bus', label: 'Bus' },
  { value: 'brt', label: 'Rapid Bus (BRT)' },
  { value: 'light-rail', label: 'Light Rail' },
  { value: 'commuter-rail', label: 'Commuter Rail' },
  { value: 'ferry', label: 'Ferry' },
  { value: 'intercity-rail', label: 'Intercity Rail' },
]

export default function Agencies() {
  const [agencies, setAgencies] = useState([])
  const [loading, setLoading] = useState(true)
  const [region, setRegion] = useState('')
  const [mode, setMode] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    getAgencies({ region: region || undefined, mode: mode || undefined })
      .then(setAgencies)
      .finally(() => setLoading(false))
  }, [region, mode])

  const filtered = agencies.filter(a =>
    !search || a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.serviceArea.toLowerCase().includes(search.toLowerCase())
  )

  const freeAgencies = filtered.filter(a =>
    a.fares?.base === 0 || a.fares?.local === 0
  )

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Transit Agencies & Fares</h1>
          <p className="text-gray-500 mt-1">
            {agencies.length} agencies serving Washington state. Click any card to see full fare details.
          </p>
        </div>

        {/* Free transit highlight */}
        {freeAgencies.length > 0 && !region && !mode && !search && (
          <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="font-semibold text-green-800 text-sm mb-1">
              FREE Transit in Washington
            </div>
            <div className="text-sm text-green-700">
              {freeAgencies.map(a => a.name).join(', ')} — no fare required!
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search agencies…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none
              focus:ring-2 focus:ring-[#005DAA] bg-white w-48"
          />
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white
              focus:outline-none focus:ring-2 focus:ring-[#005DAA]"
          >
            {REGIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
          <select
            value={mode}
            onChange={e => setMode(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white
              focus:outline-none focus:ring-2 focus:ring-[#005DAA]"
          >
            {MODES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
          {(region || mode || search) && (
            <button
              onClick={() => { setRegion(''); setMode(''); setSearch('') }}
              className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="text-xs text-gray-500 mb-4">
          Showing {filtered.length} of {agencies.length} agencies
        </div>

        {/* Cards grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(agency => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <div className="text-5xl mb-3">🚏</div>
            <p>No agencies match your filters.</p>
          </div>
        )}

        {/* ORCA info */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm">
          <div className="font-semibold text-blue-900 mb-1">ORCA Card — Puget Sound Smart Card</div>
          <p className="text-blue-800">
            Most Puget Sound agencies accept the ORCA card. One tap pays your fare and automatically
            applies free 2-hour transfers between King County Metro, Sound Transit, Pierce Transit,
            Community Transit, Kitsap Transit, and Everett Transit. Load value online or at transit centers.
          </p>
        </div>
      </div>
    </div>
  )
}
