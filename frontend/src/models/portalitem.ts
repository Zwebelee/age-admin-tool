import {AbstractModel} from "./abstract-models.ts";

interface PortalItemProps {
    guid: string;
    id: string;
    title?: string;
    type?: string;
    owner?: string;
    homepage?: string;
    url?: string;
    sizebyte?: number;
    sharing?: string;
    groupsharing?: string;
    folder?: string;
    editable?: boolean;
    viewcount?: number;
    usagequota?: number;
    categories?: string;
    contentstatus?: string;
    createdat?: string;
    modifiedat?: string;
    snippet?: string;
    description?: string;
    thumbnail?: string;
    tags?: string;
}

export class PortalItem extends AbstractModel {
    class: string = "PortalItem";

    guid: string;
    id: string;
    title?: string;
    type?: string;
    owner?: string;
    homepage?: string;
    url?: string;
    sizebyte?: number;
    sharing?: string;
    groupsharing?: string;
    folder?: string;
    editable?: boolean;
    viewcount?: number;
    usagequota?: number;
    categories?: string;
    contentstatus?: string;
    createdat?: string;
    modifiedat?: string;
    snippet?: string;
    description?: string;
    thumbnail?: string;
    tags?: string;

    constructor(props: PortalItemProps) {
        super()
        this.guid = props.guid;
        this.id = props.id;
        this.title = props.title;
        this.type = props.type;
        this.owner = props.owner;
        this.homepage = props.homepage;
        this.url = props.url;
        this.sizebyte = props.sizebyte;
        this.sharing = props.sharing;
        this.groupsharing = props.groupsharing;
        this.folder = props.folder;
        this.editable = props.editable;
        this.viewcount = props.viewcount;
        this.usagequota = props.usagequota;
        this.categories = props.categories;
        this.contentstatus = props.contentstatus;
        this.createdat = props.createdat;
        this.modifiedat = props.modifiedat;
        this.snippet = props.snippet;
        this.description = props.description;
        this.thumbnail = props.thumbnail;
        this.tags = props.tags;
    }
}