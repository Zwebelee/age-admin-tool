import {TestEntry} from "../models/test-entry.ts";
import {observable} from "mobx";

export type ItemType = TestEntry

export interface IAbstractStore {
    addItem(item: ItemType | Map<string, ItemType>): void
}

export abstract class AbstractStore implements IAbstractStore {

    /**
     * Loaded items (local store)
     */
    items = observable.map<string, ItemType>();

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
}
