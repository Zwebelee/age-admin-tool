import {TestEntry} from "../models/test-entry.ts";
import {observable} from "mobx";
import {Age} from "../models/age.ts";

export type ItemType = TestEntry | Age;

export type status = "loading" | "loaded" | "error";

export interface IAbstractStore {
    addItem(item: ItemType | Map<string, ItemType>): void

    get isLoading(): boolean;
    get isLoaded(): boolean;
}

export abstract class AbstractStore implements IAbstractStore {

    /**
     * Loaded items (local store)
     */
    items = observable.map<string, ItemType>();

    status: status = "loading";

    /**
     * TODO: Add more functionality:
     * sort
     * filter
     * status
     * selectedItem
     * ...
     */

    protected constructor() {
    }


    // async loadItems() {
    //     this.status = "loading";
    //     try {
    //         const response = await this.authService.getApiClient().get('/arcgisenterprise');
    //         const data: Age = response.data;
    //         runInAction(() => {
    //             this.age = data;
    //             this.items.set(data.guid, data);
    //             // make a delay
    //             setTimeout(() => {
    //                 this.status = "loaded";
    //                 console.log('lalala loaded');
    //             }, 5000);
    //         });
    //     } catch (error) {
    //         console.error('Failed to load data', error);
    //         this.status = "error";
    //     }
    // }

    /**
     * Add one or multiple items to the store
     * @param item One item or a map with multiple items with ID/GUID as key
     */

    addItem(item: ItemType | Map<string, ItemType>): void {
        // TODO: switch id to guid !!!
        if (item instanceof Map) {
            // multiple items
            this.items.merge(item);
        } else {
            // single item
            if (this.items.has(item.id)){
                // update, no duplicates allowed
                this.items.delete(item.id)
            }
            this.items.set(item.id, item);
        }
        console.log('addItem', item);
    };

    get isLoading(): boolean {
        return this.status === "loading";
    }
    get isLoaded(): boolean {
        return this.status === "loaded";
    }
}
