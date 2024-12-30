import {AbstractModel} from "./abstract-models.ts";

interface PortalGroupProps {
    guid: string;
    id: string;
    capabilities?: string;
    owner: string;
    createdat: string;
    modifiedat: string;
    access: string;
    title: string;
    description?: string;
    snippet?: string;
    thumbnail?: string;
    homepage?: string;
    tags?: string;
    membercount: number;
    contentcount: number;
    leavingdisallowed: boolean;
    isreadonly: boolean;
    isviewonly: boolean;
    isprotected: boolean;
    hiddenmembers: boolean;
    isinvitationonly: boolean;
    iseditinggroup: boolean;
    type: string;
}

export class PortalGroup extends AbstractModel {
    class: string = "PortalGroup";

    guid: string;
    id: string;
    capabilities?: string;
    owner: string;
    createdat: string;
    modifiedat: string;
    access: string;
    title: string;
    description?: string;
    snippet?: string;
    thumbnail?: string;
    homepage?: string;
    tags?: string;
    membercount: number;
    contentcount: number;
    leavingdisallowed: boolean;
    isreadonly: boolean;
    isviewonly: boolean;
    isprotected: boolean;
    hiddenmembers: boolean;
    isinvitationonly: boolean;
    iseditinggroup: boolean;
    type: string;

    constructor(props: PortalGroupProps) {
        super();
        this.guid = props.guid;
        this.id = props.id;
        this.capabilities = props.capabilities;
        this.owner = props.owner;
        this.createdat = props.createdat;
        this.modifiedat = props.modifiedat;
        this.access = props.access;
        this.title = props.title;
        this.description = props.description;
        this.snippet = props.snippet;
        this.thumbnail = props.thumbnail;
        this.homepage = props.homepage;
        this.tags = props.tags;
        this.membercount = props.membercount;
        this.contentcount = props.contentcount;
        this.leavingdisallowed = props.leavingdisallowed;
        this.isreadonly = props.isreadonly;
        this.isviewonly = props.isviewonly;
        this.isprotected = props.isprotected;
        this.hiddenmembers = props.hiddenmembers;
        this.isinvitationonly = props.isinvitationonly;
        this.iseditinggroup = props.iseditinggroup;
        this.type = props.type;
    }
}