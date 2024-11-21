import {AbstractModel} from "./abstract-models.ts";

interface AgeWebAdaptorProps {
    guid: string;
    machineName: string;
    machineIP: string;
    webAdaptorURL: string;
    id: string;
    description?: string;
    httpPort: number;
    httpsPort: number;
    refreshServerListInterval: number;
    reconnectServerOnFailureInterval: number;
}

export class AgeWebAdaptor extends AbstractModel {
    class: string = 'AgeWebAdaptor';
    guid: string;
    machineName: string;
    machineIP: string;
    webAdaptorURL: string;
    id: string;
    description?: string;
    httpPort: number;
    httpsPort: number;
    refreshServerListInterval: number;
    reconnectServerOnFailureInterval: number;

    constructor(props: AgeWebAdaptorProps) {
        super()
        this.guid = props.guid;
        this.machineName = props.machineName;
        this.machineIP = props.machineIP;
        this.webAdaptorURL = props.webAdaptorURL;
        this.id = props.id;
        this.description = props.description;
        this.httpPort = props.httpPort;
        this.httpsPort = props.httpsPort;
        this.refreshServerListInterval = props.refreshServerListInterval;
        this.reconnectServerOnFailureInterval = props.reconnectServerOnFailureInterval;
    }
}
