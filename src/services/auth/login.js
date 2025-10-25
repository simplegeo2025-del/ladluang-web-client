import axiosInstance from "../instance";

export const loginService = async (identifier, password) => {
    const isMobile = /^[0-9]{10}$/.test(identifier);
    const endpoint = isMobile ? 'mobile' : 'email';
    const payload = isMobile ? { mobile: identifier, password } : { email: identifier, password };
    
    const response = await axiosInstance.post(`/api/auth/citizens/${endpoint}/login`, payload);
    return response.data;
};