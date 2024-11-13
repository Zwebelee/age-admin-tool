import { makeAutoObservable } from "mobx";
import axios from "axios";

export interface IAuthUser {
    uid: string;
    isAnonymous: boolean;
    email: string | null;
    displayName: string | null;
}

export class AuthUser implements IAuthUser{
    public uid: string;
    public isAnonymous: boolean;
    public email: string | null;
    public displayName: string| null;

    constructor({uid, isAnonymous, email, displayName}: { uid: string, isAnonymous: boolean, email: string | null , displayName: string| null }) {
        this.uid = uid;
        this.isAnonymous = isAnonymous;
        this.email = email;
        this.displayName = displayName;

        makeAutoObservable(this);
    }
}

export class AuthStore {
    accessToken: string | null = null;
    refreshToken: string | null = null;
    isLoggedIn: boolean = false;

    constructor() {
        makeAutoObservable(this);
        console.log('AuthStore created');
    }

    async login(username: string, password: string) {
        try {
            const response = await axios.post('http://localhost:5001/login', { username, password });
            this.accessToken = response.data.access_token;
            this.refreshToken = response.data.refresh_token;
            this.isLoggedIn = true;
            console.log('Login successful');

        } catch (error) {
            console.error("Login failed", error);
        }
    }

    async refreshAccessToken() {
        try {
            const response = await axios.post('http://localhost:5001/refresh', { token: this.refreshToken });
            this.accessToken = response.data.access_token;
        } catch (error) {
            console.error("Failed to refresh token", error);
            this.logout();
        }
    }

    logout() {
        this.accessToken = null;
        this.refreshToken = null;
        this.isLoggedIn = false;
    }
}

export const authStore = new AuthStore();