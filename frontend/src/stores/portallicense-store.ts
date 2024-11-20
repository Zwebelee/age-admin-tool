import {makeObservable, observable, action, computed} from "mobx";
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
            // visibleItems: computed, //TODO: remove if it works within abstracts-store
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

    get visibleItems(): PortalLicense[] {
        let filtered = [...this.items.values()];
        // only take the first 2 items
        return [...filtered].slice(0, 2);
        // return [...filtered]
    }
}