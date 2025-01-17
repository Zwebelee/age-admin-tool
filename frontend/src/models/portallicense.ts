import {AbstractModel} from "./abstract-models.ts";

export interface PortalLicenseProps {
    guid: string;
    id: string;
    name: string;
    description?: string;
    level: string;
    state: string;
    maxusers: number;
    currentusers: number;
}

export class PortalLicense extends AbstractModel {
    class: string = 'PortalLicense';
    guid: string;
    id: string;
    name: string;
    description?: string;
    level: string;
    state: string;
    maxusers: number;
    currentusers: number;

    constructor(props: PortalLicenseProps) {
        super();
        this.guid = props.guid;
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.level = props.level;
        this.state = props.state;
        this.maxusers = props.maxusers;
        this.currentusers = props.currentusers;
    }
}