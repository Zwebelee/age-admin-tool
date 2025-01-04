export interface ITaskComment {
    guid: string;
    taskId: number;
    comment: string;
    tooluserGuid?: string;
    createdAt: Date;
}

export class TaskComment implements ITaskComment {
    guid: string;
    taskId: number;
    comment: string;
    tooluserGuid?: string;
    createdAt: Date;

    constructor(data: ITaskComment) {
        this.guid = data.guid;
        this.taskId = data.taskId;
        this.comment = data.comment;
        this.tooluserGuid = data.tooluserGuid;
        this.createdAt = new Date(data.createdAt);
    }
}