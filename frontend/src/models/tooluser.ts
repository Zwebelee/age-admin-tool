export interface IToolUser {
    id: number,
    username: string,
    language: string,
    theme: string
}

export class ToolUser {
    id: number;
    username: string;
    language: string;
    theme: string;

    constructor(data: IToolUser) {
        this.id = data.id;
        this.username = data.username;
        this.language = data.language;
        this.theme = data.theme;
    }
}