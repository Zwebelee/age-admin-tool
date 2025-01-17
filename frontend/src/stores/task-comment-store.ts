import {TaskComment} from "../models/taskcomment.ts";
import {AbstractStore} from "./abstract-store.ts";
import {makeObservable, observable} from "mobx";
import {AuthService} from "../services/auth.service.ts";

interface tempTaskComment {
    guid: string;
    task_guid: string;
    taskId: string;
    comment: string;
    tooluserGuid?: string;
    tooluser_guid?: string;
    createdAt: Date;
    created_at:string;
}

export class TaskCommentStore extends AbstractStore<TaskComment> {
    items = observable.map<string, TaskComment>();

    constructor(authService: AuthService) {
        super(authService);
        makeObservable(this, {});
    }

    async initialize() {
        await this.loadItems();
    }

    async loadTaskComments(taskGuid: string) {
        this.status = "loading";
        try {
            const response = await this.authService.getApiClient().get(`tasks/${taskGuid}/comments`);
            // TODO: properly serialize / deserialize like "task" model
            const data: TaskComment[] = response.data.map((taskCommentData: tempTaskComment) => new TaskComment({
                guid: taskCommentData.guid,
                taskId: taskCommentData.task_guid,
                comment: taskCommentData.comment,
                tooluserGuid: taskCommentData.tooluser_guid,
                createdAt: new Date(taskCommentData.created_at)
            }));
            data.forEach(taskCommentItem => {
                this.items.set(taskCommentItem.guid, taskCommentItem);
            });
            this.status = "loaded";
        } catch (e) {
            this.logger.error("Failed to load task comments", e);
            this.status = "error";
        }
    }

    async addTaskComment(taskGuid: string, taskComment: TaskComment) {
        this.status = "loading";

        // TODO: properly serialize / deserialize like "task" model
        const testtaskComment = JSON.parse(JSON.stringify(taskComment));
        testtaskComment.task_guid = testtaskComment.taskId;
        delete testtaskComment.taskId;
        testtaskComment.tooluser_guid = testtaskComment.tooluserGuid;
        delete testtaskComment.tooluserGuid;
        testtaskComment.created_at = testtaskComment.createdAt;
        delete testtaskComment.createdAt;

        try {
            const response = await this.authService.getApiClient().post(`tasks/${taskGuid}/comments`, testtaskComment);
            const taskCommentItem = new TaskComment(response.data);
            this.items.set(taskCommentItem.guid, taskCommentItem);
            this.status = "loaded";
        } catch (e) {
            this.logger.error("Failed to add task comment", e);
            this.status = "error";
        }
    }

    getEndpoint(): string {
        return "/taskcomments";
    }
    clearItems() {
        this.items.clear();
    }
}