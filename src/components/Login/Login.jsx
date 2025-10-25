import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Icon } from "@iconify/react";
import PasswordInput from "../common/PasswordInput";
import { loginService } from "../../services/auth/login";
import { setToken } from "../../utils/localStorage";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [registerType, setRegisterType] = useState("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await loginService(data.email, data.password);
      const { accessToken } = response;
      setToken(accessToken);
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          ระบบแจ้งปัญหาเทศบาล
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          เข้าสู่ระบบเพื่อแจ้งปัญหาในพื้นที่ของคุณ
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 px-1 text-center font-medium ${
                activeTab === "login"
                  ? "text-primary-600 border-b-2 border-primary-500"
                  : "text-gray-500"
              }`}
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 px-1 text-center font-medium ${
                activeTab === "register"
                  ? "text-primary-600 border-b-2 border-primary-500"
                  : "text-gray-500"
              }`}
            >
              ลงทะเบียน
            </button>
          </div>

          {activeTab === "login" ? (
            <div>
              {error && (
                <div
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative text-sm"
                  role="alert"
                >
                  <div className="flex">
                    <Icon icon="mdi:alert-circle" className="h-5 w-5 mr-2" />
                    <span>{error}</span>
                  </div>
                </div>
              )}
              <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    อีเมล
                  </label>
                  <div className="mt-1 relative">
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "กรุณากรอกอีเมล",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "รูปแบบอีเมลไม่ถูกต้อง",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="email"
                          autoComplete="email"
                          className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                            errors.email ? "border-red-300" : "border-gray-300"
                          }`}
                        />
                      )}
                    />
                    {errors.email && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Icon
                          icon="mdi:alert-circle"
                          className="h-5 w-5 text-red-500"
                        />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <Icon icon="mdi:alert-circle" className="h-4 w-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    รหัสผ่าน
                  </label>
                  <div className="mt-1">
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
                          id="password"
                          autoComplete="current-password"
                          className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                            errors.password ? "border-red-300" : "border-gray-300"
                          }`}
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      จดจำฉัน
                    </label>
                  </div>

                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="font-medium text-primary-600 hover:text-primary-500"
                    >
                      ลืมรหัสผ่าน?
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <Icon
                          icon="mdi:loading"
                          className="animate-spin h-5 w-5 mr-2"
                        />
                        กำลังเข้าสู่ระบบ...
                      </div>
                    ) : (
                      "เข้าสู่ระบบ"
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
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

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ชื่อ
                    </label>
                    <div className="mt-1">
                      <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="สมชาย"
                      />
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
                      <input
                        id="lastname"
                        name="lastname"
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="ใจดี"
                      />
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
                    <input
                      id="register-input"
                      name={registerType === "email" ? "email" : "phone"}
                      type={registerType === "email" ? "email" : "tel"}
                      autoComplete={registerType === "email" ? "email" : "tel"}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder={
                        registerType === "email"
                          ? "your@email.com"
                          : "0812345678"
                      }
                    />
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
                    <PasswordInput
                      id="reg-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
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
                    <PasswordInput
                      id="password-confirm"
                      name="password-confirm"
                      type="password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    ฉันยอมรับ{" "}
                    <a
                      href="#"
                      className="text-primary-600 hover:text-primary-500"
                    >
                      เงื่อนไขการใช้งาน
                    </a>{" "}
                    และ{" "}
                    <a
                      href="#"
                      className="text-primary-600 hover:text-primary-500"
                    >
                      นโยบายความเป็นส่วนตัว
                    </a>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300"
                  >
                    สร้างบัญชี
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
