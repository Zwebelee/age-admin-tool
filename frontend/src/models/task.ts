export interface ITask {
    guid: string;
    taskRuleGuid: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignedTo?: string;
    linkedObjectGuid: string;
    linkedObjectType?: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Task implements ITask {
    guid: string;
    taskRuleGuid: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignedTo?: string;
    linkedObjectGuid: string;
    linkedObjectType?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: ITask) {
        this.guid = data.guid;
        this.taskRuleGuid = data.taskRuleGuid;
        this.title = data.title;
        this.description = data.description;
        this.status = data.status;
        this.priority = data.priority;
        this.assignedTo = data.assignedTo;
        this.linkedObjectGuid = data.linkedObjectGuid;
        this.linkedObjectType = data.linkedObjectType;
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);
    }
}
