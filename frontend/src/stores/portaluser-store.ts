import {makeObservable, observable, runInAction} from "mobx";
import {AbstractStore} from "./abstract-store.ts";
import {PortalUser} from "../models/portaluser.ts";
import {AuthService} from "../services/auth.service.ts";
import {PortalUserRoleFilter} from "../filters/portaluser/portaluser-role-filter.ts";
import {PortalUserStatusFilter} from "../filters/portaluser/portaluser-status-filter.ts";
import {PortalUserLicenseFilter} from "../filters/portaluser/portaluser-license-filter.ts";
import {PortalUserItemCountFilter} from "../filters/portaluser/portaluser-itemcount-filter.ts";
import {PortalUserStorageFilter} from "../filters/portaluser/portaluser-storage-filter.ts";
import {PortalUserLastLoginFilter} from "../filters/portaluser/portaluser-lastlogin-filter.ts";


export class PortaluserStore extends AbstractStore<PortalUser> {

    items = observable.map<string, PortalUser>();

    constructor(authService: AuthService) {
        super(authService);
        makeObservable(this, {
            status: observable,
            items: observable,
            filters: observable
        });
    }

    async initialize() {
        await this.loadData();
    }

    getEndpoint(): string {
        return '/portalusers';
    }

    get visibleItems(): PortalUser[] {
        let filtered = [...this.items.values()];
        if (this.filters && this.filters.length > 0) {
            filtered = PortalUserRoleFilter.apply(filtered, this.filters);
            filtered = PortalUserStatusFilter.apply(filtered, this.filters);
            filtered = PortalUserLicenseFilter.apply(filtered, this.filters);
            filtered = PortalUserItemCountFilter.apply(filtered, this.filters);
            filtered = PortalUserStorageFilter.apply(filtered, this.filters);
            filtered = PortalUserLastLoginFilter.apply(filtered, this.filters);
        }
        return [...filtered];
    }

    async loadData() {
        this.status = "loading";
        try {
            const response = await this.authService.getApiClient().get(this.getEndpoint());
            const data: PortalUser[] = response.data;
            runInAction(() => {
                data.forEach(portaluser => {
                    this.items.set(portaluser.guid, portaluser);
                })
                // this.items.set(data.guid, data);
                setTimeout(() => {
                    this.status = "loaded";
                }, 5000);
            });
        } catch (error) {
            this.logger.error('Failed to load data', error);
            this.status = "error";
        }
    }
}