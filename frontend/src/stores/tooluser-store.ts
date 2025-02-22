import {AuthService} from "../services/auth.service.ts";
import {makeAutoObservable, runInAction} from "mobx";
import {IToolUser, ToolUser, ToolUserWithPassword} from "../models/tooluser.ts";
import {PermissionsService} from "../services/permissions.service.ts";
import {ToolUserRole} from "../models/tooluserrole.ts";
import {LoggerService} from "../services/logger.service.ts";


export class ToolUserStore {
    user: ToolUser | undefined = undefined;
    users: ToolUser[] = [];
    authService: AuthService;
    permissionsService: PermissionsService;
    userLoaded: boolean = false;
    logger: LoggerService;

    constructor(authService: AuthService, permissionsService: PermissionsService) {
        this.authService = authService;
        this.permissionsService = permissionsService;
        this.logger = LoggerService.getInstance();
        makeAutoObservable(this)
    }

    async loadUser() {
        try {
            const response = await this.authService.getApiClient().get('/toolusers/profile');
            runInAction(() => {
                this.user = new ToolUser(response.data);
                this.userLoaded = true;
            });
        } catch (error) {
            this.logger.error('Failed to load data', error);
        }
    }

    async loadUsers() {
        //TODO: Overthink handling of "all Users"
        try {
            const response = await this.authService.getApiClient().get('/toolusers');
            const data: ToolUser[] = response.data.map((user: IToolUser) => new ToolUser(user));
            runInAction(() => {
                this.users = data;
            });
        } catch (error) {
            this.logger.error('Failed to load data', error);
        }
    }

    async updateUser(user: ToolUser) {
        try {
            const userData = user.toJSON();
            const response = await this.authService.getApiClient().put('/toolusers/profile', userData);
            runInAction(() => {
                this.user = new ToolUser(response.data);
            });
        } catch (error) {
            this.logger.error('Failed to update user', error);
        }
    }

    async addUser(user: ToolUserWithPassword) {
        try {
            await this.authService.getApiClient().post('/toolusers', user.toJSON());
        } catch (error) {
            this.logger.error('Failed to add user', error);
        }
    }

    async hasPermission(permissionName: string): Promise<boolean> {
        if (this.user) {
            return this.permissionsService.hasPermission(this.user.guid, permissionName);
        }
        return false;
    }

    async getToolUserRoles() {
        try {
            return await this.authService.getApiClient().get('/toolroles');
        } catch (error) {
            this.logger.error('Failed to load data', error);
        }
    }

    async switchActiveRole(newActiveRole: ToolUserRole): Promise<void> {
        if (this.user) {
            if (newActiveRole) {
                this.user.activeRole = newActiveRole;
                await this.updateUser(this.user);
            }
        }
    }
}
