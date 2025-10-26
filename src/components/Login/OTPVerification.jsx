import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Icon } from '@iconify/react'
import { registerRequestOtpService, registerVerifyOtpService } from '../../services/auth.service'
import { setToken } from '../../utils/localStorage'
import useUserStore from '../../store/user.store'

const OTPVerification = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const phoneNumber = location.state?.phoneNumber || ''
  const userId = location.state?.userId || ''
  const maskedPhone = phoneNumber ? `0${phoneNumber.slice(1, 3)}-XXX-${phoneNumber.slice(-4)}` : ''
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [countdown, setCountdown] = useState(60)
  const [refCode, setRefCode] = useState('')
  const [tempOtp, setTempOtp] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useUserStore()


  const requestOtpMutation = useMutation({
    mutationFn: (data) => registerRequestOtpService(data),
    onSuccess: (response) => {
      setRefCode(response.data.refCode)
      setTempOtp(response.data.otpCode)
      setError('')
      startCountdown()
    },
    onError: (error) => {
      setOtp(['', '', '', '', '', ''])
      setError(error.response?.data?.message || 'ไม่สามารถส่งรหัส OTP ได้')
    }
  })

  const verifyOtpMutation = useMutation({
    mutationFn: (data) => registerVerifyOtpService(data),
    onSuccess: (data) => {
      setToken(data.accessToken);
      setUser(data.user);
      navigate('../', { replace: true })
    },
    onError: (error) => {
      console.log("🚀 ~ OTPVerification ~ error:", error)
      setOtp(['', '', '', '', '', ''])
      setError(error.response?.data?.message || 'รหัส OTP ไม่ถูกต้อง')
      const firstInput = document.querySelector('input[name=otp-0]')
      firstInput?.focus()
    }
  })

  useEffect(() => {
    if (!phoneNumber || !userId) {
      navigate('/login')
      return
    }

    requestOtpMutation.mutate({ phone: phoneNumber, userId })
    
    const firstInput = document.querySelector('input[name=otp-0]')
    firstInput?.focus()
  }, [])

  const startCountdown = () => {
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '')
    if (!value) return
    
    setError('')
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`)
      nextInput?.focus()
    }

    if (newOtp.every(digit => digit !== '')) {
      handleVerifyOTP(newOtp)
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`)
      prevInput?.focus()
    } else if (e.key === 'Backspace' && otp[index]) {
      const newOtp = [...otp]
      newOtp[index] = ''
      setOtp(newOtp)
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6)
    const newOtp = [...otp]
    
    pastedData.split('').forEach((value, index) => {
      if (index < 6) {
        newOtp[index] = value
      }
    })
    
    setOtp(newOtp)
    
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerifyOTP(newOtp)
    }
  }

  const handleResendOTP = () => {
    if (countdown === 0) {
      requestOtpMutation.mutate({ phone: phoneNumber, userId })
    }
  }

  const handleVerifyOTP = (currentOtp = otp) => {
    const otpCode = (Array.isArray(currentOtp) ? currentOtp.join('') : String(currentOtp))
    if (otpCode.length === 6 && !verifyOtpMutation.isPending) {
      verifyOtpMutation.mutate({
        userId,
        phone: phoneNumber,
        otpCode,
        refCode
      })
    }
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ยืนยันหมายเลขโทรศัพท์</h2>
            <p className="text-gray-600">กรุณากรอกรหัส OTP ที่เราส่งไปยังหมายเลข</p>
            <p className="text-gray-900 font-medium mt-1">{maskedPhone}</p>
            <div className="mt-2">
              <span className="text-sm text-gray-500">รหัสอ้างอิง: </span>
              <span className="font-medium text-gray-900">{refCode}</span>
              <br />
              <span className="text-sm text-gray-500">รหัส OTP: </span>
              <span className="font-medium text-gray-900">{tempOtp}</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative text-sm mb-6" role="alert">
              <div className="flex">
                <Icon icon="mdi:alert-circle" className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            </div>
          )}

          <div className="flex justify-center gap-2 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                name={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                pattern="[0-9]*"
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-12 border-2 rounded-lg text-center text-xl font-semibold text-gray-700 focus:border-primary-500 focus:ring-primary-500"
              />
            ))}
          </div>

          <div className="space-y-4">
            <button
              onClick={handleVerifyOTP}
              disabled={verifyOtpMutation.isPending}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {verifyOtpMutation.isPending ? (
                <div className="flex items-center">
                  <Icon icon="mdi:loading" className="animate-spin h-5 w-5 mr-2" />
                  กำลังตรวจสอบ...
                </div>
              ) : (
                "ยืนยันรหัส OTP"
              )}
            </button>

            <div className="text-center">
              <button
                onClick={handleResendOTP}
                disabled={countdown > 0 || requestOtpMutation.isPending}
                className="text-primary-600 hover:text-primary-500 text-sm font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {requestOtpMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <Icon icon="mdi:loading" className="animate-spin h-4 w-4 mr-1" />
                    กำลังส่งรหัส...
                  </div>
                ) : countdown > 0 ? (
                  `ส่งรหัสใหม่อีกครั้ง (${countdown}s)`
                ) : (
                  "ส่งรหัสใหม่อีกครั้ง"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTPVerification