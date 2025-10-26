import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import { verifyEmailService } from "../../services/auth.service";

const EmailVerificationSent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const location = useLocation();
  const verificationLink = location.state?.verificationLink || "";

  const code = searchParams.get("code");

  const verifyEmailMutation = useMutation({
    mutationFn: (code) => verifyEmailService(code),
    onSuccess: (data) => {
      setVerificationStatus("success");
    },
    onError: (error) => {
      console.log("🚀 ~ EmailVerificationSent ~ error:", error);
      setVerificationStatus("error");
    },
  });

  useEffect(() => {
    if (code) {
      verifyEmailMutation.mutate(code);
    }
  }, [code]);

  if (code && verificationStatus === "pending") {
    return (
      <div className="min-h-[calc(100vh-12rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 px-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="flex justify-center mb-6">
              <Icon
                icon="mdi:loading"
                className="animate-spin h-20 w-20 text-primary-600"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              กำลังยืนยันอีเมล...
            </h2>
            <p className="text-gray-600">กรุณารอสักครู่</p>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === "success") {
    return (
      <div className="min-h-[calc(100vh-12rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 px-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                <Icon
                  icon="mdi:check-circle"
                  className="h-12 w-12 text-green-600"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ยืนยันอีเมลสำเร็จ!
            </h2>
            <p className="text-gray-600 mb-6">
              บัญชีของคุณได้รับการยืนยันเรียบร้อยแล้ว
              คุณสามารถเข้าสู่ระบบได้ทันที
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              ไปหน้าเข้าสู่ระบบ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === "error") {
    return (
      <div className="min-h-[calc(100vh-12rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 px-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                <Icon
                  icon="mdi:close-circle"
                  className="h-12 w-12 text-red-600"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ยืนยันอีเมลไม่สำเร็จ
            </h2>
            <p className="text-gray-600 mb-6">
              ลิงก์ยืนยันอีเมลไม่ถูกต้องหรือหมดอายุแล้ว กรุณาลองใหม่อีกครั้ง
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              กลับไปหน้าเข้าสู่ระบบ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-primary-600"
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
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ยืนยันอีเมลของคุณ
          </h2>
          <p className="text-gray-600 mb-6">
            เราได้ส่งลิงก์ยืนยันไปที่อีเมลของคุณแล้ว
            กรุณาตรวจสอบอีเมลและคลิกที่ลิงก์เพื่อยืนยันบัญชีของคุณ
          </p>
          <a className="text-[10px]" href={verificationLink} target="_blank" rel="noopener noreferrer">
            {verificationLink}
          </a>

          <div className="space-y-4 pt-2">
            <button
              onClick={() => navigate("/login")}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              กลับไปหน้าเข้าสู่ระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationSent;
