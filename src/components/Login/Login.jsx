import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Icon } from "@iconify/react";
import PasswordInput from "../common/PasswordInput";
import { setToken } from "../../utils/localStorage";
import { loginService, registerService } from "../../services/auth.service";
import useUserStore from "../../store/user.store";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [loginType, setLoginType] = useState("email");
  const [registerType, setRegisterType] = useState("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchUser = useUserStore((state) => state.fetchUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identifier: "",
      email: "teers4@gmail.com",
      password: "Teera1123345",
      firstname: "",
      lastname: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      const { accessToken } = await loginService(
        data.identifier,
        data.password
      );
      setToken(accessToken);
      await fetchUser();
      navigate("/reports");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data) => {
    console.log("🚀 ~ onRegisterSubmit ~ data:", data);
    try {
      setIsLoading(true);
      setError("");
      const response = await registerService({
        identifier: data.identifier,
        password: data.password,
        firstName: data.firstname,
        lastName: data.lastname,
      });
      const isMobile = /^[0-9]{10}$/.test(data.identifier);
      console.log("🚀 ~ onRegisterSubmit ~ isMobile:", isMobile);
      if (isMobile) {
        navigate("/verify-otp", { state: { phoneNumber: data.identifier } });
      } else {
        navigate("/verify-email");
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const GOOGLE_AUTH_URL = `${
      import.meta.env.VITE_BACKEND_URL
    }/auth/citizens/google`;
    window.location.href = GOOGLE_AUTH_URL;
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

          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};



export default Login;
