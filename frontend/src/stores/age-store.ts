import {makeObservable, observable, runInAction} from "mobx";
import {Age} from "../models/age.ts";
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
    }

    async initialize() {
        await this.loadData();
    }

    getEndpoint(): string {
        return '/arcgisenterprises';
    }

    async loadData() {
        this.status = "loading";
        try {
            const response = await this.authService.getApiClient().get(this.getEndpoint());
            const data: Age = response.data[0]; //only one single AGE supported
            runInAction(() => {
                this.age = data;
                this.items.set(data.guid, data);
                this.status = "loaded";
            });
        } catch (error) {
            console.error('Failed to load data', error);
            this.status = "error";
        }
    }
}