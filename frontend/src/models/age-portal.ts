import {AbstractModel} from "./abstract-models.ts";

interface AgePortalProps {
    guid: string;
    name: string;
    alias: string;
    description?: string;
    url?: string;
    type?: string;
    ishosted: boolean;
    status: string;
}

export class AgePortal extends AbstractModel {
    class: string = 'AgePortal';
    guid: string;
    name: string;
    alias: string;
    description?: string;
    url?: string;
    type?: string;
    ishosted: boolean;
    status: string;

    constructor(props: AgePortalProps) {
        super()
        this.guid = props.guid;
        this.name = props.name;
        this.alias = props.alias;
        this.description = props.description;
        this.url = props.url;
        this.type = props.type;
        this.ishosted = props.ishosted;
        this.status = props.status;
    }
}