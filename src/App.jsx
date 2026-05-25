import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Catalog from "./pages/Catalog/Catalog"
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
