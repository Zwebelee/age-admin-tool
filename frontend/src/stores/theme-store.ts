import {makeAutoObservable} from "mobx";
import {getCookie, setCookie} from "../utils/cookie.ts";

interface IThemeStore {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export class ThemeStore implements IThemeStore {
    theme: "light" | "dark" = "dark";

    constructor() {
        makeAutoObservable(this);
        const themeCookie = getCookie('theme');
        if (themeCookie === 'light' || themeCookie === 'dark') {
            this.theme = themeCookie
        }
    }

    toggleTheme = () => {
        this.theme = this.theme === "light" ? "dark" : "light";
        setCookie('theme', this.theme)
    }
}