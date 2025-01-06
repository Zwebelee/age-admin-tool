import { AbstractStore } from "./abstract-store.ts";
import { makeObservable, observable } from "mobx";
import {AgeServer} from "../models/age-server.ts";
import {AuthService} from "../services/auth.service.ts";

export class AgeserverStore extends AbstractStore<AgeServer> {

    items = observable.map<string, AgeServer>();

    constructor(authService: AuthService) {
        super(authService);
        makeObservable(this,{
            status: observable,
            items: observable
        });
    }

    async initialize() {
        await this.loadItems();
    }

    getEndpoint(): string {
        return "/ageservers";
    }
}