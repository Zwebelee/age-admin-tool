import { makeAutoObservable } from "mobx";
import {RootStore} from "./root-store.ts";

export class TestStore {
    public testCount: number = 0;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    increment() {
        console.log('increment');
        this.testCount ++;
    }

    decrement() {
        this.testCount--;
    }
}

