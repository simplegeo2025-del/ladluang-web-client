import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/footer'
import TestMap from './components/test-map'
import PrivateRoute from './components/common/PrivateRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NotifyPage from './pages/NotifyPage'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import NewsDetailPage from './pages/NewsDetailPage'
import ReportListPage from './pages/ReportListPage'
import UserProfilePage from './pages/UserProfilePage'
import AuthGoogleCallback from './pages/AuthGoogleCallback'
import PublicRoute from './components/common/PublicRoute'
import EmailVerificationPage from './pages/EmailVerificationPage'
import OTPVerificationPage from './pages/OTPVerificationPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/notify" element={<NotifyPage />} />
            <Route path="/" element={<NotifyPage />} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
            <Route path="/verify-otp" element={<OTPVerificationPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/test-map" element={<TestMap />} />
            <Route path="/reports" element={<PrivateRoute><ReportListPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
            <Route path="/auth/citizens/google/callback" element={<AuthGoogleCallback />} />
          </Routes>
          <Footer />
          <div id="toast" className="hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl shadow-lg" />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
