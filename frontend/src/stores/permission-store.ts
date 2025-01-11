import { makeAutoObservable, runInAction } from 'mobx';
import { PermissionsService } from '../services/permissions.service';
import { IPermission } from '../models/permissions';

export class PermissionsStore {
    permissions: Map<string, IPermission[]> = new Map();
    permissionsService: PermissionsService;
    isLoading: boolean = false;

    constructor(permissionsService: PermissionsService) {
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
            console.error('Failed to load permissions', error);
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    hasPermission(userGuid: string, permissionName: string): boolean {
        const permissions = this.permissions.get(userGuid) || [];
        return permissions.some(permission => permission.name === permissionName);
    }
}