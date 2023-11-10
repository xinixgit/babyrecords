import './App.css'
import PageHome from './pages/PageHome'
import PageFeed from './pages/PageFeed'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  let p1BtnClicked = ''

  const handleHomeBtnClick = (btnName: string) => {
    p1BtnClicked = btnName;
    console.log(p1BtnClicked + " clicked")
  }

  return (
    <div className="container text-center">
      <BrowserRouter>
        <Routes>
          <Route index element={<PageHome onClick={handleHomeBtnClick} />} />
          <Route path="/feed" element={<PageFeed />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
