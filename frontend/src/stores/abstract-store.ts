import {action, computed, makeObservable, observable, ObservableMap, runInAction} from "mobx";
import {Age} from "../models/age.ts";
import {PortalUser} from "../models/portaluser.ts";
import {AuthService} from "../services/auth.service.ts";
import {PortalLicense} from "../models/portallicense.ts";
import {AgePortal} from "../models/age-portal.ts";
import {AgeDataStore} from "../models/age-datastore.ts";
import {AgeServer} from "../models/age-server.ts";
import {AgeWebAdaptor} from "../models/age-webadaptor.ts";
import {AgeStore} from "./age-store.ts";
import {AgeDatastoreStore} from "./age-datastore-store.ts";
import {AgeportalStore} from "./age-portal-store.ts";
import {AgeserverStore} from "./age-server-store.ts";
import {AgeWebadaptorStore} from "./age-webadaptor-store.ts";
import {PortalLicenseStore} from "./portallicense-store.ts";
import {PortalItem} from "../models/portalitem.ts";
import {PortaluserStore} from "./portaluser-store.ts";
import {PortalItemStore} from "./portalitem-store.ts";
import {PortalGroupStore} from "./portalgroup-store.ts";
import {PortalGroup} from "../models/portalgroup.ts";
import {LoggerService} from "../services/logger.service.ts";
import {Task} from "../models/task.ts";

//TODO: Improve - lift to generics ItemType<T> and StoreType<T> and use in AbstractStore
export type ItemType =
    Age
    | AgePortal
    | AgeDataStore
    | AgeServer
    | AgeWebAdaptor
    | PortalUser
    | PortalLicense
    | PortalItem
    | PortalGroup
    | Task;
export type StoreType =
    AgeStore
    | AgeDatastoreStore
    | AgeportalStore
    | AgeserverStore
    | AgeWebadaptorStore
    | PortalLicenseStore
    | PortaluserStore
    | PortalItemStore
    | PortalGroupStore;

export type status = "loading" | "loaded" | "error";

export interface IAbstractStore {
    filters: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any; //TODO use ItemType<T> as soon as ready
    loadItems(): Promise<void>

    getEndpoint(): string;

    clearFilters(): void;

    clearFilter(filter: string): void;

    get isLoading(): boolean;

    get isLoaded(): boolean;

    get isError(): boolean;
}

export abstract class AbstractStore<T> implements IAbstractStore {
    items: ObservableMap<string, T> = observable.map<string, T>();
    selectedItem: T | null = null;
    status: status = "loading";
    filters: string[] = [];
    protected authService: AuthService;
    protected logger: LoggerService = LoggerService.getInstance();

    abstract getEndpoint(): string;


    protected constructor(autService: AuthService) {
        this.authService = autService;
        makeObservable(this, {
            visibleItems: computed,
            selectedItem: observable,
            setSelectedItem: action,
            resetSelectedItem: action
        })
    }

    get visibleItems(): T[] {
        return [...this.items.values()];
    }

    setSelectedItem(item: T | null) {
        this.selectedItem = item;
    }

    resetSelectedItem() {
        this.selectedItem = null;
    }

    async loadItems() {
        this.status = "loading";
        try {
            const response = await this.authService.getApiClient().get(this.getEndpoint());
            const data: ItemType[] = response.data;
            data.forEach(item => {
                //TODO: implement properly! should create a new Item of type T! Not just a Dict-Object
                // along the line "this.items.set(item.guid, new T(item) as T);" but with constructor function
                this.items.set(item.guid, item as T);
            });
            this.status = "loaded";
        } catch (error) {
            this.logger.error('Failed to load data', error);
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
            this.logger.error('Failed to add item', error);
        }
    }

    async updateItem(item: ItemType) {
        try {
            const response = await this.authService.getApiClient().put(`${this.getEndpoint()}/${item.guid}`, item);
            const updatedItem = response.data;
            runInAction(() => {
                this.items.set(updatedItem.guid, updatedItem);
            });
        } catch (error) {
            this.logger.error('Failed to update item', error);
        }
    }

    async deleteItem(item: ItemType) {
        try {
            await this.authService.getApiClient().delete(`${this.getEndpoint()}/${item.guid}`);
            runInAction(() => {
                this.items.delete(item.guid);
            });
        } catch (error) {
            this.logger.error('Failed to delete item', error);
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

    clearFilters(): void {
        this.filters = [];
    }

    clearFilter(filter: string): void {
        // remove all filters starting with "filter-"
        const regex = new RegExp(`^${filter}-.*$`);
        this.filters = this.filters.filter(f => !regex.test(f));
    }
}
