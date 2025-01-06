import {TaskComment} from "../models/taskcomment.ts";
import {AbstractStore} from "./abstract-store.ts";
import {makeObservable, observable} from "mobx";
import {AuthService} from "../services/auth.service.ts";


export class TaskCommentStore extends AbstractStore<TaskComment> {
    items = observable.map<string, TaskComment>();

    constructor(authService: AuthService) {
        super(authService);
        makeObservable(this, {});
    }

    async initialize() {
        await this.loadItems();
    }

    getEndpoint(): string {
        return "/taskcomments";
    }
}