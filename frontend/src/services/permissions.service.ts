import {IPermission} from "../models/permissions.ts";


export class PermissionsService {
    private permissionsCache: Map<string, IPermission[]> = new Map();

    async fetchPermissions(userGuid: string): Promise<IPermission[]> {
        if (!this.permissionsCache.has(userGuid)) {
            //TODO: (A) fetch check url
            const response = await fetch(`/api/users/${userGuid}/permissions`);
            const permissions = await response.json();
            this.permissionsCache.set(userGuid, permissions);
        }
        return this.permissionsCache.get(userGuid) || [];
    }

    async hasPermission(userGuid: string, permissionName: string): Promise<boolean> {
        const permissions = await this.fetchPermissions(userGuid);
        return permissions.some(permission => permission.name === permissionName);
    }
}
