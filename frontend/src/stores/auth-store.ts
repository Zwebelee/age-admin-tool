import {makeAutoObservable} from "mobx";
import {getCookie, setCookie} from "../utils/cookie.ts";
import {AuthService} from "../services/auth.service.ts";
import {LoggerService} from "../services/logger.service.ts";
import {RootStore} from "./root-store.ts";

interface LoginCredentials {
    username: string;
    password: string;
}

export class AuthStore {
    accessToken: string = "";
    refreshToken: string | null = null;
    isLoggedIn: boolean = false;
    rootStore: RootStore;

    constructor(rootStore: RootStore, private authService: AuthService, private logger: LoggerService) {
        this.rootStore = rootStore;
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
            this.logger.log('Login successful');
            this.rootStore.initializeStoresAfterLogin()
            //TODO: save refreshtoken in cookie as well?

            setCookie('token', this.accessToken, {
                expires: 15 *60,
                secure: true,
                sameSite: 'strict'
            })


        } catch (error) {
            this.logger.error("Login failed", error);
        }
    }

    async refreshAccessToken() {
        try {
            const response = await this.authService.getApiClient().post('/refresh', {token: this.refreshToken});
            this.accessToken = response.data.access_token;
        } catch (error) {
            this.logger.error("Failed to refresh token", error);
            await this.logout();
        }
    }

    async logout() {
        try {
            const response = await this.authService.getApiClient().delete('/logout');
            if (response.status !== 200) {
                this.logger.error('Failed to logout', response);
            } else {
                this.resetUserSession();
                setCookie('token', '', {
                    expires: -1
                })
            }
        } catch (error) {
            this.logger.error("Login failed", error);
            this.resetUserSession()
        }
    }

    async changeLogin(password: string, newPassword: string): Promise<number | null> {
        //TODO: handling in backend -> revoke tokens, set new salt, send new tokens
        try {
            const payload = { "current_password": password, "new_password": newPassword };
            await this.authService.getApiClient().put('/toolusers/change_password', payload);
            return null;
        } catch (err) {
            const error = err as { response?: { status?: number } };
            if (error.response && error.response.status) {
                return error.response.status;
            }
            return -1; // Return -1 for unexpected errors
        }
    }
}
