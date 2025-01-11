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
        const refresh_csrf_token = getCookie(AuthStore.REFRESH_CSRF_TOKEN_COOKIE_NAME);

        if (token) {
            // access token present - check if the token is valid
            this.validateToken(token).then((isValid) => {
                if (!isValid) {
                    this.logger.warn('Invalid access-token, logging out');
                    this.resetUserSession();
                } else {
                    this.accessToken = token;
                    this.refreshCsrfToken = refresh_csrf_token;
                    this.isLoggedIn = true;

                    // Ensure RootStore is fully initialized on site reload
                    Promise.resolve().then(() => {
                        this.rootStore.initializeStoresAfterLogin();
                        this.isLoading = false;
                    });
                }
            })
        } else {
            if (refresh_csrf_token) {
                this.refreshCsrfToken = refresh_csrf_token;
                try {
                    await this.refreshAccessToken();
                    Promise.resolve().then(() => {
                        this.rootStore.initializeStoresAfterLogin();
                        this.isLoading = false;
                    });
                } catch (error) {
                    this.logger.error('Refreshing failed', error)
                    this.isLoading = false;
                }
            }
            this.isLoading = false;
        }
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
            //TODO: (A) load the permissions ?!

            this.setAuthCookie()
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
        //TODO: improve logout - with invalid credentials backend will 401
        try {
            const response = await this.authService.getApiClient().delete('/logout');
            if (response.status !== 200) {
            } else {
                this.resetUserSession();
            }
        } catch (error) {
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
