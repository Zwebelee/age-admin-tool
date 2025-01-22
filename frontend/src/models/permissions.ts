//TODO: separate into different files and use as ObjectModules

export interface IPermission {
    guid: string;
    name: string;
    description: string;
}

export interface IRole {
    guid: string;
    name: string;
    description: string;
}

export interface IRolePermission {
    roleGuid: string;
    permissionGuid: string;
}

export interface IUserRole {
    userGuid: string;
    roleGuid: string;
}

export class Permission implements IPermission {
    guid: string;
    name: string;
    description: string;

    constructor(data: IPermission) {
        this.guid = data.guid;
        this.name = data.name;
        this.description = data.description;
    }
}

export class Role implements IRole {
    guid: string;
    name: string;
    description: string;

    constructor(data: IRole) {
        this.guid = data.guid;
        this.name = data.name;
        this.description = data.description;
    }
}

export class RolePermission implements IRolePermission {
    roleGuid: string;
    permissionGuid: string;

    constructor(data: IRolePermission) {
        this.roleGuid = data.roleGuid;
        this.permissionGuid = data.permissionGuid;
    }
}

export class UserRole implements IUserRole {
    userGuid: string;
    roleGuid: string;

    constructor(data: IUserRole) {
        this.userGuid = data.userGuid;
        this.roleGuid = data.roleGuid;
    }
}