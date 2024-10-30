export interface IAGE {
    guid: string;
    name: string;
}


export class Age implements IAGE{
    guid: string;
    name: string;

    constructor(data : IAGE) {
        this.guid = crypto.randomUUID();
        this.name = data.name;

        // TODO: makeAutoObservable(this);
    }
}