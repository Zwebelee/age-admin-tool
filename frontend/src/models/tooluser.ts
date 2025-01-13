export interface IToolUser {
    guid: string,
    username: string,
    language: string,
    theme: string,
    active_role_guid: string,
    active_role: string
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
}
