export interface IToolUser {
    guid: string,
    username: string,
    language: string,
    theme: string,
    active_role_guid: string,
    active_role: string
}

export interface IToolUserWithPassword extends IToolUser {
    password: string;
}

export class ToolUser {
    guid: string;
    username: string;
    language: string;
    theme: string;
    activeRoleGuid: string;
    activeRole: string;

    constructor(data: IToolUser) {
        this.guid = data.guid;
        this.username = data.username;
        this.language = data.language;
        this.theme = data.theme;
        this.activeRoleGuid = data.active_role_guid;
        this.activeRole = data.active_role;
    }

    fromJSON(data: IToolUser): void {
        this.guid = data.guid;
        this.username = data.username;
        this.language = data.language;
        this.theme = data.theme;
        this.activeRoleGuid = data.active_role_guid;
        this.activeRole = data.active_role;
    }

    toJSON(): IToolUser {
        return {
            guid: this.guid,
            username: this.username,
            language: this.language,
            theme: this.theme,
            active_role_guid: this.activeRoleGuid,
            active_role: this.activeRole
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

