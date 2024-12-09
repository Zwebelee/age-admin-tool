import {makeAutoObservable} from "mobx";
import {getLocalStorageItem, setLocalStorageItem} from "../utils/localStorage.ts";

interface IThemeStore {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export class ThemeStore implements IThemeStore {
    theme: "light" | "dark" = "dark";

    constructor() {
        makeAutoObservable(this);
        const currentTheme = getLocalStorageItem('theme');

        if (currentTheme === 'light' || currentTheme === 'dark') {
            this.theme = currentTheme
        }
    }

    setTheme(theme: "light" | "dark") {
        this.theme = theme;
        setLocalStorageItem('theme', this.theme)
    }

    toggleTheme = () => {
        this.theme = this.theme === "light" ? "dark" : "light";
        setLocalStorageItem('theme', this.theme)
    }
}