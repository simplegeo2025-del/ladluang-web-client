import axiosInstance from "./instance";

export const forgetPasswordService = async (identifier) => {
    const isMobile = /^[0-9]{10}$/.test(identifier);
    const endpoint = isMobile ? 'mobile' : 'email';
    const payload = isMobile ? { mobile: identifier } : { email: identifier };
    
    const response = await axiosInstance.post(`/auth/citizens/${endpoint}/forget-password`, payload);
    return response.data;
}

export const forgotPasswordEmailService = async (email) => {
    const payload = { email };
    const response = await axiosInstance.post(`/auth/citizens/email/forgot-password`, payload);
    return response.data;
};

export const forgotPasswordMobileService = async (phone) => {
    const payload = { phone };
    const response = await axiosInstance.post(`/auth/citizens/mobile/forgot-password`, payload);
    return response.data;
};

export const loginService = async (identifier, password) => {
    const isMobile = /^[0-9]{10}$/.test(identifier);
    const endpoint = isMobile ? 'mobile' : 'email';
    console.log("🚀 ~ loginService ~ identifier:", identifier)
    const payload = isMobile ? { mobile: identifier, password } : { email: identifier, password };
    
    const response = await axiosInstance.post(`/auth/citizens/${endpoint}/login`, payload);
    return response.data;
};

export const registerMobileService = async (data) => {
    const payload = {
        phone: data.phone,
        password: data.password,
        firstName: data.firstname,
        lastName: data.lastname
    };
    const response = await axiosInstance.post(`/auth/citizens/mobile/register`, payload);
    return response.data;
};

export const registerEmailService = async (data) => {
    const payload = {
        email: data.email,
        password: data.password,
        firstName: data.firstname,
        lastName: data.lastname
    };
    const response = await axiosInstance.post(`/auth/citizens/email/register`, payload);
    return response.data;
};

export const registerService = async (data) => {
    const isMobile = /^[0-9]{10}$/.test(data.identifier);
    if (isMobile) {
        return registerMobileService(data);
    } else {
        return registerEmailService(data);
    }
};

export const verifyEmailService = async (token) => {
    const params = {
        token
    };
    const response = await axiosInstance.get(`/auth/citizens/email/verify`, { params });
    return response.data;
};

export const googleExchangeService = async (code) => {
    const response = await axiosInstance.get(`/auth/citizens/google/callback?code=${code}`);
    return response.data;
};

export const meService = async () => {
    const response = await axiosInstance.get(`/auth/citizens/me`);
    return response.data;
};

export const registerRequestOtpService = async ({ phone, userId }) => {
    const payload = {
        phone,
        userId
    };
    const response = await axiosInstance.post(`/auth/citizens/mobile/request-otp`, payload);
    return response.data;
};

export const registerVerifyOtpService = async ({ userId, phone, otpCode, refCode }) => {
    const payload = {
        userId,
        phone,
        otpCode,
        refCode
    };
    const response = await axiosInstance.post(`/auth/citizens/mobile/verify-otp`, payload);
    return response.data;
};

export const verifyOtpForResetService = async ({ phone, refCode, otpCode }) => {
    const payload = {
        phone,
        refCode,
        otpCode
    };
    const response = await axiosInstance.post(`/auth/citizens/mobile/verify-otp-for-reset`, payload);
    return response.data;
};