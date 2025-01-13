export interface IToolUserRole {
    guid: string;
    name: string;
}

export class ToolUserRole {
    guid: string;
    name: string;

    constructor(data: IToolUserRole) {
        this.guid = data.guid;
        this.name = data.name;
    }

    fromJSON(data: IToolUserRole): void {
        this.guid = data.guid;
        this.name = data.name;
    }

    toJSON(): IToolUserRole {
        return {
            guid: this.guid,
            name: this.name
        }
    }

}