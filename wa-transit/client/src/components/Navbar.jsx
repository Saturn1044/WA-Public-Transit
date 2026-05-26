import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function PacificClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      const abbr = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        timeZoneName: 'short',
      }).split(' ').pop()
      setTime(`${formatted} ${abbr}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="text-gray-300 text-xs font-mono tabular-nums">{time}</span>
  )
}

const navLinks = [
  { to: '/', label: 'Map' },
  { to: '/plan', label: 'Plan a Trip' },
  { to: '/schedules', label: 'Schedules' },
  { to: '/agencies', label: 'Agencies & Fares' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-[#0d1b2a] text-white shadow-lg z-20 flex-shrink-0">
      <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="text-2xl">🚌</span>
          <span>
            <span className="text-[#4dabf7]">WA</span>{' '}
            <span className="text-white">Transit</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          <PacificClock />
          <div className="flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname === link.to
                  ? 'bg-[#005DAA] text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
          </div>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex flex-col gap-1 p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-white" />
          <span className="block w-5 h-0.5 bg-white" />
          <span className="block w-5 h-0.5 bg-white" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 px-3 pb-3 pt-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors mb-0.5 ${
                pathname === link.to
                  ? 'bg-[#005DAA] text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
