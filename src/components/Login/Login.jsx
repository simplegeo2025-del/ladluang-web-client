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
  const [loginType, setLoginType] = useState("email");
  const [registerType, setRegisterType] = useState("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await loginService(data.identifier, data.password);
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
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setLoginType("email")}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    loginType === "email"
                      ? "border-primary-600 text-primary-600 bg-primary-50"
                      : "bg-white text-gray-700 border-gray-300 hover:border-primary-300"
                  }`}
                >
                  <Icon icon="mdi:email" className="h-5 w-5" />
                  อีเมล
                </button>
                <button
                  onClick={() => setLoginType("phone")}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    loginType === "phone"
                      ? "border-primary-600 text-primary-600 bg-primary-50"
                      : "bg-white text-gray-700 border-gray-300 hover:border-primary-300"
                  }`}
                >
                  <Icon icon="mdi:phone" className="h-5 w-5" />
                  เบอร์โทร
                </button>
              </div>

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
                    htmlFor="identifier"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {loginType === "email" ? "อีเมล" : "เบอร์โทรศัพท์"}
                  </label>
                  <div className="mt-1 relative">
                    <Controller
                      name="identifier"
                      control={control}
                      rules={{
                        required:
                          loginType === "email"
                            ? "กรุณากรอกอีเมล"
                            : "กรุณากรอกเบอร์โทรศัพท์",
                        pattern: {
                          value:
                            loginType === "email"
                              ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                              : /^[0-9]{10}$/,
                          message:
                            loginType === "email"
                              ? "รูปแบบอีเมลไม่ถูกต้อง"
                              : "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอกเป็นตัวเลข 10 หลัก",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type={loginType === "email" ? "email" : "tel"}
                          autoComplete={loginType === "email" ? "email" : "tel"}
                          placeholder={
                            loginType === "email"
                              ? "your@email.com"
                              : "0812345678"
                          }
                          className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                            errors.identifier
                              ? "border-red-300"
                              : "border-gray-300"
                          }`}
                        />
                      )}
                    />
                    {errors.identifier && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Icon
                          icon="mdi:alert-circle"
                          className="h-5 w-5 text-red-500"
                        />
                      </div>
                    )}
                  </div>
                  {errors.identifier && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <Icon icon="mdi:alert-circle" className="h-4 w-4" />
                      {errors.identifier.message}
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
                            errors.password
                              ? "border-red-300"
                              : "border-gray-300"
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

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        หรือเข้าสู่ระบบด้วย
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3">
                    <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-3 shadow-sm">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      เข้าสู่ระบบด้วย Google
                    </button>
                  </div>
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
