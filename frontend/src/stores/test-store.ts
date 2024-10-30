import { makeAutoObservable,runInAction } from "mobx";
import {RootStore} from "./root-store.ts";


export class TestStore {
    public testCount: number = 0;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
        this.loadData();
    }

    async loadData() {
        try {
            const response = await fetch('http://localhost:5001/tests');
            const data = await response.json();
            runInAction(() => {
                console.log('data', data);
                // this.testCount = data.testCount;
            });
        } catch (error) {
            console.error('Failed to load data', error);
        }
    }
    async postData(nr: number) {
        try {
            const response = await fetch('http://localhost:5001/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({nr }),
            });
            const data = await response.json();
            console.log('Post response data:', data);
        } catch (error) {
            console.error('Failed to post data', error);
        }}

    increment() {
        console.log('increment');
        this.testCount ++;
        this.postData(this.testCount);
    }

    decrement() {
        this.testCount--;
    }
}

