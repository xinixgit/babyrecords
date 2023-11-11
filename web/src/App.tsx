import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createContext } from 'react';
import PageHome from './pages/PageHome'
import PageFeed from './pages/PageFeed'
import PageTime from './pages/PageTime'

const contextObj = () => {
  return {
    recType: '',
    feedType: '',
    feedVol: 0,
    feedTime: ''
  };
}

export const CurrentContext = createContext(contextObj());

function App() {
  return (
    <div className="container text-center">
      <CurrentContext.Provider value={contextObj()}>
        <BrowserRouter>
          <Routes>
            <Route index element={<PageHome />} />
            <Route path="/feed" element={<PageFeed />} />
            <Route path="/time" element={<PageTime />} />
          </Routes>
        </BrowserRouter>
      </CurrentContext.Provider>
    </div>
  )
}

export default App
