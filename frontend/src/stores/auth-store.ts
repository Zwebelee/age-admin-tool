import {makeAutoObservable} from "mobx";
import {deleteCookie, getCookie, setCookie} from "../utils/cookie.ts";
import {AuthService} from "../services/auth.service.ts";
import {LoggerService} from "../services/logger.service.ts";
import {RootStore} from "./root-store.ts";

interface LoginCredentials {
    username: string;
    password: string;
}

export class AuthStore {
    private static readonly TOKEN_COOKIE_NAME = 'token';
    private static readonly REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';

    accessToken: string | null = null;
    refreshToken: string | null = null;
    isLoggedIn: boolean = false;
    rootStore: RootStore;

    constructor(rootStore: RootStore, private authService: AuthService, private logger: LoggerService) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
        this.initialize();
    }

    initialize() {
        const token = getCookie(AuthStore.TOKEN_COOKIE_NAME);
        if (token) {
            this.accessToken = token;
            this.isLoggedIn = true;
            this.logger.log('debug -> is logged in an token', token, this.isLoggedIn);
            // Ensure RootStore is fully initialized on site reload
            Promise.resolve().then(() => {
                this.rootStore.initializeStoresAfterLogin();
            });
        }
    }

    private resetUserSession() {
        deleteCookie(AuthStore.TOKEN_COOKIE_NAME);
        deleteCookie(AuthStore.REFRESH_TOKEN_COOKIE_NAME);
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

            //TODO: accesstoken -> better save in session storage
            if (this.accessToken) {
                setCookie(AuthStore.TOKEN_COOKIE_NAME, this.accessToken, {
                    expires: 15 * 60, // 15 minutes
                    secure: true,
                    sameSite: 'strict'
                });
            }

            if (this.refreshToken) {
                setCookie(AuthStore.REFRESH_TOKEN_COOKIE_NAME, this.refreshToken, {
                    expires: 7 * 24 * 60 * 60, // 7 days
                    secure: true,
                    sameSite: 'strict',
                    httpOnly: true
                });
            }
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
