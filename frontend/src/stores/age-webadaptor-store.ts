import {AbstractStore} from "./abstract-store.ts";
import {AgeWebAdaptor} from "../models/age-webadaptor.ts";
import {makeObservable, observable} from "mobx";
import {AuthService} from "../services/auth.service.ts";

export class AgeWebadaptorStore extends AbstractStore<AgeWebAdaptor> {

    items = observable.map<string, AgeWebAdaptor>();

    constructor(authService: AuthService) {
        super(authService);
        makeObservable(this, {
            status: observable,
            items: observable
        });
    }

    async initialize() {
        await this.loadItems();
    }

    getEndpoint(): string {
        return "/agewebadaptors";
    }
}