import {AbstractStore} from "./abstract-store.ts";
import {PortalGroup} from "../models/portalgroup.ts";
import {makeObservable, observable} from "mobx";
import {AuthService} from "../services/auth.service.ts";


export class PortalGroupStore extends AbstractStore<PortalGroup> {

    items = observable.map<string, PortalGroup>();

    constructor(authService: AuthService) {
        super(authService);
        makeObservable(this, {
            status: observable,
            items: observable,
            filters: observable
        });
        this.initialize();
    }

    async initialize() {
        await this.loadItems();
    }

    getEndpoint(): string {
        return '/portalgroups';
    }
}
