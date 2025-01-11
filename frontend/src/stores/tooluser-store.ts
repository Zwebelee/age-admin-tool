import {AuthService} from "../services/auth.service.ts";
import {makeAutoObservable, runInAction} from "mobx";
import {ToolUser} from "../models/tooluser.ts";
import {PermissionsService} from "../services/permissions.service.ts";

interface ToolUserWithPassword extends ToolUser {
    password: string;
}

export class ToolUserStore {
    user: ToolUser | undefined;
    authService: AuthService;
    permissionsService: PermissionsService;

    constructor(authService: AuthService, permissionsService: PermissionsService) {
        this.authService = authService;
        this.permissionsService = permissionsService;
        makeAutoObservable(this)
    }

    async loadUser() {
        try {
            const response = await this.authService.getApiClient().get('/toolusers/profile');
            runInAction(() => {
                this.user = response.data;
            });
        } catch (error) {
            console.error('Failed to load data', error);
        }
    }

    async updateUser(user: ToolUser) {
        try {
            await this.authService.getApiClient().put('/toolusers/profile', user);
            runInAction(() => {
                this.user = user;
            });
        } catch (error) {
            console.error('Failed to update user', error);
        }
    }

    async addUser(user: ToolUserWithPassword) {
        try {
            await this.authService.getApiClient().post('/toolusers', user);
        } catch (error) {
            console.error('Failed to add user', error);
        }
    }

    async hasPermission(permissionName: string): Promise<boolean> {
        if (this.user) {
            return this.permissionsService.hasPermission(this.user.guid, permissionName);
        }
        return false;
    }
}