import {PortalItem} from "../models/portalitem.ts";
import {AbstractStore} from "./abstract-store.ts";
import {makeObservable, observable} from "mobx";
import {AuthService} from "../services/auth.service.ts";

export class PortalItemStore extends AbstractStore<PortalItem> {

    items = observable.map<string, PortalItem>();

    constructor(authService: AuthService) {
        super(authService);
        makeObservable(this,{
            status: observable,
            items: observable
        })
        this.initialize();
    }

    async initialize() {
        await this.loadItems();
    }

    getEndpoint(): string {
        return "/portalitems";
    }
}