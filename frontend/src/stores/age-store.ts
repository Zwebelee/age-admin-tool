import { makeObservable, observable, runInAction } from "mobx";
import { Age } from "../models/age.ts";
import {AbstractStore} from "./abstract-store.ts";
import {AuthService} from "../services/auth.service.ts";

export class AgeStore extends AbstractStore<Age> {
    public age: Age | null = null;
    items = observable.map<string, Age>();

    constructor(authService: AuthService) {
        super(authService);
        makeObservable(this, {
            age: observable,
            items: observable,
            status: observable,
        });
        this.initialize();
    }

    async initialize() {
        await this.loadData();
    }

    getEndpoint(): string {
        return '/arcgisenterprise';
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
}