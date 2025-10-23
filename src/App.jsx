import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/footer'
import Notify from './components/Notify'
import TestMap from './components/test-map'
import Login from './components/Login/Login'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/notify" element={<Notify />} />
          <Route path="/" element={<Notify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test-map" element={<TestMap />} />
        </Routes>
        <Footer />
        <div id="toast" className="hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl shadow-lg" />
      </div>
    </BrowserRouter>
  )
}

export default App
