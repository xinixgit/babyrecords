import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Feed from './pages/Feed'
import SleepStart from './pages/SleepStart'
import Time from './pages/Time'
import Ack from './pages/Ack'
import Dashboard from './pages/Dashboard'
import Diaper from './pages/Diaper';
import Pump from './pages/Pump'
import FeedPumpSummary from './pages/FeedPumpSummary'
import SignIn from './pages/SignIn'

const RouteComponents = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/diaper" element={<Diaper />} />
        <Route path="/sleep" element={<SleepStart />} />
        <Route path="/time" element={<Time />} />
        <Route path="/ack" element={<Ack />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pump" element={<Pump />} />
        <Route path="/feedpumpsummary" element={<FeedPumpSummary />} />
      </Routes>
    </HashRouter>
  )
}

export default RouteComponents