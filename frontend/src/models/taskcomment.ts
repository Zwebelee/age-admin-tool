export interface ITaskComment {
    id: number;
    taskId: number;
    comment: string;
    tooluserId?: number;
    createdAt: Date;
}

export class TaskComment implements ITaskComment {
    id: number;
    taskId: number;
    comment: string;
    tooluserId?: number;
    createdAt: Date;

    constructor(data: ITaskComment) {
        this.id = data.id;
        this.taskId = data.taskId;
        this.comment = data.comment;
        this.tooluserId = data.tooluserId;
        this.createdAt = new Date(data.createdAt);
    }
}