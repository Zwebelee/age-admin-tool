import {AuthService} from "../services/auth.service.ts";
import {Task} from "../models/task.ts";
import {AbstractStore} from "./abstract-store.ts";
import {makeObservable, observable, runInAction} from "mobx";


export class TaskStore extends AbstractStore<Task> {
    items = observable.map<string, Task>();

    constructor(authService: AuthService) {
        super(authService);
        makeObservable(this, {})
        this.initialize().then(() => {
        });
    }

    async initialize() {
        await this.loadItems();
    }

    async loadItems() {
        await this.authService.getApiClient().get(this.getEndpoint()).then((response) => {
            const data: Task[] = response.data;
            runInAction(() => {
                data.forEach(task => {
                    this.items.set(String(task.id), task);
                    //TODO: switch to guid
                })
            });
        });
    }

    getEndpoint(): string {
        return "/tasks";
    }
}
