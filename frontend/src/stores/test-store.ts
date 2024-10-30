import {runInAction, computed, observable, makeObservable, action} from "mobx";
import { RootStore } from "./root-store.ts";
import { TestEntry } from "../models/test-entry.ts";
import {AbstractStore} from "./abstract-store.ts";

export class TestStore extends AbstractStore {
    public testCount: number = 0;
    public testEntries: TestEntry[] = [];

    items = observable.map<string, TestEntry>();

    constructor(private rootStore: RootStore) {
        super();
        makeObservable(this, {
            testCount: observable,
            testEntries: observable,
            items: observable,
            loadData: action,
            postData: action,
            increment: action,
            decrement: action,
            latestTestEntry: computed
        });
        this.initialize();
    }

    async initialize() {
        await this.loadData();
        console.log('debug items:', this.items);

    }

    //TODO: WIP
    async loadData() {
        try {
            const response = await fetch('http://localhost:5001/tests');
            const data: TestEntry[] = await response.json();
            runInAction(() => {
                this.testEntries = data;
                this.items = observable.map<string, TestEntry>(data.map((entry) => [entry.id.toString(), entry]));
            });
        } catch (error) {
            console.error('Failed to load data', error);
        }
    }

    async postData(nr: number) {
        try {
            const response = await fetch('http://localhost:5001/tests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nr }),
            });
            const newEntry: TestEntry = await response.json();
            console.log('newEntry:', newEntry);
            runInAction(() => {
                this.testEntries.push(newEntry);
            });
        } catch (error) {
            console.error('Failed to post data', error);
        }
    }

    increment() {
        console.log('increment');
        this.testCount++;
    }

    decrement() {
        console.log('decrement');
        this.testCount--;
    }

    get latestTestEntry(): TestEntry | undefined {
        return this.testEntries[this.testEntries.length - 1];
    }
}