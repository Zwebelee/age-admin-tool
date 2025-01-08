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
                const originalRequest = error.config;
                if (error.response?.status === 401) {
                    if (originalRequest.url === '/login') {
                        console.log('Login failed -> debug remove later ');
                        return Promise.reject(error);
                    }
                    //TODO: catch the 401 from validate-token
                    if (!originalRequest._retry) {
                        originalRequest._retry = true;
                        originalRequest._retryCount = originalRequest._retryCount || 0;

                        if (originalRequest._retryCount < 5) {
                            originalRequest._retryCount += 1;
                            await this.rootStore.authStore.refreshAccessToken();
                            if (this.rootStore.authStore.accessToken) {
                                originalRequest.headers["Authorization"] = `Bearer ${this.rootStore.authStore.accessToken}`;
                                return this.apiClient(originalRequest);
                            }
                        }
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
