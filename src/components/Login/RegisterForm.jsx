import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../common/PasswordInput";
import { registerEmailService, registerMobileService } from "../../services/auth.service";

export const RegisterForm = () => {
    const [registerType, setRegisterType] = useState("email");
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const password = watch("password");
    const phoneNumber = watch("phone");
    const isRegisterTypeEmail = registerType === "email";

    const registerMutation = useMutation({
        mutationFn: (data) =>
          isRegisterTypeEmail
                ? registerEmailService(data)
                : registerMobileService(data),
        onSuccess: (data) => {
          console.log("🚀 ~ RegisterForm ~ data:", data)
          if (isRegisterTypeEmail) {
            navigate("/verify-email");
          } else {
            const userId = data.user.id
            navigate("/verify-otp", { state: { phoneNumber: phoneNumber, userId: userId } });
          }
        },
    });

    const onRegisterSubmit = (data) => {
        if (data.password !== data["password-confirm"]) {
            return;
        }
        registerMutation.mutate(data)
    };

    return (
      <div>
        <div>
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setRegisterType("email")}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                registerType === "email"
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
              onClick={() => setRegisterType("phone")}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                registerType === "phone"
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
  
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onRegisterSubmit)}
            noValidate
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  ชื่อ
                </label>
                <div className="mt-1">
                  <Controller
                    name="firstname"
                    control={control}
                    rules={{ required: "กรุณากรอกชื่อ" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="สมชาย"
                      />
                    )}
                  />
                  {errors.firstname && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <Icon icon="mdi:alert-circle" className="h-4 w-4" />
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  นามสกุล
                </label>
                <div className="mt-1">
                  <Controller
                    name="lastname"
                    control={control}
                    rules={{ required: "กรุณากรอกนามสกุล" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="ใจดี"
                      />
                    )}
                  />
                  {errors.lastname && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <Icon icon="mdi:alert-circle" className="h-4 w-4" />
                      {errors.lastname.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
  
            <div>
              <label
                htmlFor="register-input"
                className="block text-sm font-medium text-gray-700"
              >
                {registerType === "email" ? "อีเมล" : "เบอร์โทรศัพท์"}
              </label>
              <div className="mt-1">
                <Controller
                  name={registerType === "email" ? "email" : "phone"}
                  control={control}
                  rules={{
                    required: registerType === "email" ? "กรุณากรอกอีเมล" : "กรุณากรอกเบอร์โทรศัพท์",
                    pattern: {
                      value: registerType === "email" 
                        ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        : /^[0-9]{10}$/,
                      message: registerType === "email"
                        ? "รูปแบบอีเมลไม่ถูกต้อง"
                        : "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอกเป็นตัวเลข 10 หลัก",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type={registerType === "email" ? "email" : "tel"}
                      autoComplete={registerType === "email" ? "email" : "tel"}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder={registerType === "email" ? "your@email.com" : "0812345678"}
                    />
                  )}
                />
                {errors[registerType === "email" ? "email" : "phone"] && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <Icon icon="mdi:alert-circle" className="h-4 w-4" />
                    {errors[registerType === "email" ? "email" : "phone"].message}
                  </p>
                )}
              </div>
            </div>
  
            <div>
              <label
                htmlFor="reg-password"
                className="block text-sm font-medium text-gray-700"
              >
                รหัสผ่าน
              </label>
              <div className="mt-1 relative">
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "กรุณากรอกรหัสผ่าน",
                    minLength: {
                      value: 6,
                      message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
                    },
                  }}
                  render={({ field }) => (
                    <PasswordInput
                      {...field}
                      id="reg-password"
                      autoComplete="new-password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  )}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <Icon icon="mdi:alert-circle" className="h-4 w-4" />
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
  
            <div>
              <label
                htmlFor="password-confirm"
                className="block text-sm font-medium text-gray-700"
              >
                ยืนยันรหัสผ่าน
              </label>
              <div className="mt-1 relative">
                <Controller
                  name="password-confirm"
                  control={control}
                  rules={{
                    required: "กรุณายืนยันรหัสผ่าน",
                    validate: (value) =>
                      value === password || "รหัสผ่านไม่ตรงกัน",
                  }}
                  render={({ field }) => (
                    <PasswordInput
                      {...field}
                      id="password-confirm"
                      autoComplete="new-password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  )}
                />
                {errors["password-confirm"] && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <Icon icon="mdi:alert-circle" className="h-4 w-4" />
                    {errors["password-confirm"].message}
                  </p>
                )}
              </div>
            </div>
  
            <div className="flex items-start">
              <Controller
                name="terms"
                control={control}
                rules={{ required: "กรุณายอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                  />
                )}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                ฉันยอมรับ{" "}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  เงื่อนไขการใช้งาน
                </a>{" "}
                และ{" "}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  นโยบายความเป็นส่วนตัว
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <Icon icon="mdi:alert-circle" className="h-4 w-4" />
                {errors.terms.message}
              </p>
            )}
  
            <div>
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {registerMutation.isPending ? (
                  <div className="flex items-center">
                    <Icon icon="mdi:loading" className="animate-spin h-5 w-5 mr-2" />
                    กำลังสร้างบัญชี...
                  </div>
                ) : (
                  "สร้างบัญชี"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };