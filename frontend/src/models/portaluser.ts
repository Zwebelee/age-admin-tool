export enum StatusEnum {
    Active = 'active',
    Deleted = 'deleted',
    Pending = 'pending'
}

export interface PortalUserProps {
    guid: string;
    userid: string;
    username: string;
    lastname: string;
    firstname: string;
    fullname: string;
    email: string;
    homepage: string;
    description?: string;
    status: StatusEnum;
    lastlogin?: Date;
    modified: Date;
    created: Date;
    provider: string;
    role: string;
    roleid: string;
    customrole: string;
    disabled: boolean;
    licensetype: string;
    usertype: string;
    access: string;
    storeage: number;
    itemcount: number;
    groupcount: number;
    adstatus: string;
    division1: string;
    division2: string;
    division3: string;
    division4: string;
}

export class PortalUser {
    guid: string;
    userid: string;
    username: string;
    lastname: string;
    firstname: string;
    fullname: string;
    email: string;
    homepage: string;
    description?: string;
    status: StatusEnum;
    lastlogin?: Date;
    modified: Date;
    created: Date;
    provider: string;
    role: string;
    roleid: string;
    customrole: string;
    disabled: boolean;
    licensetype: string;
    usertype: string;
    access: string;
    storeage: number;
    itemcount: number;
    groupcount: number;
    adstatus: string;
    division1: string;
    division2: string;
    division3: string;
    division4: string;

    constructor(props: PortalUserProps) {
        this.guid = props.guid;
        this.userid = props.userid;
        this.username = props.username;
        this.lastname = props.lastname;
        this.firstname = props.firstname;
        this.fullname = props.fullname;
        this.email = props.email;
        this.homepage = props.homepage;
        this.description = props.description;
        this.status = props.status;
        this.lastlogin = props.lastlogin;
        this.modified = props.modified;
        this.created = props.created;
        this.provider = props.provider;
        this.role = props.role;
        this.roleid = props.roleid;
        this.customrole = props.customrole;
        this.disabled = props.disabled;
        this.licensetype = props.licensetype;
        this.usertype = props.usertype;
        this.access = props.access;
        this.storeage = props.storeage;
        this.itemcount = props.itemcount;
        this.groupcount = props.groupcount;
        this.adstatus = props.adstatus;
        this.division1 = props.division1;
        this.division2 = props.division2;
        this.division3 = props.division3;
        this.division4 = props.division4;
    }
}