import { makeObservable, observable, action } from "mobx";
import {AbstractStore} from "./abstract-store.ts";
import { PortalLicense } from "../models/portallicense.ts";
import { AuthService } from "../services/auth.service.ts";

export class PortalLicenseStore extends AbstractStore<PortalLicense> {
    public portalLicense: PortalLicense | null = null;

    items = observable.map<string, PortalLicense>();

    constructor(authService: AuthService) {
        super(authService);
        makeObservable(this, {
            portalLicense: observable,
            items: observable,
            loadData: action,
            status: observable,
        });
        this.initialize();
    }

    async initialize() {
        await this.loadData();
    }

    getEndpoint(): string {
        return '/portallicenses';
    }

    async loadData() {
        await this.loadItems();
    }
}