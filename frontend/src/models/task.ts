export interface ITask {
    id: number;
    taskRuleId: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignedTo?: number;
    linkedObjectId: string;
    linkedObjectType?: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Task implements ITask {
    id: number;
    taskRuleId: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignedTo?: number;
    linkedObjectId: string;
    linkedObjectType?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: ITask) {
        this.id = data.id;
        this.taskRuleId = data.taskRuleId;
        this.title = data.title;
        this.description = data.description;
        this.status = data.status;
        this.priority = data.priority;
        this.assignedTo = data.assignedTo;
        this.linkedObjectId = data.linkedObjectId;
        this.linkedObjectType = data.linkedObjectType;
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);
    }
}
