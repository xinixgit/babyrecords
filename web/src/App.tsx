import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createContext } from 'react';
import PageHome from './pages/PageHome'
import PageFeed from './pages/PageFeed'
import PageTime from './pages/PageTime'
import PageAck from './pages/PageAck'

const emptyContext = {
  type: '',
  feedType: '',
  vol: 0,
  time: ''
}

export const CurrentContext = createContext(emptyContext);

function App() {
  return (
    <div className="container text-center">
      <CurrentContext.Provider value={emptyContext}>
        <BrowserRouter>
          <Routes>
            <Route index element={<PageHome />} />
            <Route path="/feed" element={<PageFeed />} />
            <Route path="/time" element={<PageTime />} />
            <Route path="/ack" element={<PageAck />} />
          </Routes>
        </BrowserRouter>
      </CurrentContext.Provider>
    </div>
  )
}

export default App
