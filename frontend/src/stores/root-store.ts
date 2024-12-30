
import {createContext, useContext} from "react";
import {makeAutoObservable} from "mobx";
import {AuthStore} from "./auth-store.ts";
import {AuthService} from "../services/auth.service.ts";
import {AgeStore} from "./age-store.ts";
import {PortaluserStore} from "./portaluser-store.ts";
import {PortalLicenseStore} from "./portallicense-store.ts";
import {AgeDatastoreStore} from "./age-datastore-store.ts";
import {AgeportalStore} from "./age-portal-store.ts";
import {AgeserverStore} from "./age-server-store.ts";
import {AgeWebadaptorStore} from "./age-webadaptor-store.ts";
import {PortalItemStore} from "./portalitem-store.ts";
import {ToolUserStore} from "./tooluser-store.ts";
import {ThemeStore} from "./theme-store.ts";
import {LanguageStore} from "./language-store.ts";
import {LoggerService} from "../services/logger.service.ts";
import {PortalGroupStore} from "./portalgroup-store.ts";

export class RootStore {
    authStore: AuthStore;
    authService: AuthService;
    logService: LoggerService;
    ageStore: AgeStore;
    portalUserStore: PortaluserStore;
    portalLicenseStore: PortalLicenseStore;
    ageDataStoreStore : AgeDatastoreStore;
    agePortalStore: AgeportalStore
    ageServerStore: AgeserverStore
    ageWebAdaptorStore: AgeWebadaptorStore
    portalItemStore: PortalItemStore;
    portalGroupStore: PortalGroupStore;
    toolUserStore : ToolUserStore;
    themeStore: ThemeStore;
    languageStore: LanguageStore;

    get init() {
        // TODO: Handle initialization
        return "blabliblu";
    }

    constructor() {
        makeAutoObservable(this);
        this.authService = new AuthService(this)
        this.authStore = new AuthStore(this.authService);

        this.logService = new LoggerService();

        this.ageStore = new AgeStore(this.authService);
        this.portalUserStore = new PortaluserStore(this.authService);
        this.portalLicenseStore = new PortalLicenseStore(this.authService);
        this.ageDataStoreStore = new AgeDatastoreStore(this.authService)
        this.agePortalStore = new AgeportalStore(this.authService)
        this.ageServerStore = new AgeserverStore(this.authService);
        this.ageWebAdaptorStore = new AgeWebadaptorStore(this.authService)
        this.portalItemStore = new PortalItemStore(this.authService);
        this.portalGroupStore = new PortalGroupStore(this.authService);
        this.toolUserStore = new ToolUserStore(this.authService);
        this.themeStore = new ThemeStore();
        this.languageStore = new LanguageStore(this.toolUserStore);

    }
}

export const RootStoreContext = createContext<RootStore>({} as RootStore);
export const RootStoreProvider = RootStoreContext.Provider;
export const useRootStore = (): RootStore => useContext(RootStoreContext);