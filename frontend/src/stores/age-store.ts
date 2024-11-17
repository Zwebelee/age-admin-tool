import { makeObservable, observable, action, runInAction } from "mobx";
import { Age } from "../models/age.ts";
import { AbstractStore } from "./abstract-store.ts";
import {AuthService} from "../services/auth.service.ts";

export class AgeStore extends AbstractStore {
    public age: Age | null = null;
    private authService: AuthService;

    items = observable.map<string, Age>();

    constructor(authService: AuthService) {
        super();
        this.authService = authService;
        makeObservable(this, {
            age: observable,
            items: observable,
            loadData: action,
            postData: action,
            updateData: action,
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
            const response = await this.authService.getApiClient().get('/arcgisenterprise');
            const data: Age = response.data;
            runInAction(() => {
                this.age = data;
                this.items.set(data.guid, data);
                setTimeout(() => {
                    this.status = "loaded";
                    console.log('lalala loaded');
                }, 5000);
            });
        } catch (error) {
            console.error('Failed to load data', error);
            this.status = "error";
        }
    }




    async postData(age: Age) {
        try {
            const response = await fetch('http://localhost:5001/ages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(age),
            });
            const newAge: Age = await response.json();
            runInAction(() => {
                this.ages.push(newAge);
                this.items.set(newAge.guid, newAge);
            });
        } catch (error) {
            console.error('Failed to post data', error);
        }
    }

    async updateData(guid: string, updatedData: Partial<Age>) {
        try {
            const response = await fetch(`http://localhost:5001/ages/${guid}`, {
                method: 'PUT',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error(`Failed to update data: ${response.statusText}`);
            }
            const updatedAge: Age = await response.json();
            runInAction(() => {
                this.ages = this.ages.map(age => age.guid === guid ? updatedAge : age);
                this.items.set(guid, updatedAge);
            });
        } catch (error) {
            console.error('Failed to update data', error);
        }
    }
}