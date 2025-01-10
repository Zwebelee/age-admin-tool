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
                if (config.url == '/refresh') {
                    return config;
                }
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
                    if (originalRequest.url === '/logout') {
                        console.log('Logout no clean-> debug remove later ');
                        return Promise.reject(error);
                    }
                    if(originalRequest.url === '/refresh'){
                        return Promise.reject(error);
                    }
                    console.log('401 error -> i would try to refresh the token -> debug remove later');
                    console.log('url:', originalRequest.url);

                    try {
                        await this.rootStore.authStore.refreshAccessToken();
                        originalRequest.headers["Authorization"] = `Bearer ${this.rootStore.authStore.accessToken}`;
                        return this.apiClient(originalRequest);
                    } catch (refreshError) {
                        console.log("axios errored")
                        await this.rootStore.authStore.logout();
                        return Promise.reject(refreshError);
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
