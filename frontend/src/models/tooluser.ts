export interface IToolUser {
    guid: string,
    username: string,
    language: string,
    theme: string
}

export class ToolUser {
    guid: string;
    username: string;
    language: string;
    theme: string;

    constructor(data: IToolUser) {
        this.guid = data.guid;
        this.username = data.username;
        this.language = data.language;
        this.theme = data.theme;
    }
}