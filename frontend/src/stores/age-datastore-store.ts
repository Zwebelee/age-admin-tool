import {AbstractStore} from "./abstract-store.ts";
import {AgeDataStore} from "../models/age-datastore.ts";
import {makeObservable, observable} from "mobx";
import {AuthService} from "../services/auth.service.ts";


export class AgeDatastoreStore extends AbstractStore<AgeDataStore> {

    items = observable.map<string, AgeDataStore>();

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
        return "/agedatastores";
    }
}