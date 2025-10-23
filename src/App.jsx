import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/footer'
import Notify from './components/Notify'
import TestMap from './components/test-map'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/notify" element={<Notify />} />
          <Route path="/" element={
            <main className="max-w-7xl mx-auto px-4 py-6 space-y-6 h-[10000px]">
              <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 lg:p-6">
                <h2 className="text-lg font-semibold mb-4">คิวงานที่ได้รับมอบหมาย</h2>
                <div id="taskList" className="space-y-3 max-h-[700px] overflow-auto pr-1" />
              </section>
              <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 lg:p-6">
                <h2 className="text-lg font-semibold mb-4">รายละเอียดงาน</h2>
                <div id="detail" className="text-sm text-gray-600">เลือกงานจากรายการเพื่อดูรายละเอียด</div>
              </section>
            </main>
          } />
          <Route path="/test-map" element={<TestMap />} />
        </Routes>
        <Footer />
        <div id="toast" className="hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl shadow-lg" />
      </div>
    </BrowserRouter>
  )
}

export default App
