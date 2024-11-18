import {observable, ObservableMap, runInAction} from "mobx";
import {Age} from "../models/age.ts";
import {PortalUser} from "../models/portaluser.ts";
import {AuthService} from "../services/auth.service.ts";
import {PortalLicense} from "../models/portallicense.ts";

export type ItemType = Age |PortalUser | PortalLicense;

export type status = "loading" | "loaded" | "error";

export interface IAbstractStore {
    loadItems(): Promise<void>
    getEndpoint(): string;

    get isLoading(): boolean;
    get isLoaded(): boolean;
    get isError(): boolean;
}

export abstract class AbstractStore<T> implements IAbstractStore {

    /**
     * TODO: Add more functionality:
     * sort
     * filter
     * status
     * selectedItem
     * ...
     */

    /**
     * Loaded items (local store)
     */
    // items = observable.map<string, ItemType>();
    items: ObservableMap<string, T> = observable.map<string, T>();


    status: status = "loading";
    protected authService: AuthService;

    abstract getEndpoint(): string;


    protected constructor(autService: AuthService) {
        this.authService = autService;
    }

    async loadItems(){
        this.status = "loading";
        try {
            const response = await this.authService.getApiClient().get(this.getEndpoint());
            const data: ItemType[] = response.data;
            data.forEach(item => {
                this.items.set(item.guid, item as T);
            });
            setTimeout(() => {
                this.status = "loaded";
                console.log('loaded');
                //TODO: REMOVE LATER !!! JUST TO SEE THE LOADED :)
            }, 5000);
        } catch (error) {
            console.error('Failed to load data', error);
            this.status = "error";
        }
    }

    async addItem(item: ItemType) {
        try {
            const response = await this.authService.getApiClient().post(this.getEndpoint(), item);
            const newItem = response.data;
            runInAction(() => {
                this.items.set(newItem.guid, newItem);
            });
        } catch (error) {
            console.error('Failed to add item', error);
        }
    }


    get isLoading(): boolean {
        return this.status === "loading";
    }
    get isLoaded(): boolean {
        return this.status === "loaded";
    }

    get isError(): boolean {
        return this.status === "error";
    }
}
