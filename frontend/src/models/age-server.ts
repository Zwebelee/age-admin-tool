import {AbstractModel} from "./abstract-models.ts";

interface AgeServerProps {
    guid: string;
    id: string;
    name: string;
    adminUrl: string;
    url?: string;
    isHosted: boolean;
    serverType: string;
    serverRole: string;
    serverFunction?: string;
}

export class AgeServer extends AbstractModel {
    class: string = 'AgeServer'
    guid: string;
    id: string;
    name: string;
    adminUrl: string;
    url?: string;
    isHosted: boolean;
    serverType: string;
    serverRole: string;
    serverFunction?: string;

    constructor(props: AgeServerProps) {
        super();
        this.guid = props.guid;
        this.id = props.id;
        this.name = props.name;
        this.adminUrl = props.adminUrl;
        this.url = props.url || '';
        this.isHosted = props.isHosted;
        this.serverType = props.serverType;
        this.serverRole = props.serverRole;
        this.serverFunction = props.serverFunction || '';
    }
}