import axiosInstance from "../instance";

export const loginService = async (email, password) => {
    const response = await axiosInstance.post(`/api/auth/citizens/email/login`, {
        email,
        password,
    });
    return response.data;
};
 