import axiosInstance from "./instance";

export const forgetPasswordService = async (identifier) => {
    const isMobile = /^[0-9]{10}$/.test(identifier);
    const endpoint = isMobile ? 'mobile' : 'email';
    const payload = isMobile ? { mobile: identifier } : { email: identifier };
    
    const response = await axiosInstance.post(`/auth/citizens/${endpoint}/forget-password`, payload);
    return response.data;
}

export const loginService = async (identifier, password) => {
    const isMobile = /^[0-9]{10}$/.test(identifier);
    const endpoint = isMobile ? 'mobile' : 'email';
    const payload = isMobile ? { mobile: identifier, password } : { email: identifier, password };
    
    const response = await axiosInstance.post(`/auth/citizens/${endpoint}/login`, payload);
    return response.data;
};

export const registerMobileService = async (data) => {
    const payload = {
        mobile: data.identifier,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName
    };
    const response = await axiosInstance.post(`/auth/citizens/mobile/register`, payload);
    return response.data;
};

export const registerEmailService = async (data) => {
    const payload = {
        email: data.identifier,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName
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

export const googleExchangeService = async (code) => {
    const response = await axiosInstance.get(`/auth/citizens/google/callback?code=${code}`);
    return response.data;
};

export const meService = async () => {
    const response = await axiosInstance.get(`/auth/citizens/me`);
    return response.data;
};