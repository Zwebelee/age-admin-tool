export interface IAGE {
    guid: string;
    name: string;
    alias: string;
    description?: string;
}

export class Age implements IAGE {
    guid: string;
    name: string;
    alias: string;
    description?: string;

    constructor(data: IAGE) {
        this.guid = data.guid;
        this.name = data.name;
        this.alias = data.alias;
        this.description = data.description;

        // TODO: makeAutoObservable(this);
    }
}