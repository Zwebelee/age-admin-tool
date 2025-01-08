import {AuthService} from "../services/auth.service.ts";
import {Task} from "../models/task.ts";
import {AbstractStore} from "./abstract-store.ts";
import {makeObservable, observable} from "mobx";


export class TaskStore extends AbstractStore<Task> {
    items = observable.map<string, Task>();
    selectedItem: Task | null = null;

    constructor(authService: AuthService) {
        super(authService);
        makeObservable(this, {})
        this.initialize().then(() => {});
    }

    async initialize() {
        await this.loadItems();
    }

    getEndpoint(): string {
        return "/tasks";
    }
}
