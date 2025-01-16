import {AuthService} from "../services/auth.service.ts";
import {Task} from "../models/task.ts";
import {AbstractStore} from "./abstract-store.ts";
import {makeObservable, observable, runInAction} from "mobx";


export class TaskStore extends AbstractStore<Task> {
    items = observable.map<string, Task>();
    selectedItem: Task | null = null;

    constructor(authService: AuthService) {
        super(authService);
        makeObservable(this, {});
    }

    async initialize() {
        await this.loadItems();
    }

    async loadItems() {
        this.status = "loading";
        try {
            const response = await this.authService.getApiClient().get(this.getEndpoint());
            const data: Task[] = response.data.map((taskdata: any) => new Task(taskdata));
            data.forEach(taskItem => {
                this.items.set(taskItem.guid, taskItem);
            });
            this.status = "loaded";
        } catch (e) {
            this.logger.error('Failed to load items', e);
            this.status = "error";
        }
    }

    async updateItem(item: Task) {
        try {
            const response = await this.authService.getApiClient().put(`${this.getEndpoint()}/${item.guid}`, item);
            const updatedItem = response.data;
            runInAction(() => {
                this.items.set(updatedItem.guid, new Task(updatedItem));
            });
        } catch (error) {
            this.logger.error('Failed to update item', error);
        }
    }

    getEndpoint(): string {
        return "/tasks";
    }
}
