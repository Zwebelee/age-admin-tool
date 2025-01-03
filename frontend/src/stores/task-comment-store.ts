import {TaskComment} from "../models/taskcomment.ts";
import {AbstractStore} from "./abstract-store.ts";
import {makeObservable, observable, runInAction} from "mobx";
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
    }

    async loadItems() {
        throw new Error("loadItems method is deactivated in TaskCommentStore");
    };

    async loadTaskComments(taskId: number) {
        const taskCommentEndpoint = this.getEndpoint() + `/${taskId}/comments`;

        await this.authService.getApiClient().get(taskCommentEndpoint).then((response) => {
            const data: TaskComment[] = response.data;
            runInAction(() => {
                data.forEach(taskComment => {
                    this.items.set(String(taskComment.id), taskComment);
                    //TODO: switch to guid
                })
            })
        })
    }

    getEndpoint(): string {
        return "/tasks";
    }
}