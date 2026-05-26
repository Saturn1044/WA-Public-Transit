import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Map' },
  { to: '/plan', label: 'Plan a Trip' },
  { to: '/schedules', label: 'Schedules' },
  { to: '/agencies', label: 'Agencies & Fares' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="bg-[#0d1b2a] text-white shadow-lg z-10 flex-shrink-0">
      <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="text-2xl">🚌</span>
          <span>
            <span className="text-[#4dabf7]">WA</span>{' '}
            <span className="text-white">Transit</span>
          </span>
        </Link>

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
    </nav>
  )
}
