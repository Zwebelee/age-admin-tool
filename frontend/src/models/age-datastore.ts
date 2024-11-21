import {AbstractModel} from "./abstract-models.ts";

export interface AgeDatastoreProps {
    guid: string;
    name: string;
    alias: string;
    type: string;
    ishosted: boolean;
    url: string | null;
    status: string;
    description: string | null;
    capacity_gb: number;
    used_gb: number;
}

export class AgeDataStore extends AbstractModel {
    class: string = 'AgeDataStore';

    guid: string;
    name: string;
    alias: string;
    type: string;
    ishosted: boolean;
    url: string | null;
    status: string;
    description: string | null;
    capacity_gb: number;
    used_gb: number;

    constructor(props: AgeDatastoreProps) {
        super()
        this.guid = props.guid;
        this.name = props.name;
        this.alias = props.alias;
        this.type = props.type;
        this.ishosted = props.ishosted;
        this.url = props.url;
        this.status = props.status;
        this.description = props.description;
        this.capacity_gb = props.capacity_gb;
        this.used_gb = props.used_gb;
    }
}
