import {AbstractStore} from "./abstract-store.ts";
import {TaskRule} from "../models/taskrule.ts";
import {makeObservable, observable, runInAction} from "mobx";
import {AuthService} from "../services/auth.service.ts";


export class TaskRuleStore extends AbstractStore<TaskRule> {
    items = observable.map<string, TaskRule>();

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
            const data: TaskRule[] = response.data;
            runInAction(() => {
                data.forEach(taskRule => {
                    this.items.set(String(taskRule.id), taskRule);
                    //TODO: switch to guid
                })
            })
        })
    };

    getEndpoint(): string {
        return "/taskrules";
    }
}