import {TaskComment} from "../models/taskcomment.ts";
import {AbstractStore} from "./abstract-store.ts";
import {makeObservable, observable} from "mobx";
import {AuthService} from "../services/auth.service.ts";


export class TaskCommentStore extends AbstractStore<TaskComment> {
    items = observable.map<string, TaskComment>();

    constructor(authService: AuthService) {
        super(authService);
        makeObservable(this, {})
        this.initialize().then(() => {
        });
    }

    async initialize() {
        await this.loadItems();
    }

    async loadTaskComments(taskGuid: string) {
        this.status = "loading";
        try {
            const response = await this.authService.getApiClient().get(`tasks/${taskGuid}/comments`);
            const data: TaskComment[] = response.data.map((taskCommentData: any) => new TaskComment(taskCommentData));
            data.forEach(taskCommentItem => {
                this.items.set(taskCommentItem.guid, taskCommentItem);
            });
            this.status = "loaded";
        } catch (e) {
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