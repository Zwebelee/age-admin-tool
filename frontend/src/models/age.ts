import {AbstractModel} from "./abstract-models.ts";

export interface IAGE {
    guid: string;
    name: string;
    alias: string;
    description?: string;
}

export class Age extends AbstractModel {
    class: string = 'Age';

    guid: string;
    name: string;
    alias: string;
    description?: string;

    constructor(data: IAGE) {
        super();
        this.guid = data.guid;
        this.name = data.name;
        this.alias = data.alias;
        this.description = data.description;

        // TODO: makeAutoObservable(this);
    }
}