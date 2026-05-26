import { stops, buildGraph } from '../data/network'

const TRANSFER_PENALTY_MINUTES = 8
const MAX_TRANSFERS = 3

class MinHeap {
  constructor(comparator) { this.heap = []; this.cmp = comparator }
  push(item) { this.heap.push(item); this._bubbleUp(this.heap.length - 1) }
  pop() {
    const top = this.heap[0]
    const last = this.heap.pop()
    if (this.heap.length > 0) { this.heap[0] = last; this._sinkDown(0) }
    return top
  }
  get size() { return this.heap.length }
  _bubbleUp(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2)
      if (this.cmp(this.heap[i], this.heap[p]) < 0) { [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]]; i = p } else break
    }
  }
  _sinkDown(i) {
    const n = this.heap.length
    while (true) {
      let s = i; const l = 2*i+1, r = 2*i+2
      if (l < n && this.cmp(this.heap[l], this.heap[s]) < 0) s = l
      if (r < n && this.cmp(this.heap[r], this.heap[s]) < 0) s = r
      if (s === i) break
      ;[this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]]; i = s
    }
  }
}

export function planTrip(originId, destId) {
  if (!stops[originId]) return { error: `Origin stop "${originId}" not found` }
  if (!stops[destId]) return { error: `Destination stop "${destId}" not found` }
  if (originId === destId) return { error: 'Origin and destination are the same stop' }

  const graph = buildGraph()
  const seen = new Set()
  const dedupe = (routes) => routes.filter(r => {
    const sig = r.legs.map(l => `${l.from}-${l.to}-${l.route}`).join('|')
    if (seen.has(sig)) return false
    seen.add(sig); return true
  })

  return {
    origin: stops[originId],
    destination: stops[destId],
    fastest: dedupe(dijkstra(graph, originId, destId, 'time')),
    cheapest: dedupe(dijkstra(graph, originId, destId, 'fare')),
    fewestTransfers: dedupe(dijkstra(graph, originId, destId, 'transfers')),
  }
}

function dijkstra(graph, originId, destId, optimizeFor) {
  const comparator = {
    time:      (a, b) => (a.totalMinutes + a.transfers * 2) - (b.totalMinutes + b.transfers * 2),
    fare:      (a, b) => a.totalFare !== b.totalFare ? a.totalFare - b.totalFare : a.totalMinutes - b.totalMinutes,
    transfers: (a, b) => a.transfers !== b.transfers ? a.transfers - b.transfers : a.totalMinutes - b.totalMinutes,
  }[optimizeFor]

  const pq = new MinHeap(comparator)
  const visited = new Map()
  const solutions = []

  pq.push({ stopId: originId, totalMinutes: 0, totalFare: 0, transfers: 0, legs: [], lastRoute: null, lastAgency: null, visitedStops: new Set([originId]) })

  while (pq.size > 0 && solutions.length < 3) {
    const state = pq.pop()
    if (state.stopId === destId) { solutions.push(formatSolution(state, optimizeFor)); continue }
    if (state.transfers > MAX_TRANSFERS) continue
    const visitKey = `${state.stopId}:${state.transfers}`
    if (visited.has(visitKey) && visited.get(visitKey) <= state.totalMinutes) continue
    visited.set(visitKey, state.totalMinutes)

    for (const edge of (graph[state.stopId] || [])) {
      if (state.visitedStops.has(edge.toStop)) continue
      const isTransfer = state.lastRoute !== null && edge.route !== state.lastRoute && edge.mode !== 'walk'
      const newTransfers = state.transfers + (isTransfer ? 1 : 0)
      const waitMinutes = isTransfer ? TRANSFER_PENALTY_MINUTES : (state.legs.length === 0 ? 5 : 0)
      pq.push({
        stopId: edge.toStop,
        totalMinutes: state.totalMinutes + waitMinutes + edge.minutes,
        totalFare: state.totalFare + (state.legs.length === 0 ? edge.fare : (isTransfer ? edge.fare : 0)),
        transfers: newTransfers,
        legs: [...state.legs, { from: edge.from, to: edge.to, fromName: stops[edge.from]?.name || edge.from, toName: stops[edge.to]?.name || edge.to, route: edge.route, agency: edge.agency, mode: edge.mode, minutes: edge.minutes, fare: edge.fare, waitMinutes }],
        lastRoute: edge.route,
        lastAgency: edge.agency,
        visitedStops: new Set([...state.visitedStops, edge.toStop]),
      })
    }
  }
  return solutions
}

function formatSolution(state, optimizeFor) {
  const legs = state.legs
  const modePrimary = legs.filter(l => l.mode !== 'walk').map(l => l.mode).filter((m, i, a) => a.indexOf(m) === i)
  return {
    legs,
    transfers: state.transfers,
    totalMinutes: state.totalMinutes,
    totalFare: parseFloat(state.totalFare.toFixed(2)),
    optimizedFor: optimizeFor,
    summary: buildSummary(legs),
    modes: modePrimary,
    agencies: [...new Set(legs.filter(l => l.agency).map(l => l.agency))],
  }
}

function buildSummary(legs) {
  if (legs.length === 0) return 'No route found'
  const parts = []; let cur = null
  for (const leg of legs) {
    if (leg.route !== cur) { parts.push(`${leg.route} (${modeLabel(leg.mode)})`); cur = leg.route }
  }
  return parts.join(' → ')
}

function modeLabel(mode) {
  return { 'light-rail': 'Light Rail', 'commuter-rail': 'Commuter Rail', 'intercity-rail': 'Train', 'bus': 'Bus', 'brt': 'Rapid Bus', 'ferry': 'Ferry', 'walk': 'Walk' }[mode] || mode
}

export function searchStops(query) {
  if (!query || query.trim().length < 2) return []
  const q = query.toLowerCase().trim()
  const results = Object.values(stops).filter(s =>
    s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q) || (s.description && s.description.toLowerCase().includes(q))
  )
  results.sort((a, b) => {
    const aFirst = a.name.toLowerCase().startsWith(q) ? 0 : 1
    const bFirst = b.name.toLowerCase().startsWith(q) ? 0 : 1
    return aFirst - bFirst || a.name.localeCompare(b.name)
  })
  return results.slice(0, 10)
}

export function getAllStops() {
  return Object.values(stops)
}
