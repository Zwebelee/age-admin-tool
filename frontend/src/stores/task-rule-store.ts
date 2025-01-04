import {AbstractStore} from "./abstract-store.ts";
import {TaskRule} from "../models/taskrule.ts";
import {makeObservable, observable} from "mobx";
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

    getEndpoint(): string {
        return "/taskrules";
    }
}