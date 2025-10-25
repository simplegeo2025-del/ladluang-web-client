import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/footer'
import Notify from './components/Notify'
import TestMap from './components/test-map'
import Login from './components/Login/Login'
import ForgotPassword from './components/Login/ForgotPassword'
import NewsDetail from './components/News/NewsDetail'
import ReportList from './components/ReportList/ReportList'
import PrivateRoute from './components/common/PrivateRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/notify" element={<Notify />} />
            <Route path="/" element={<Notify />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/test-map" element={<TestMap />} />
            <Route path="/reports" element={<PrivateRoute><ReportList /></PrivateRoute>} />
          </Routes>
          <Footer />
          <div id="toast" className="hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl shadow-lg" />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
