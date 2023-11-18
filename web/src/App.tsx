import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createContext } from 'react';
import HomePage from './pages/HomePage'
import Feed from './pages/Feed'
import SleepStart from './pages/SleepStart'
import Time from './pages/Time'
import Ack from './pages/Ack'
import Dashboard from './pages/Dashboard'
import { Context } from './Model'
import Diaper from './pages/Diaper';
import NavBar from './components/NavBar'

const emptyContext: Context = {
  type: '',
  feedType: '',
  feedUnit: '',
  feedVol: 0,
  diaperSize: '',
  time: ''
}

export const CurrentContext = createContext(emptyContext);

function App() {
  return (
    <div className="container text-center babyrecord-container">
      <NavBar />
      <CurrentContext.Provider value={emptyContext}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/diaper" element={<Diaper />} />
            <Route path="/sleep" element={<SleepStart />} />
            <Route path="/time" element={<Time />} />
            <Route path="/ack" element={<Ack />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </CurrentContext.Provider>
    </div>
  )
}

export default App
