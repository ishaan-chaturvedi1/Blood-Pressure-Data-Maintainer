import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Reports from "./components/Reports"
import { Routes, Route, BrowserRouter } from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Reports" element={<Reports/>} />
      </Routes>
    </>
  </BrowserRouter>    
  )
}

export default App
