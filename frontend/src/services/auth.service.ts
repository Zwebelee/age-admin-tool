// src/services/auth.service.ts
import axios, {AxiosInstance} from "axios";
import {RootStore} from "../stores/root-store.ts";

export class AuthService {
    private apiClient: AxiosInstance;

    constructor(private rootStore: RootStore) {
        this.apiClient = axios.create({
            baseURL: "http://localhost:5001",
            withCredentials: true, // Allow cookies
        });

        // Add a request interceptor
        this.apiClient.interceptors.request.use(
            async (config) => {
                if (this.rootStore.authStore.accessToken) {
                    config.headers["Authorization"] = `Bearer ${this.rootStore.authStore.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Add a response interceptor
        this.apiClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401 && error.config && !error.config._retry) {
                    // Attempt to refresh the token
                    error.config._retry = true;
                    await this.rootStore.authStore.refreshAccessToken();
                    if (this.rootStore.authStore.accessToken) {
                        error.config.headers["Authorization"] = `Bearer ${this.rootStore.authStore.accessToken}`;
                        return this.apiClient(error.config);
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    getApiClient() {
        return this.apiClient;
    }
}
//
// // Add a request interceptor
// apiClient.interceptors.request.use(
//     async (config) => {
//         if (authStore.accessToken) {
//             config.headers["Authorization"] = `Bearer ${authStore.accessToken}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );
//
// // Add a response interceptor
// apiClient.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         if (error.response?.status === 401 && error.config && !error.config._retry) {
//             // Attempt to refresh the token
//             error.config._retry = true;
//             await authStore.refreshAccessToken();
//             if (authStore.accessToken) {
//                 error.config.headers["Authorization"] = `Bearer ${authStore.accessToken}`;
//                 return apiClient(error.config);
//             }
//         }
//         return Promise.reject(error);
//     }
// );
//
// export default apiClient;