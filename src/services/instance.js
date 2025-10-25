import { getToken, removeToken, setToken } from '../utils/localStorage';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${getToken().accessToken}`,
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (newAccessToken) => {
    refreshSubscribers.forEach((callback) => callback(newAccessToken));
    refreshSubscribers = [];
};

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${getToken().accessToken}`;
        return config;
    },
    (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;

            // if (!isRefreshing) {
            //     isRefreshing = true;

            //     try {
            //         const { refreshToken } = getToken();

            //         if (!refreshToken) {
            //             handleSignOut();
            //             location.replace('/auth/sign-in')
            //             return;
            //         }
            //         const response = await axios.post(`${BASE_URL}/refresh/token`, {
            //             refreshToken,
            //         });
            //         const { accessToken: newAccessToken } = response.data.data;
            //         setToken(newAccessToken, refreshToken);
            //         onRefreshed(newAccessToken);
            //         isRefreshing = false;

            //         if (originalRequest?.headers) {
            //             originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            //         }
            //         return axiosInstance(originalRequest);
            //     } catch (refreshError) {
            //         console.error('Refresh token failed:', refreshError);
            //         isRefreshing = false;
            //         handleSignOut();
            //         return Promise.reject(refreshError);
            //     }
            // }

            return new Promise((resolve) => {
                refreshSubscribers.push((newAccessToken) => {
                    if (originalRequest?.headers) {
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    }
                    resolve(axiosInstance(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    },
);

const handleSignOut = () => {
    //   signOut();
    removeToken();
};

export default axiosInstance;
