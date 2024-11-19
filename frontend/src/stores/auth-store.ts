import {makeAutoObservable} from "mobx";
import axios from "axios";
import {RootStore} from "./root-store.ts";
import {getCookie, setCookie} from "../utils/cookie.ts";

interface LoginCredentials {
    username: string;
    password: string;
}

export class AuthStore {
    accessToken: string = "";
    refreshToken: string | null = null;
    isLoggedIn: boolean = false;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
        this.initialize();
    }

    initialize() {
        const token = getCookie('token');
        if (token) {
            console.log('debug: token found!') //TODO: Cleanup!
            this.accessToken = token;
            this.isLoggedIn = true;
        }
    }

    async login(loginCredentials: LoginCredentials) {
        try {
            const response = await axios.post('http://localhost:5001/login', loginCredentials);
            this.accessToken = response.data.access_token;
            this.refreshToken = response.data.refresh_token;
            this.isLoggedIn = true;
            console.log('Login successful');

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
            const response = await axios.post('http://localhost:5001/refresh', {token: this.refreshToken});
            this.accessToken = response.data.access_token;
        } catch (error) {
            console.error("Failed to refresh token", error);
            this.logout();
        }
    }

    logout() {
        this.accessToken = "";
        this.refreshToken = null;
        this.isLoggedIn = false;
    }
}
