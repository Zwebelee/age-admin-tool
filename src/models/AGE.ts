export interface IAGE {
    guid: string;
    name: string;
}


export class AGE implements IAGE{
    guid: string;
    name: string;

    constructor(data : AGE) {
        this.guid = crypto.randomUUID();
        this.name = data.name;

        // TODO: makeAutoObservable(this);
    }
}