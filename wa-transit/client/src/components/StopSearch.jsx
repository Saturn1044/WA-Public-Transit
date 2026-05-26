import { useState, useRef, useEffect } from 'react'
import { searchStops } from '../api/transit'

const MODE_ICONS = {
  'light-rail': '🚈',
  'commuter-rail': '🚆',
  'intercity-rail': '🚄',
  'brt': '🚌',
  'bus': '🚌',
  'ferry': '⛴️',
}

export default function StopSearch({ label, placeholder, value, onSelect }) {
  const [query, setQuery] = useState(value?.name || '')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const debounceRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (value?.name) setQuery(value.name)
  }, [value])

  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleInput = (e) => {
    const val = e.target.value
    setQuery(val)
    setOpen(true)
    clearTimeout(debounceRef.current)
    if (val.trim().length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const stops = await searchStops(val)
        setResults(stops)
      } finally {
        setLoading(false)
      }
    }, 250)
  }

  const handleSelect = (stop) => {
    setQuery(stop.name)
    setResults([])
    setOpen(false)
    onSelect(stop)
  }

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          {label}
        </label>
      )}
      <input
        type="text"
        value={query}
        onChange={handleInput}
        onFocus={() => query.length >= 2 && setOpen(true)}
        placeholder={placeholder || 'Search stops…'}
        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900
          focus:outline-none focus:ring-2 focus:ring-[#005DAA] focus:border-transparent
          bg-white shadow-sm placeholder-gray-400"
      />
      {open && (loading || results.length > 0) && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-64 overflow-y-auto">
          {loading && (
            <div className="px-4 py-3 text-sm text-gray-500">Searching…</div>
          )}
          {!loading && results.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">No stops found</div>
          )}
          {results.map(stop => (
            <button
              key={stop.id}
              onClick={() => handleSelect(stop)}
              className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="flex items-start gap-2">
                <span className="text-lg leading-none mt-0.5">
                  {stop.modes?.[0] ? MODE_ICONS[stop.modes[0]] || '📍' : '📍'}
                </span>
                <div>
                  <div className="text-sm font-medium text-gray-900">{stop.name}</div>
                  <div className="text-xs text-gray-500">{stop.city}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
