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

    async loadItems() {
        this.status = "loading";
        try {
            const response = await this.authService.getApiClient().get(this.getEndpoint());
            console.log(response.data);
            const data: Task[] = response.data.map((taskdata: any) => new Task(taskdata));
            data.forEach(taskItem => {
                console.log(taskItem);
                this.items.set(taskItem.guid, taskItem);
            });
            this.status = "loaded";
        } catch (e) {
            this.status = "error";
        }
    }

    getEndpoint(): string {
        return "/tasks";
    }
}
