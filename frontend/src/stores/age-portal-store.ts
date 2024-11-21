import {AbstractStore} from "./abstract-store.ts";
import {makeObservable, observable} from "mobx";
import {AgePortal} from "../models/age-portal.ts";
import {AuthService} from "../services/auth.service.ts";

export class AgeportalStore extends AbstractStore<AgePortal> {

    items = observable.map<string, AgePortal>();

    constructor(authService: AuthService) {
        super(authService);
        makeObservable(this, {
            status: observable,
            items: observable
        })
        this.initialize();
    }

    async initialize() {
        await this.loadItems();
    }

    getEndpoint(): string {
        return "/ageportals";
    }
}