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
import {TaskStore} from "./task-store.ts";
import {TaskRuleStore} from "./task-rule-store.ts";
import {TaskCommentStore} from "./task-comment-store.ts";

export class RootStore {
    // init stores
    authStore: AuthStore;
    authService: AuthService;
    logService: LoggerService;
    themeStore: ThemeStore;
    languageStore: LanguageStore;

    ageStore: AgeStore;
    portalUserStore: PortaluserStore;
    portalLicenseStore: PortalLicenseStore;
    ageDataStoreStore: AgeDatastoreStore;
    agePortalStore: AgeportalStore
    ageServerStore: AgeserverStore
    ageWebAdaptorStore: AgeWebadaptorStore
    portalItemStore: PortalItemStore;
    portalGroupStore: PortalGroupStore;
    toolUserStore: ToolUserStore;
    taskStore: TaskStore;
    taskRuleStore: TaskRuleStore;
    taskCommentStore: TaskCommentStore;

    get init() {
        // TODO: Handle initialization
        return true;
    }

    constructor() {
        makeAutoObservable(this);
        this.logService = LoggerService.getInstance();

        this.authService = new AuthService(this)
        this.authStore = new AuthStore(this, this.authService, this.logService);

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
        this.taskStore = new TaskStore(this.authService);
        this.taskRuleStore = new TaskRuleStore(this.authService);
        this.taskCommentStore = new TaskCommentStore(this.authService);
    }

    initializeStoresAfterLogin(){
        // TODO: solve better, Lazy-load stores - hooks for specific data on demand in specific routes where data
        //  is actually needed
        // private loadStore() {
        //     return this._stores[storeName];
        // }
        //
        // get ageStore() {
        //     return this.loadStore();
        // }

        this.ageStore.initialize().then();
        this.portalUserStore.initialize().then();
        this.portalLicenseStore.initialize().then();
        this.ageDataStoreStore.initialize().then();
        this.agePortalStore.initialize().then();
        this.ageServerStore.initialize().then();
        this.ageWebAdaptorStore.initialize().then();
        this.portalItemStore.initialize().then();
        this.portalGroupStore.initialize().then();
        this.toolUserStore.loadUser().then();
        this.taskStore.initialize().then();
        this.taskRuleStore.initialize().then();
        this.taskCommentStore.initialize().then();
    }
}

export const RootStoreContext = createContext<RootStore>({} as RootStore);
export const RootStoreProvider = RootStoreContext.Provider;
export const useRootStore = (): RootStore => useContext(RootStoreContext);