export interface IPortalLicense {
    guid: string;
    id: string;
    name: string;
    description?: string;
    level: string;
    state: string;
    maxusers: number;
    currentusers: number;
}

export class PortalLicense implements IPortalLicense {
    guid: string;
    id: string;
    name: string;
    description?: string;
    level: string;
    state: string;
    maxusers: number;
    currentusers: number;

    constructor(data: IPortalLicense) {
        this.guid = crypto.randomUUID();
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.level = data.level;
        this.state = data.state;
        this.maxusers = data.maxusers;
        this.currentusers = data.currentusers;
    }

}

