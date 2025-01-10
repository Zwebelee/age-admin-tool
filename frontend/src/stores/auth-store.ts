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
    //TODO: load the refresh-cookiename from dotenv -> env in the root directoy

    accessToken: string | null = null;
    refreshToken: string | null = null;
    refresh_csrf_token: string | null = null;

    isLoggedIn: boolean = false;
    isLoading: boolean = true;

    rootStore: RootStore;

    constructor(rootStore: RootStore, private authService: AuthService, private logger: LoggerService) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
        this.initialize();
    }

    initialize() {
        const token = getCookie(AuthStore.TOKEN_COOKIE_NAME);
        this.logger.log('debug -> auth-initialize -> accesstoken?', !!token); //TODO <- cleanup
        const refreshToken = getCookie(AuthStore.REFRESH_TOKEN_COOKIE_NAME); //TODO: wird nie gelesen werden können :)
        this.logger.log('refreshtoken?', !!refreshToken); //TODO <- cleanup
        const refresh_csrf_token = getCookie(AuthStore.REFRESH_CSRF_TOKEN_COOKIE_NAME);
        this.logger.log('refresh_csrf_token?', !!refresh_csrf_token); //TODO <- cleanup
        if (token) {
            // check if the token is valid
            this.validateToken(token).then((isValid) => {
                if(!isValid) {
                    this.logger.log('debug -> is not valid token'); //TODO <- cleanup
                    this.resetUserSession();
                } else {
                    this.logger.log('debug -> is valid token'); //TODO <- cleanup
                    this.accessToken = token;
                    this.refresh_csrf_token = refresh_csrf_token;
                    this.isLoggedIn = true;
                    this.logger.log('debug -> is logged in an token', token, this.isLoggedIn); //TODO <- cleanup
                    // Ensure RootStore is fully initialized on site reload
                    Promise.resolve().then(() => {
                        this.rootStore.initializeStoresAfterLogin();
                        this.isLoading = false;
                    });
                }
            })
        } else {
            console.log('no access token found - refresh is httpOnly, might be present')
            if(refresh_csrf_token){
                this.refresh_csrf_token = refresh_csrf_token;
                this.refreshAccessToken().then(() => {
                    console.log("refreshing via csrf")
                    this.isLoading = false;
                    return
                }).catch(() => {
                    console.log('refreshing failed')
                    this.isLoading = false;
                    return
                });

            }
            console.log('no tokens found -> new login required')
            this.isLoading = false;
        }
    }

    private clearCookies(){
        deleteCookie(AuthStore.TOKEN_COOKIE_NAME);
        deleteCookie(AuthStore.REFRESH_TOKEN_COOKIE_NAME);
        deleteCookie(AuthStore.REFRESH_CSRF_TOKEN_COOKIE_NAME);
    }

    private resetUserSession() {
        this.clearCookies();
        this.accessToken = null;
        this.refreshToken = null;
        this.refresh_csrf_token = null;
        this.isLoggedIn = false;
    }

    private setAuthCookie(){
        //TODO: accesstoken -> better save in session storage / memory
        //TODO: the backend MUST set the cookie-flags !!!
        if (this.accessToken) {
            setCookie(AuthStore.TOKEN_COOKIE_NAME, this.accessToken, {
                expires: this.getJwtExpiration(this.accessToken) ?? 15*60, // 15 minutes
                secure: true,
                sameSite: 'strict'
            });

        }

        if (this.refreshToken) {
            setCookie(AuthStore.REFRESH_TOKEN_COOKIE_NAME, this.refreshToken, {
                expires: this.getJwtExpiration(this.refreshToken) ?? 7 * 24 * 60 * 60, // 7 days
                secure: true,
                sameSite: 'strict',
                httpOnly: true
            });
        }

        if (this.refresh_csrf_token) {
            setCookie(AuthStore.REFRESH_CSRF_TOKEN_COOKIE_NAME, this.refresh_csrf_token, {
                expires: 7 * 24 * 60 * 60, // 7 days //TODO: set the same expiration as the refresh token
                secure: true,
                sameSite: 'strict'
            });

        }


        console.log('cookies are set')
        console.log('accesstoken', this.accessToken)
        console.log('refreshtoken', this.refreshToken)
        console.log('refresh_csrf_token', this.refresh_csrf_token)

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
            if(decodedToken.exp && decodedToken.iat ) {
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
            this.refresh_csrf_token = response.data.csrf_token;
            this.setAuthCookie()

            this.isLoggedIn = true;
            this.logger.log('Login successful');
            this.rootStore.initializeStoresAfterLogin()
        } catch (error) {
            this.logger.error("Login failed", error);
        }
    }

    async refreshAccessToken() {
        console.log('trying to refresh the token')
        if(!this.refresh_csrf_token){
            console.log('no csrf token found - logout')
            await this.logout();
            return
        }

        try {
            console.log('sending /refresh : ', this.refresh_csrf_token)
            const response = await this.authService.getApiClient().post('/refresh', {}, {
                headers: {
                    'X-CSRF-TOKEN': this.refresh_csrf_token
                }
            });
            console.log('responso')
            console.log('refresh token response', response)
            this.accessToken = response.data.access_token;
            console.log('accesstoken is refreshed')
        } catch (error) {
            console.log('------------')
            this.logger.error("Failed to refresh token", error);
            await this.logout();
        }
    }

    async logout() {
        console.log('----->Logging out')
        try {
            const response = await this.authService.getApiClient().delete('/logout');
            if (response.status !== 200) {
                this.logger.error('Failed to properly logout', response);
            } else {
                this.resetUserSession();
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

    async validateToken(token: string): Promise<boolean> {
        this.logger.log('debug -> validate token function') //TODO <- cleanup

        if (!token) {
            this.logger.log('debug ->>>>>>>>>>> no token');
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
                this.logger.error('token is not expred but not valid anymore!')
                return false;
            }
        } catch (error) {
            this.logger.error("Token validation failed", error);
            await this.logout();
            return false;
        }
    }

    getRefreshToken(): string | null {
        return getCookie(AuthStore.REFRESH_TOKEN_COOKIE_NAME);
    }
}
