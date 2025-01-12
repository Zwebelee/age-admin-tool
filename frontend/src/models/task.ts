import { AbstractModel } from "./abstract-models.ts";

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
    created_at: string; // JSON will usually pass this as a string
    updated_at: string;
}

export class Task extends AbstractModel {
    class: string = "Task";
    guid!: string;
    taskRuleGuid!: string;
    title!: string;
    description!: string;
    status!: string;
    priority!: string;
    assignedTo?: string;
    linkedObjectGuid!: string;
    linkedObjectType?: string;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(data: ITask) {
        super();
        this.fromJSON(data);
    }

    // Deserialize JSON into the Task object
    fromJSON(data: ITask): void {
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

    // Serialize the Task object back to JSON
    toJSON(): ITask {
        return {
            guid: this.guid,
            task_rule_guid: this.taskRuleGuid,
            title: this.title,
            description: this.description,
            status: this.status,
            priority: this.priority,
            assigned_to: this.assignedTo,
            linked_object_guid: this.linkedObjectGuid,
            linked_object_type: this.linkedObjectType,
            created_at: this.createdAt.toISOString(),
            updated_at: this.updatedAt.toISOString(),
        };
    }

    static fromJSON(data: ITask): Task {
        return new Task(data);
    }
}
