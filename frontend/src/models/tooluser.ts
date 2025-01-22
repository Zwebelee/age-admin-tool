import {IToolUserRole, ToolUserRole} from "./tooluserrole.ts";

export interface IToolUser {
    guid: string,
    username: string,
    language: string,
    theme: string,
    active_role: IToolUserRole
    roles: IToolUserRole[];
}

export interface IToolUserWithPassword extends IToolUser {
    password: string;
}

export class ToolUser {
    guid: string;
    username: string;
    language: string;
    theme: string;
    activeRole: ToolUserRole;
    roles: ToolUserRole[];

    constructor(data: IToolUser) {
        this.guid = data.guid;
        this.username = data.username;
        this.language = data.language;
        this.theme = data.theme;
        this.activeRole = new ToolUserRole(data.active_role);
        this.roles = data.roles.map(role => new ToolUserRole(role));
    }

    fromJSON(data: IToolUser): void {
        this.guid = data.guid;
        this.username = data.username;
        this.language = data.language;
        this.theme = data.theme;
        this.activeRole = new ToolUserRole(data.active_role);
        this.roles = data.roles.map(role => new ToolUserRole(role));
    }

    toJSON(): IToolUser {
        return {
            guid: this.guid,
            username: this.username,
            language: this.language,
            theme: this.theme,
            active_role: this.activeRole,
            roles: this.roles.map(role => role.toJSON())
        };
    }
}


export class ToolUserWithPassword extends ToolUser {
    password: string;

    constructor(data: IToolUserWithPassword) {
        super(data);
        this.password = data.password;
    }

    fromJSON(data: IToolUserWithPassword): void {
        super.fromJSON(data);
        this.password = data.password;
    }

    toJSON(): IToolUserWithPassword {
        return {
            ...super.toJSON(),
            password: this.password
        };
    }
}

