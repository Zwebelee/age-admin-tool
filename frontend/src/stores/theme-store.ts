import {makeAutoObservable} from "mobx";

interface IThemeStore {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export class ThemeStore implements IThemeStore {
    theme: "light" | "dark" = "dark";

    constructor() {
        makeAutoObservable(this);
    }

    toggleTheme = () => {
        this.theme = this.theme === "light" ? "dark" : "light";
    }
}