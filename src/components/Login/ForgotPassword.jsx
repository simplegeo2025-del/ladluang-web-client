import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [recoveryType, setRecoveryType] = useState("email");
  const navigate = useNavigate();

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

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder={
                    recoveryType === "email"
                      ? "your@email.com"
                      : "0812345678"
                  }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300"
              >
                {recoveryType === "email" ? "ส่งลิงก์รีเซ็ตรหัสผ่าน" : "ส่งรหัส OTP"}
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
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
