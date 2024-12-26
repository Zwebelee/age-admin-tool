import {makeObservable, observable, runInAction} from "mobx";
import {AbstractStore} from "./abstract-store.ts";
import {PortalUser} from "../models/portaluser.ts";
import {AuthService} from "../services/auth.service.ts";
import {PortalUserRoleFilter} from "../filters/portaluser/portaluser-role-filter.ts";
import {PortalUserStatusFilter} from "../filters/portaluser/portaluser-status-filter.ts";
import {GenericItemFilter} from "../filters/generic-item-filter.ts";


export class PortaluserStore extends AbstractStore<PortalUser> {

    items = observable.map<string, PortalUser>();

    constructor(authService: AuthService){
        super(authService);
        makeObservable(this, {
            status: observable,
            items: observable,
            filters: observable
            //TODO: add visibleItems, filters, addItem, removeItem, sync items,...
        });
        this.initialize(); //TODO: load later! not at start, e.g on user/route
    }
    async initialize() {
        await this.loadData();
    }

    getEndpoint(): string {
        return '/portallicenses'; //TODO: wrong endpoint !!!!
    }

    get visibleItems(): PortalUser[] {
        let filtered = [...this.items.values()];
        if(this.filters && this.filters.length > 0) {
            filtered = PortalUserRoleFilter.apply(filtered, this.filters);
            filtered = PortalUserStatusFilter.apply(filtered, this.filters);
            filtered = GenericItemFilter.apply(filtered, this.filters, 'access');
        }
        return [...filtered];
    }

    async loadData() {
        this.status = "loading";
        try {
            const response = await this.authService.getApiClient().get('/portalusers');
            const data: PortalUser[]= response.data;
            runInAction(() => {
                data.forEach(portaluser => {
                    this.items.set(portaluser.guid, portaluser);
                })
                // this.items.set(data.guid, data);
                setTimeout(() => {
                    this.status = "loaded";
                    console.log('lalala loaded');
                }, 5000);
            });
        } catch (error) {
            console.error('Failed to load data', error);
            this.status = "error";
        }
    }
}