import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Reports from "./components/Reports"
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import NotFound from './NotFound'


function App() {

  return (
    <BrowserRouter>
    <div className='min-h-dvh flex flex-col'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Reports" element={<Reports/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </div>
  </BrowserRouter>    
  )
}

export default App
