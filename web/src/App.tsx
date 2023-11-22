import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { createContext } from 'react';
import { Context } from './Model'
import HomePage from './pages/HomePage'
import Feed from './pages/Feed'
import SleepStart from './pages/SleepStart'
import Time from './pages/Time'
import Ack from './pages/Ack'
import Dashboard from './pages/Dashboard'
import Diaper from './pages/Diaper';
import NavBar from './components/NavBar'
import Pump from './pages/Pump'

const emptyContext: Context = {
  type: '',
  subtype: '',
  unit: '',
  vol: 0,
  time: ''
}

export const CurrentContext = createContext(emptyContext);

function App() {
  return (
    <div className="container text-center babyrecord-container">
      <NavBar />
      <CurrentContext.Provider value={emptyContext}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/diaper" element={<Diaper />} />
            <Route path="/sleep" element={<SleepStart />} />
            <Route path="/time" element={<Time />} />
            <Route path="/ack" element={<Ack />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pump" element={<Pump />} />
          </Routes>
        </HashRouter>
      </CurrentContext.Provider>
    </div>
  )
}

export default App
