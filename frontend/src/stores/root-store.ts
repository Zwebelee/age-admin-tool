import {TestStore} from "./test-store.ts";
import {createContext, useContext} from "react";
import {makeAutoObservable} from "mobx";

export class RootStore {
    testStore: TestStore;

    get init() {
        // TODO: Test
        return "blabliblu";
    }

    constructor() {
        makeAutoObservable(this);
        this.testStore = new TestStore(this);
    }

}

export const RootStoreContext = createContext<RootStore>({} as RootStore);
export const RootStoreProvider = RootStoreContext.Provider;
export const useRootStore = (): RootStore => useContext(RootStoreContext);