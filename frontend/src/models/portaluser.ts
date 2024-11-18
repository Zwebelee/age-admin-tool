import {AbstractModel} from "./abstract-models.ts";
import {makeObservable, observable} from 'mobx';

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

export class PortalUser extends AbstractModel {
    class: string = 'PortalUser';

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
        super()
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

// export class PortalUser extends AbstractModel {
//     class: string = 'PortalUser';
//     guid: string = '';
//     userid: string = '';
//     username: string = '';
//     lastname: string = '';
//     firstname: string = '';
//     fullname: string = '';
//     email: string = '';
//     homepage: string = '';
//     description?: string;
//     status: StatusEnum = StatusEnum.Pending;
//     lastlogin?: Date;
//     modified: Date = new Date();
//     created: Date = new Date();
//     provider: string = '';
//     role: string = '';
//     roleid: string = '';
//     customrole: string = '';
//     disabled: boolean = false;
//     licensetype: string = '';
//     usertype: string = '';
//     access: string = '';
//     storeage: number = 0;
//     itemcount: number = 0;
//     groupcount: number = 0;
//     adstatus: string = '';
//     division1: string = '';
//     division2: string = '';
//     division3: string = '';
//     division4: string = '';
//
//     constructor(props?: PortalUserProps) {
//         super();
//         if (props) {
//             Object.assign(this, props);
//
//         }
//         makeObservable<this, 'guid' | 'userid' | 'username' | 'lastname' | 'firstname' | 'fullname' | 'email' | 'homepage' | 'description' | 'status' | 'lastlogin' | 'modified' | 'created' | 'provider' | 'role' | 'roleid' | 'customrole' | 'disabled' | 'licensetype' | 'usertype' | 'access' | 'storeage' | 'itemcount' | 'groupcount' | 'adstatus' | 'division1' | 'division2' | 'division3' | 'division4'>(this, {
//             guid: observable,
//             userid: observable,
//             username: observable,
//             lastname: observable,
//             firstname: observable,
//             fullname: observable,
//             email: observable,
//             homepage: observable,
//             description: observable,
//             status: observable,
//             lastlogin: observable,
//             modified: observable,
//             created: observable,
//             provider: observable,
//             role: observable,
//             roleid: observable,
//             customrole: observable,
//             disabled: observable,
//             licensetype: observable,
//             usertype: observable,
//             access: observable,
//             storeage: observable,
//             itemcount: observable,
//             groupcount: observable,
//             adstatus: observable,
//             division1: observable,
//             division2: observable,
//             division3: observable,
//             division4: observable
//         });
//     }
// }