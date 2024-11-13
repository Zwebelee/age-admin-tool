// src/services/auth.service.ts
import axios from "axios";
import {authStore} from "../stores/auth-store.ts";

const apiClient = axios.create({
    baseURL: "http://localhost:5001",
    withCredentials: true, // Allow cookies
});

// Add a request interceptor
apiClient.interceptors.request.use(
    async (config) => {
        if (authStore.accessToken) {
            config.headers["Authorization"] = `Bearer ${authStore.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && error.config && !error.config._retry) {
            // Attempt to refresh the token
            error.config._retry = true;
            await authStore.refreshAccessToken();
            if (authStore.accessToken) {
                error.config.headers["Authorization"] = `Bearer ${authStore.accessToken}`;
                return apiClient(error.config);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;