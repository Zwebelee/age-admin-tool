import { makeObservable, observable, action, runInAction } from "mobx";
import { AbstractStore } from "./abstract-store.ts";
import { PortalLicense } from "../models/portallicense.ts";
import { AuthService } from "../services/auth.service.ts";

export class PortalLicenseStore extends AbstractStore {
    public portalLicense: PortalLicense | null = null;
    private authService: AuthService;

    items = observable.map<string, PortalLicense>();

    constructor(authService: AuthService) {
        super();
        this.authService = authService;
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

    async loadData() {
        this.status = "loading";
        try {
            const response = await this.authService.getApiClient().get('/portallicenses');
            const data: PortalLicense[] = response.data;
            runInAction(() => {
                data.forEach(portalLicense => {
                    this.items.set(portalLicense.guid, portalLicense);
                });
                setTimeout(() => {
                    this.status = "loaded";
                    console.log('Portal licenses loaded');
                    console.log(this.items);
                }, 5000);
            });
        } catch (error) {
            console.error('Failed to load data', error);
            this.status = "error";
        }
    }
}