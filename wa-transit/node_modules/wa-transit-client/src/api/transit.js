import { planTrip as _planTrip, searchStops as _searchStops, getAllStops as _getAllStops } from '../services/routing'
import { agencies } from '../data/agencies'

export const getAgencies = () => Promise.resolve(agencies)

export const getAgency = (id) => Promise.resolve(agencies.find(a => a.id === id) || null)

export const searchStops = (q) => Promise.resolve(_searchStops(q))

export const getAllStops = () => Promise.resolve(_getAllStops())

export const planTrip = (origin, destination) => {
  const result = _planTrip(origin, destination)
  if (result.error) return Promise.reject({ response: { data: { error: result.error } } })
  return Promise.resolve(result)
}

export const getArrivals = () => Promise.resolve([])
