
import {createContext, useContext} from "react";
import {makeAutoObservable} from "mobx";
import {AuthStore} from "./auth-store.ts";
import {AuthService} from "../services/auth.service.ts";
import {AgeStore} from "./age-store.ts";
import {PortaluserStore} from "./portaluser-store.ts";
import {PortalLicenseStore} from "./portallicense-store.ts";
import {AgeDatastoreStoreStore} from "./age-datastore-store.ts";
import {AgeportalStore} from "./age-portal-store.ts";
import {AgeserverStore} from "./age-server-store.ts";
import {AgewebadaptorStore} from "./age-webadaptor-store.ts";
import {PortalItemStore} from "./portal-store.ts";
import {ToolUserStore} from "./tooluser-store.ts";
import {ThemeStore} from "./theme-store.ts";

export class RootStore {
    authStore: AuthStore;
    authService: AuthService;
    ageStore: AgeStore;
    portalUserStore: PortaluserStore;
    portalLicenseStore: PortalLicenseStore;
    ageDataStoreStore : AgeDatastoreStoreStore;
    agePortalStore: AgeportalStore
    ageServerStore: AgeserverStore
    ageWebAdaptorStore: AgewebadaptorStore
    portalItemStore: PortalItemStore;
    toolUserStore : ToolUserStore;
    themeStore: ThemeStore;

    get init() {
        // TODO: Test
        return "blabliblu";
    }

    constructor() {
        makeAutoObservable(this);
        this.authStore = new AuthStore(this);
        this.authService = new AuthService(this)

        this.ageStore = new AgeStore(this.authService);
        this.portalUserStore = new PortaluserStore(this.authService);
        this.portalLicenseStore = new PortalLicenseStore(this.authService);
        this.ageDataStoreStore = new AgeDatastoreStoreStore(this.authService)
        this.agePortalStore = new AgeportalStore(this.authService)
        this.ageServerStore = new AgeserverStore(this.authService);
        this.ageWebAdaptorStore = new AgewebadaptorStore(this.authService)
        this.portalItemStore = new PortalItemStore(this.authService);
        this.toolUserStore = new ToolUserStore(this.authService);
        this.themeStore = new ThemeStore();
    }
}

export const RootStoreContext = createContext<RootStore>({} as RootStore);
export const RootStoreProvider = RootStoreContext.Provider;
export const useRootStore = (): RootStore => useContext(RootStoreContext);