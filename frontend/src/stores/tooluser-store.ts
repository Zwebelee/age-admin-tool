import {AuthService} from "../services/auth.service.ts";
import {makeAutoObservable, runInAction} from "mobx";
import {ToolUser, ToolUserWithPassword} from "../models/tooluser.ts";
import {PermissionsService} from "../services/permissions.service.ts";


export class ToolUserStore {
    user: ToolUser | undefined;
    users: ToolUser[] = [];
    authService: AuthService;
    permissionsService: PermissionsService;
    userLoaded: boolean = false;

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
                this.userLoaded = true;
            });
        } catch (error) {
            console.error('Failed to load data', error);
        }
    }

    async loadUsers() {
        //TODO: solve better!
        try {
            const response = await this.authService.getApiClient().get('/toolusers');
            const data: ToolUser[] = response.data.map((user: any) => new ToolUser(user));
            runInAction(() => {
                this.users = data;
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
            await this.authService.getApiClient().post('/toolusers', user.toJSON());
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

    async getToolUserRoles(){
        try {
            return await this.authService.getApiClient().get('/toolroles');
        } catch (error) {
            console.error('Failed to load data', error);
        }
    }
}
