import {TestStore} from "./test-store.ts";
import {createContext, useContext} from "react";
import {makeAutoObservable} from "mobx";
import {AuthStore} from "./auth-store.ts";
import {AuthService} from "../services/auth.service.ts";

export class RootStore {
    testStore: TestStore;
    authStore: AuthStore;
    authService: AuthService;

    get init() {
        // TODO: Test
        return "blabliblu";
    }

    constructor() {
        makeAutoObservable(this);
        this.testStore = new TestStore(this);
        this.authStore = new AuthStore(this);

        this.authService = new AuthService(this)
    }

}

export const RootStoreContext = createContext<RootStore>({} as RootStore);
export const RootStoreProvider = RootStoreContext.Provider;
export const useRootStore = (): RootStore => useContext(RootStoreContext);