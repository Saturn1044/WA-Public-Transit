import { useState, useMemo, useEffect, useRef } from 'react'
import { schedules, routeGroups } from '../data/schedules'

const MODE_ICONS = {
  'light-rail':     '🚈',
  'commuter-rail':  '🚆',
  'intercity-rail': '🚄',
  'brt':            '🚌',
  'bus':            '🚌',
  'ferry':          '⛴️',
}

const DAY_LABELS = {
  weekday: 'Weekday',
  weekend: 'Weekend / Holiday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

function todayDayKey() {
  const day = new Date().getDay()
  if (day === 0 || day === 6) return 'weekend'
  return 'weekday'
}

function timeToMinutes(t) {
  if (!t) return Infinity
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function formatTime(t) {
  if (!t) return '—'
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
}

function formatClock(date) {
  const h = date.getHours()
  const m = date.getMinutes().toString().padStart(2, '0')
  const s = date.getSeconds().toString().padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${m}:${s} ${ampm}`
}

function formatDiff(diff) {
  if (diff <= 0) return 'NOW'
  if (diff < 60) return `${diff} min`
  const h = Math.floor(diff / 60)
  const m = diff % 60
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`
}

function findNextTripIndex(route, schedKey, currentMinutes) {
  const firstStop = route.stops[0]
  if (!firstStop) return -1
  const times = firstStop[schedKey] || []
  for (let i = 0; i < times.length; i++) {
    if (timeToMinutes(times[i]) >= currentMinutes) return i
  }
  return -1
}

function LiveClock() {
  const [display, setDisplay] = useState(formatClock(new Date()))
  useEffect(() => {
    const id = setInterval(() => setDisplay(formatClock(new Date())), 1_000)
    return () => clearInterval(id)
  }, [])
  return <span className="text-xs text-blue-300 font-mono tabular-nums">{display}</span>
}

function NextDepartureBanner({ route, schedKey, currentMinutes }) {
  const nextIdx = findNextTripIndex(route, schedKey, currentMinutes)
  if (nextIdx === -1) return (
    <div className="mb-4 px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-sm text-gray-500">
      No more departures in this schedule window. Check agency website for full timetable.
    </div>
  )

  const firstStop = route.stops[0]
  const depTime = firstStop?.[schedKey]?.[nextIdx]
  if (!depTime) return null

  const diff = timeToMinutes(depTime) - currentMinutes
  const minsLabel = diff <= 0 ? 'Departing now' : `in ${formatDiff(diff)}`

  return (
    <div
      className="mb-4 px-4 py-3 rounded-xl border text-sm flex items-center gap-3"
      style={{ backgroundColor: route.color + '15', borderColor: route.color + '40' }}
    >
      <span className="text-2xl">{MODE_ICONS[route.mode] || '🚌'}</span>
      <div>
        <span className="font-bold" style={{ color: route.color }}>Next departure </span>
        <span className="text-gray-700">{minsLabel} · departs {formatTime(depTime)} from {firstStop?.name}</span>
      </div>
      <span
        className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full text-white flex-shrink-0"
        style={{ backgroundColor: route.color }}
      >
        {formatDiff(diff)}
      </span>
    </div>
  )
}

function RouteGroupItem({ group, selected, onSelect, currentMinutes }) {
  return (
    <div className="mb-1">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide px-2 py-1">
        {group.label}
      </div>
      {group.routes.map(routeId => {
        const route = schedules.find(s => s.id === routeId)
        if (!route) return null
        const isSelected = selected?.id === routeId

        const dayKey = todayDayKey()
        const schedKey = route.stops[0]?.[dayKey] ? dayKey : 'weekday'
        const nextIdx = findNextTripIndex(route, schedKey, currentMinutes)
        const firstStop = route.stops[0]
        const nextTime = nextIdx >= 0 ? firstStop?.[schedKey]?.[nextIdx] : null
        const diff = nextTime != null ? timeToMinutes(nextTime) - currentMinutes : null

        return (
          <button
            key={routeId}
            onClick={() => onSelect(route)}
            className={`w-full text-left px-3 py-2.5 rounded-lg mb-0.5 flex items-center gap-2.5 transition-colors ${
              isSelected
                ? 'bg-blue-50 border border-blue-200'
                : 'hover:bg-gray-50 border border-transparent'
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: route.color }}
            />
            <div className="min-w-0 flex-1">
              <div className={`text-sm font-semibold truncate ${isSelected ? 'text-blue-800' : 'text-gray-800'}`}>
                {route.name}
              </div>
              <div className="text-xs text-gray-500 truncate">{route.subtitle}</div>
            </div>
            {diff !== null && diff >= 0 && (
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                  diff <= 5 ? 'bg-red-100 text-red-700' : diff <= 15 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {formatDiff(diff)}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function Timetable({ route, currentMinutes }) {
  const [dayType, setDayType] = useState(todayDayKey)
  const nextColRef = useRef(null)

  const dayTypes = useMemo(() => {
    const types = new Set()
    for (const stop of route.stops) {
      if (stop.weekday?.length) types.add('weekday')
      if (stop.weekend?.length) types.add('weekend')
      if (stop.saturday?.length) types.add('saturday')
      if (stop.sunday?.length) types.add('sunday')
    }
    return [...types]
  }, [route])

  const schedKey = dayTypes.includes(dayType) ? dayType : dayTypes[0]

  const maxCols = useMemo(() => {
    return Math.max(...route.stops.map(s => (s[schedKey] || []).length), 0)
  }, [route, schedKey])

  const colIndices = Array.from({ length: maxCols }, (_, i) => i)

  const headerTimes = useMemo(() => {
    const firstStop = route.stops[0]
    return (firstStop?.[schedKey] || []).map(formatTime)
  }, [route, schedKey])

  const nextColIdx = useMemo(() => {
    return findNextTripIndex(route, schedKey, currentMinutes)
  }, [route, schedKey, currentMinutes])

  useEffect(() => {
    if (nextColRef.current) {
      nextColRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [route.id, schedKey])

  return (
    <div>
      {/* Route header */}
      <div className="rounded-xl p-4 mb-4 text-white" style={{ backgroundColor: route.color }}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{MODE_ICONS[route.mode] || '🚌'}</span>
          <div>
            <div className="font-bold text-xl leading-tight">{route.name}</div>
            <div className="text-sm opacity-80">{route.subtitle}</div>
            <div className="text-xs opacity-70 mt-1">{route.agency} · {route.direction}</div>
          </div>
        </div>
        {route.notes && (
          <div className="mt-3 text-xs bg-black/20 rounded-lg px-3 py-2 leading-relaxed">
            {route.notes}
          </div>
        )}
        {route.operatingDays && (
          <div className="mt-2">
            <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">{route.operatingDays}</span>
          </div>
        )}
      </div>

      {/* Next departure banner */}
      <NextDepartureBanner route={route} schedKey={schedKey} currentMinutes={currentMinutes} />

      {/* Day type toggle */}
      {dayTypes.length > 1 && (
        <div className="flex gap-2 mb-4">
          {dayTypes.map(dt => (
            <button
              key={dt}
              onClick={() => setDayType(dt)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                schedKey === dt ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={schedKey === dt ? { backgroundColor: route.color } : {}}
            >
              {DAY_LABELS[dt] || dt}
            </button>
          ))}
        </div>
      )}

      {/* Timetable */}
      {maxCols === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm">
          No schedule data available for {DAY_LABELS[schedKey] || schedKey}.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="sticky left-0 z-10 bg-gray-50 px-4 py-3 text-left font-semibold text-gray-600 min-w-[180px] border-r border-gray-200">
                  Stop
                </th>
                {headerTimes.map((t, i) => {
                  const isNext = i === nextColIdx
                  const isPast = nextColIdx !== -1 && i < nextColIdx
                  return (
                    <th
                      key={i}
                      ref={isNext ? nextColRef : null}
                      className={`px-3 py-3 text-center font-semibold whitespace-nowrap min-w-[80px] ${
                        isNext ? 'text-white' : isPast ? 'text-gray-300' : 'text-gray-500'
                      }`}
                      style={isNext ? { backgroundColor: route.color } : {}}
                    >
                      {isNext && <div className="text-[10px] font-bold opacity-80 mb-0.5">NEXT</div>}
                      {t}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {route.stops.map((stop, rowIdx) => {
                const times = stop[schedKey] || []
                const rowBg = rowIdx % 2 === 0 ? 'white' : '#fafafa'
                return (
                  <tr key={stop.id} className="border-b border-gray-100">
                    <td
                      className="sticky left-0 z-10 px-4 py-2.5 font-medium text-gray-800 border-r border-gray-200 whitespace-nowrap"
                      style={{ backgroundColor: rowBg }}
                    >
                      {stop.name}
                    </td>
                    {colIndices.map(ci => {
                      const t = times[ci]
                      const isNext = ci === nextColIdx
                      const isPast = nextColIdx !== -1 && ci < nextColIdx
                      return (
                        <td
                          key={ci}
                          className={`px-3 py-2.5 text-center whitespace-nowrap tabular-nums ${
                            isNext ? 'font-bold' : isPast ? 'text-gray-300' : 'text-gray-700'
                          }`}
                          style={isNext
                            ? { backgroundColor: route.color + '18', color: route.color }
                            : { backgroundColor: rowBg }
                          }
                        >
                          {t ? formatTime(t) : <span className="text-gray-200">—</span>}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 flex gap-2.5 items-start">
        <span className="text-amber-500 text-base flex-shrink-0">⚠️</span>
        <p className="text-xs text-amber-800 leading-relaxed">
          <span className="font-semibold">No live updates.</span> These are published scheduled times only —
          real-time delays, cancellations, and service alerts are not reflected here.
          For live departure info, check your agency's app or website directly.
        </p>
      </div>
    </div>
  )
}

export default function Schedules() {
  const [selectedRoute, setSelectedRoute] = useState(schedules[0] || null)
  const [search, setSearch] = useState('')
  const [mobileShowTimetable, setMobileShowTimetable] = useState(false)
  const [currentMinutes, setCurrentMinutes] = useState(() => {
    const d = new Date()
    return d.getHours() * 60 + d.getMinutes()
  })

  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date()
      setCurrentMinutes(d.getHours() * 60 + d.getMinutes())
    }, 30_000)
    return () => clearInterval(id)
  }, [])

  const handleRouteSelect = (route) => {
    setSelectedRoute(route)
    setMobileShowTimetable(true)
  }

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return routeGroups
    const q = search.toLowerCase()
    return routeGroups
      .map(g => ({
        ...g,
        routes: g.routes.filter(routeId => {
          const r = schedules.find(s => s.id === routeId)
          return r && (
            r.name.toLowerCase().includes(q) ||
            r.agency.toLowerCase().includes(q) ||
            r.subtitle.toLowerCase().includes(q)
          )
        }),
      }))
      .filter(g => g.routes.length > 0)
  }, [search])

  return (
    <div className="flex h-full bg-gray-50 relative">
      {/* ── Sidebar ── */}
      <div className={`flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden
        ${mobileShowTimetable ? 'hidden md:flex md:w-72' : 'absolute inset-0 z-10 md:relative md:inset-auto md:z-auto md:w-72'}`}>
        <div className="flex-shrink-0 p-3 bg-[#0d1b2a]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-white font-bold text-sm">Schedules</h2>
            <LiveClock />
          </div>
          <input
            type="text"
            placeholder="Search routes…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-3 py-1.5 text-sm rounded-lg bg-white/10 text-white placeholder-gray-400
              border border-white/20 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {filteredGroups.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-8">No routes found.</p>
          ) : (
            filteredGroups.map(group => (
              <RouteGroupItem
                key={group.id}
                group={group}
                selected={selectedRoute}
                onSelect={handleRouteSelect}
                currentMinutes={currentMinutes}
              />
            ))
          )}
        </div>
        <div className="flex-shrink-0 border-t border-gray-100 px-3 py-2 bg-gray-50">
          <p className="text-xs text-gray-400">{schedules.length} routes · WA State · updates every 30s</p>
        </div>
      </div>

      {/* ── Main panel ── */}
      <div className={`flex-1 overflow-y-auto p-4 md:p-6
        ${!mobileShowTimetable ? 'hidden md:block' : 'block'}`}>
        {/* Mobile back button */}
        <button
          className="md:hidden mb-4 flex items-center gap-1.5 text-sm text-[#005DAA] font-semibold"
          onClick={() => setMobileShowTimetable(false)}
        >
          ← All Routes
        </button>

        {selectedRoute ? (
          <Timetable route={selectedRoute} currentMinutes={currentMinutes} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-5xl mb-3">🗓️</div>
            <p className="text-lg font-medium">Select a route to view its schedule</p>
          </div>
        )}
      </div>
    </div>
  )
}
