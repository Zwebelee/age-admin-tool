export interface ITaskRule {
    id: number;
    name: string;
    description: string;
    action: string;
    ruleConditions: any;
    whitelist?: any;
    blacklist?: any;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class TaskRule implements ITaskRule {
    id: number;
    name: string;
    description: string;
    action: string;
    ruleConditions: any;
    whitelist?: any;
    blacklist?: any;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: ITaskRule) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.action = data.action;
        this.ruleConditions = data.ruleConditions;
        this.whitelist = data.whitelist;
        this.blacklist = data.blacklist;
        this.isActive = data.isActive;
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);
    }
}
