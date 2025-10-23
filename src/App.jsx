import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 lg:p-6">
          <h2 className="text-lg font-semibold mb-4">คิวงานที่ได้รับมอบหมาย</h2>
          <div id="taskList" className="space-y-3 max-h-[700px] overflow-auto pr-1" />
        </section>
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 lg:p-6">
          <h2 className="text-lg font-semibold mb-4">รายละเอียดงาน</h2>
          <div id="detail" className="text-sm text-gray-600">เลือกงานจากรายการเพื่อดูรายละเอียด</div>
        </section>
      </main>
      <Footer />
      <div id="toast" className="hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl shadow-lg" />
    </div>

  )
}

export default App
