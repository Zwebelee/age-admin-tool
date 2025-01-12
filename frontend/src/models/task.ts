import {AbstractModel} from "./abstract-models.ts";

export interface ITask {
    guid: string;
    task_rule_guid: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assigned_to?: string;
    linked_object_guid: string;
    linked_object_type?: string;
    created_at: Date;
    updated_at: Date;
}

export class Task extends AbstractModel {
    class: string = "Task"
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
        super();
        this.guid = data.guid;
        this.taskRuleGuid = data.task_rule_guid;
        this.title = data.title;
        this.description = data.description;
        this.status = data.status;
        this.priority = data.priority;
        this.assignedTo = data.assigned_to;
        this.linkedObjectGuid = data.linked_object_guid;
        this.linkedObjectType = data.linked_object_type;
        this.createdAt = new Date(data.created_at);
        this.updatedAt = new Date(data.updated_at);
    }
}
