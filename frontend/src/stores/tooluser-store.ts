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
            const response = await this.authService.getApiClient().get('/toolusers');
            runInAction(() => {
                this.user = response.data;
            });
        } catch (error) {
            console.error('Failed to load data', error);
        }
    }
}