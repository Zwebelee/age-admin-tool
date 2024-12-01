import {AuthService} from "../services/auth.service.ts";
import {makeAutoObservable, runInAction} from "mobx";
import {ToolUser} from "../models/tooluser.ts";

export class ToolUserStore {
    user: ToolUser | undefined;
    authService: AuthService;

    constructor(authService: AuthService){
        this.authService = authService;
        makeAutoObservable(this)
    }

    async loadUser(){
        try {
            const response = await this.authService.getApiClient().get('/toolusers/profile');
            runInAction(() => {
                this.user = response.data;
            });
        } catch (error) {
            console.error('Failed to load data', error);
        }
    }

    async updateUser(user: ToolUser){
        try {
            await this.authService.getApiClient().put('/toolusers/profile', user);
            runInAction(() => {
                this.user = user;
            });
        } catch (error) {
            console.error('Failed to update user', error);
        }
    }
}