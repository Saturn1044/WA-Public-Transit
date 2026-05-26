import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import RoutePlanner from './pages/RoutePlanner'
import Agencies from './pages/Agencies'
import Schedules from './pages/Schedules'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<RoutePlanner />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/agencies" element={<Agencies />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
