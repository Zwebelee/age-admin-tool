import {makeAutoObservable, runInAction} from 'mobx';
import {PermissionsService} from '../services/permissions.service';
import {IPermission} from '../models/permissions';
import {LoggerService} from "../services/logger.service.ts";

export class PermissionsStore {
    permissions: Map<string, IPermission[]> = new Map();
    permissionsService: PermissionsService;
    isLoading: boolean = false;

    constructor(permissionsService: PermissionsService, private logger: LoggerService) {
        this.permissionsService = permissionsService;
        makeAutoObservable(this);
    }

    async loadPermissions(userGuid: string) {
        this.isLoading = true;
        try {
            const permissions = await this.permissionsService.fetchPermissions(userGuid);
            runInAction(() => {
                this.permissions.set(userGuid, permissions);
                this.isLoading = false;

            });
        } catch (error) {
            this.logger.error('Failed to load permissions', error);
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    hasPermission(userGuid: string, permissionName: string): boolean {
        const permissions = this.permissions.get(userGuid) || [];
        return permissions.some(permission => permission.name === permissionName);
    }

    clearPermissionsCache() {
        this.permissionsService.clearPermissionsCache();
    }
}