import {makeAutoObservable} from "mobx";
import {RootStore} from "./root-store.ts";
import {getCookie, setCookie} from "../utils/cookie.ts";
import {AuthService} from "../services/auth.service.ts";

interface LoginCredentials {
    username: string;
    password: string;
}

export class AuthStore {
    accessToken: string = "";
    refreshToken: string | null = null;
    isLoggedIn: boolean = false;

    constructor(private rootStore: RootStore, private authService: AuthService) {
        makeAutoObservable(this);
        this.initialize();
    }

    initialize() {
        const token = getCookie('token');
        if (token) {
            this.accessToken = token;
            this.isLoggedIn = true;
        }
    }

    private resetUserSession() {
        this.accessToken = "";
        this.refreshToken = null;
        this.isLoggedIn = false;
    }

    async login(loginCredentials: LoginCredentials) {
        try {
            const response = await this.authService.getApiClient().post('/login', loginCredentials);
            this.accessToken = response.data.access_token;
            this.refreshToken = response.data.refresh_token;
            this.isLoggedIn = true;
            console.log('Login successful');
            //TODO: save refreshtoken in cookie as well?

            setCookie('token', this.accessToken, {
                expires: 15 *60,
                secure: true,
                sameSite: 'strict'
            })


        } catch (error) {
            console.error("Login failed", error);
        }
    }

    async refreshAccessToken() {
        try {
            const response = await this.authService.getApiClient().post('/refresh', {token: this.refreshToken});
            this.accessToken = response.data.access_token;
        } catch (error) {
            console.error("Failed to refresh token", error);
            await this.logout();
        }
    }

    async logout() {
        try {
            const response = await this.authService.getApiClient().delete('/logout');
            if (response.status !== 200) {
                console.error('Failed to logout', response);
            } else {
                this.resetUserSession();
                setCookie('token', '', {
                    expires: -1
                })
            }
        } catch (error) {
            console.error("Login failed", error);
            this.resetUserSession()
        }
    }
}
