import {makeAutoObservable} from "mobx";
import {deleteCookie, getCookie, setCookie} from "../utils/cookie.ts";
import {AuthService} from "../services/auth.service.ts";
import {LoggerService} from "../services/logger.service.ts";
import {RootStore} from "./root-store.ts";
import {jwtDecode, JwtPayload} from 'jwt-decode';

interface LoginCredentials {
    username: string;
    password: string;
}

export class AuthStore {
    private static readonly TOKEN_COOKIE_NAME = 'token';
    private static readonly REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';
    private static readonly REFRESH_CSRF_TOKEN_COOKIE_NAME = 'refresh_csrf_token';
    //TODO: load the refresh-cookiename from dotenv -> env in the root directoy or better let backend set cookies

    accessToken: string | null = null;
    refreshToken: string | null = null;
    refreshCsrfToken: string | null = null;
    isLoggedIn: boolean = false;
    isLoading: boolean = true;

    rootStore: RootStore;

    constructor(rootStore: RootStore, private authService: AuthService, private logger: LoggerService) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
        this.initialize().catch(error => {
            this.logger.error('Initialization failed', error);
        });
    }

    async initialize() {
        const token = getCookie(AuthStore.TOKEN_COOKIE_NAME);
        this.refreshCsrfToken = getCookie(AuthStore.REFRESH_CSRF_TOKEN_COOKIE_NAME);

        if (token) {
            const isValid = await this.validateToken(token);
            if (!isValid) {
                this.logger.warn('Invalid access-token, logging out');
                this.resetUserSession();
            } else {
                this.accessToken = token;
                await this.handleSuccessfulLogin();
            }
        } else if (this.refreshCsrfToken) {
            try {
                await this.refreshAccessToken();
                await this.handleSuccessfulLogin();
            } catch (error) {
                this.logger.error('Refreshing failed', error);
            }
        }

        this.isLoading = false;
    }

    private async handleSuccessfulLogin() {
        try {
            await this.loadUserAndInitialize();
            this.isLoggedIn = true;
        } catch (error) {
            this.logger.error('Failed to complete post-login setup', error);
        }
    }

    private async loadUserAndInitialize() {
        await this.rootStore.toolUserStore.loadUser();
        const toolUser = this.rootStore.toolUserStore.user;
        if (!toolUser) {
            throw new Error('Failed to load user after login');
        }
        this.rootStore.themeStore.setTheme(toolUser.theme as "light" | "dark");
        this.rootStore.languageStore.switchLanguage(toolUser.language as "de" | "fr" | "en");
        await this.rootStore.permissionsStore.loadPermissions(toolUser.guid);
        this.rootStore.initializeStoresAfterLogin();
    }

    private clearCookies() {
        [
            AuthStore.TOKEN_COOKIE_NAME,
            AuthStore.REFRESH_TOKEN_COOKIE_NAME,
            AuthStore.REFRESH_CSRF_TOKEN_COOKIE_NAME
        ].forEach(deleteCookie);
    }

    private setAccessTokenCookie() {
        if (this.accessToken) {
            setCookie(AuthStore.TOKEN_COOKIE_NAME, this.accessToken, {
                expires: this.getJwtExpiration(this.accessToken) ?? 15 * 60, // 15 minutes
                secure: true,
                sameSite: 'strict'
            });
        }
    }

    private resetUserSession() {
        this.clearCookies();
        this.accessToken = null;
        this.refreshToken = null;
        this.refreshCsrfToken = null;
        this.isLoggedIn = false;
    }

    private setAuthCookie() {
        //TODO: accesstoken -> better save in session storage / memory
        //TODO: these cookies should be set by the backend and recieved by the frontend
        if (this.accessToken) {
            setCookie(AuthStore.TOKEN_COOKIE_NAME, this.accessToken, {
                expires: this.getJwtExpiration(this.accessToken) ?? 15 * 60, // 15 minutes
                secure: true,
                sameSite: 'strict'
            });

        }

        if (this.refreshToken) {
            setCookie(AuthStore.REFRESH_TOKEN_COOKIE_NAME, this.refreshToken, {
                expires: this.getJwtExpiration(this.refreshToken) ?? 7 * 24 * 60 * 60, // 7 days
                secure: true,
                sameSite: 'strict',
                // httpOnly: true //TODO: MUST to be set! but backend not ready yet
            });
        }

        if (this.refreshCsrfToken) {
            const expires = this.refreshToken
                ? (this.getJwtExpiration(this.refreshToken) ?? 7 * 24 * 60 * 60)
                : 7 * 24 * 60 * 60;
            setCookie(AuthStore.REFRESH_CSRF_TOKEN_COOKIE_NAME, this.refreshCsrfToken, {
                expires: expires,
                secure: true,
                sameSite: 'strict'
            });
        }
    }

    private decodeJwtToken(token: string): JwtPayload | null {
        try {
            return jwtDecode<JwtPayload>(token);
        } catch (error) {
            this.logger.error('Failed to decode JWT token', error);
            return null;
        }
    }

    private getJwtExpiration(token: string): number | null {
        const decodedToken = this.decodeJwtToken(token);
        if (decodedToken) {
            if (decodedToken.exp && decodedToken.iat) {
                return decodedToken.exp - decodedToken.iat
            }
            return null
        }
        return null;
    }

    async login(loginCredentials: LoginCredentials) {
        try {
            const response = await this.authService.getApiClient().post('/login', loginCredentials);
            this.accessToken = response.data.access_token;
            this.refreshToken = response.data.refresh_token;
            this.refreshCsrfToken = response.data.csrf_token;
            this.setAuthCookie()
            await this.rootStore.toolUserStore.loadUser();
            const toolUser = this.rootStore.toolUserStore.user;
            if (!toolUser) {
                this.logger.error('Failed to load user after login');
                return;
            }
            this.rootStore.themeStore.setTheme(toolUser.theme as "light" | "dark");
            this.rootStore.languageStore.switchLanguage(toolUser.language as "de" | "fr" | "en");
            await this.rootStore.permissionsStore.loadPermissions(this.rootStore.toolUserStore.user?.guid || '');
            this.isLoggedIn = true;
            this.rootStore.initializeStoresAfterLogin()
        } catch (error) {
            this.logger.error("Login failed", error);
        }
    }

    async refreshAccessToken() {
        if (!this.refreshCsrfToken) {
            this.logger.info('No csrf-token for refresh found');
            await this.logout();
            return
        }

        try {
            const response = await this.authService.getApiClient().post('/refresh', {}, {
                headers: {
                    'X-CSRF-TOKEN': this.refreshCsrfToken
                }
            });
            this.accessToken = response.data.access_token;
            this.setAccessTokenCookie()
            this.isLoggedIn = true;
        } catch (error) {
            this.logger.error("Failed to refresh token", error);
            await this.logout();
        }
    }

    async logout() {
        //TODO: improve logout - with invalid credentials backend will 401 - toolUserStore handling
        try {
            const response = await this.authService.getApiClient().delete('/logout');
            if (response.status !== 200) {
                this.logger.warn("Proper Logout failed", response);
            } else {
                this.rootStore.toolUserStore.user = undefined;
                this.rootStore.toolUserStore.userLoaded = false;
                this.rootStore.permissionsStore.clearPermissionsCache();
                this.resetUserSession();
            }
        } catch (error) {
            this.logger.error("Proper Logout failed", error);
            this.resetUserSession()
        }
    }

    async changeLogin(password: string, newPassword: string): Promise<number | null> {
        //TODO: handling in backend -> revoke tokens, set new salt, send new tokens
        try {
            const payload = {"current_password": password, "new_password": newPassword};
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

    async validateToken(token: string): Promise<boolean> {
        if (!token) {
            await this.logout();
            return false;
        }

        try {
            const response = await this.authService.getApiClient().post('/validate-token', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                this.accessToken = token;
                this.isLoggedIn = true;
                return true;
            } else {
                await this.logout();
                this.logger.error('Token is not expired but not valid anymore!')
                return false;
            }
        } catch (error) {
            this.logger.error("Token validation failed", error);
            await this.logout();
            return false;
        }
    }
}
