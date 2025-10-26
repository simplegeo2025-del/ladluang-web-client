import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  forgotPasswordEmailService,
  forgotPasswordMobileService,
  verifyOtpForResetService,
} from "../../services/auth.service";
import { IS_DEV_MODE } from "../../constants/config";

const ForgotPassword = () => {
  const [recoveryType, setRecoveryType] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(300);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (showOtpInput && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showOtpInput, countdown]);

  useEffect(() => {
    let resendTimer;
    if (showOtpInput && resendCountdown > 0) {
      resendTimer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(resendTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(resendTimer);
  }, [showOtpInput, resendCountdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      let response;
      if (recoveryType === "email") {
        response = await forgotPasswordEmailService(inputValue);
        setSuccess(true);
        setResponseData(response);
      } else {
        response = await forgotPasswordMobileService(inputValue);
        setResponseData(response);
        setShowOtpInput(true);
        setCountdown(300);
        setResendCountdown(60);
        setTimeout(() => {
          const firstInput = document.querySelector("input[name=otp-0]");
          firstInput?.focus();
        }, 100);
      }

      if (IS_DEV_MODE) {
        console.log("Development Response:", response);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");
    if (!value) return;

    setError("");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      nextInput?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      handleVerifyOtp(newOtp);
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
      prevInput?.focus();
    } else if (e.key === "Backspace" && otp[index]) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);
    const newOtp = [...otp];

    pastedData.split("").forEach((value, index) => {
      if (index < 6) {
        newOtp[index] = value;
      }
    });

    setOtp(newOtp);

    if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 6) {
      handleVerifyOtp(newOtp);
    }
  };

  const handleVerifyOtp = async (currentOtp = otp) => {
    const otpCode = Array.isArray(currentOtp)
      ? currentOtp.join("")
      : String(currentOtp);
    if (otpCode.length !== 6 || verifyingOtp) return;

    setVerifyingOtp(true);
    setError("");

    try {
      const response = await verifyOtpForResetService({
        phone: inputValue,
        refCode: responseData?.data?.refCode,
        otpCode,
      });

      if (IS_DEV_MODE) {
        console.log("OTP Verification Response:", response);
      }

      navigate(`/reset-password?token=${response.resetToken}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง"
      );
      setOtp(["", "", "", "", "", ""]);
      const firstInput = document.querySelector("input[name=otp-0]");
      firstInput?.focus();
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0) return;

    setLoading(true);
    setError("");

    try {
      const response = await forgotPasswordMobileService(inputValue);
      setResponseData(response);
      setCountdown(300);
      setResendCountdown(60);
      setOtp(["", "", "", "", "", ""]);

      if (IS_DEV_MODE) {
        console.log("Resend OTP Response:", response);
      }
    } catch (err) {
      setError(err.response?.data?.message || "ไม่สามารถส่งรหัส OTP ได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          ลืมรหัสผ่าน
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          เลือกวิธีการรับลิงก์สำหรับตั้งรหัสผ่านใหม่
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!showOtpInput ? (
            <>
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setRecoveryType("email")}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    recoveryType === "email"
                      ? "border-primary-600 text-primary-600 bg-primary-50"
                      : "bg-white text-gray-700 border-gray-300 hover:border-primary-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  อีเมล
                </button>
                <button
                  onClick={() => setRecoveryType("phone")}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    recoveryType === "phone"
                      ? "border-primary-600 text-primary-600 bg-primary-50"
                      : "bg-white text-gray-700 border-gray-300 hover:border-primary-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  เบอร์โทร
                </button>
              </div>

              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="text-sm text-blue-800">
                    {recoveryType === "email" ? (
                      <>
                        <p className="font-semibold mb-1">การรีเซ็ตผ่านอีเมล</p>
                        <p className="text-blue-700">
                          เราจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ไปยังอีเมลของคุณ
                          ลิงก์จะมีอายุการใช้งาน 24 ชั่วโมง
                          กรุณาตรวจสอบกล่องจดหมายขยะหากไม่พบอีเมล
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold mb-1">การรีเซ็ตผ่าน SMS</p>
                        <p className="text-blue-700">
                          เราจะส่งรหัส OTP 6 หลักไปยังหมายเลขโทรศัพท์ของคุณ
                          รหัสจะมีอายุการใช้งาน 5 นาที
                          กรุณาใช้รหัสนี้เพื่อยืนยันตัวตนและตั้งรหัสผ่านใหม่
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="recovery-input"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {recoveryType === "email"
                      ? "อีเมลที่ลงทะเบียนไว้"
                      : "เบอร์โทรศัพท์ที่ลงทะเบียนไว้"}
                  </label>
                  <div className="mt-1">
                    <input
                      id="recovery-input"
                      name={recoveryType === "email" ? "email" : "phone"}
                      type={recoveryType === "email" ? "email" : "tel"}
                      autoComplete={recoveryType === "email" ? "email" : "tel"}
                      required
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder={
                        recoveryType === "email"
                          ? "your@email.com"
                          : "0812345678"
                      }
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-600 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                )}

                {success && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="text-sm text-green-800">
                        <p className="font-semibold">
                          {recoveryType === "email"
                            ? "ส่งลิงก์รีเซ็ตรหัสผ่านสำเร็จ"
                            : "ส่งรหัส OTP สำเร็จ"}
                        </p>
                        <p className="mt-1">
                          {recoveryType === "email"
                            ? "กรุณาตรวจสอบอีเมลของคุณเพื่อรับลิงก์รีเซ็ตรหัสผ่าน"
                            : `รหัส OTP ถูกส่งไปยังหมายเลข ${inputValue} แล้ว`}
                        </p>
                        {IS_DEV_MODE &&
                          responseData && (
                            <div className="mt-2 p-2 bg-green-100 rounded">
                              <p className="font-mono text-xs">
                                {recoveryType === "email"
                                  ? `Reset Link: ${responseData.resetLink}`
                                  : `Ref Code: ${responseData.data?.refCode} | OTP: ${responseData.data?.otpCode}`}
                              </p>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "กำลังส่ง..."
                      : recoveryType === "email"
                      ? "ส่งลิงก์รีเซ็ตรหัสผ่าน"
                      : "ส่งรหัส OTP"}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">หรือ</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => navigate("/login")}
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    กลับไปหน้าเข้าสู่ระบบ
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  ยืนยันรหัส OTP
                </h2>
                <p className="text-gray-600 text-sm">
                  กรุณากรอกรหัส OTP ที่เราส่งไปยังหมายเลข
                </p>
                <p className="text-gray-900 font-medium mt-1">{inputValue}</p>

                {responseData?.data?.refCode && (
                  <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-gray-100">
                    <span className="text-xs text-gray-600">รหัสอ้างอิง:</span>
                    <span className="ml-2 text-sm font-semibold text-gray-900">
                      {responseData.data.refCode}
                    </span>
                  </div>
                )}

                {IS_DEV_MODE &&
                  responseData?.data?.otpCode && (
                    <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100">
                      <span className="text-xs text-green-700">OTP (Dev):</span>
                      <span className="ml-2 text-sm font-semibold text-green-900">
                        {responseData.data.otpCode}
                      </span>
                    </div>
                  )}
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-shake">
                  <div className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-600 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    name={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    pattern="[0-9]*"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    onPaste={handleOtpPaste}
                    disabled={verifyingOtp}
                    className="w-12 h-14 border-2 rounded-lg text-center text-xl font-semibold text-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                ))}
              </div>

              {/* <div className="mb-6 flex items-center justify-center gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${countdown > 60 ? 'text-green-600' : countdown > 0 ? 'text-orange-600' : 'text-red-600'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className={`font-medium ${countdown > 60 ? 'text-green-600' : countdown > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                  {countdown > 0 ? `รหัสจะหมดอายุใน ${formatTime(countdown)}` : 'รหัสหมดอายุแล้ว'}
                </span>
              </div> */}

              <div className="space-y-3">
                <button
                  onClick={() => handleVerifyOtp()}
                  disabled={verifyingOtp || otp.some((digit) => digit === "")}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {verifyingOtp ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      กำลังตรวจสอบ...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      ยืนยันรหัส OTP
                    </>
                  )}
                </button>

                <button
                  onClick={handleResendOtp}
                  disabled={resendCountdown > 0 || loading}
                  className="w-full py-2 px-4 text-sm font-medium text-primary-600 hover:text-primary-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      กำลังส่งรหัส...
                    </span>
                  ) : resendCountdown > 0 ? (
                    `ส่งรหัสใหม่อีกครั้ง (${formatTime(resendCountdown)})`
                  ) : (
                    "ส่งรหัสใหม่อีกครั้ง"
                  )}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">หรือ</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowOtpInput(false);
                    setOtp(["", "", "", "", "", ""]);
                    setError("");
                    setCountdown(300);
                    setResendCountdown(60);
                  }}
                  className="w-full py-2 px-4 text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors"
                >
                  เปลี่ยนหมายเลขโทรศัพท์
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
