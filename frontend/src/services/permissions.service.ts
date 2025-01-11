import {IPermission} from "../models/permissions.ts";
import axios, {AxiosInstance} from "axios";
import {AuthStore} from "../stores/auth-store.ts";


export class PermissionsService {
    private permissionsCache: Map<string, IPermission[]> = new Map();
    private readonly apiClient: AxiosInstance;

    constructor(private authStore: AuthStore, ) {
        this.apiClient = axios.create({
            baseURL: "http://localhost:5001",
            withCredentials: true, // Allow cookies
        });
    }


    async fetchPermissions(userGuid: string): Promise<IPermission[]> {
        if (!this.permissionsCache.has(userGuid)) {
            if (this.authStore.accessToken){
            const response = await this.apiClient.get(`/toolusers/profile/permissions`, {
                headers: {
                    'Authorization': `Bearer ${this.authStore.accessToken}`
                }
            });
            const permissions = response.data;
            this.permissionsCache.set(userGuid, permissions);
            }
        }
        return this.permissionsCache.get(userGuid) || [];
    }

    async hasPermission(userGuid: string, permissionName: string): Promise<boolean> {
        const permissions = await this.fetchPermissions(userGuid);
        return permissions.some(permission => permission.name === permissionName);
    }

    clearPermissionsCache(){
        this.permissionsCache.clear();
    }
}
