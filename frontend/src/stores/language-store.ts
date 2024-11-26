import {makeAutoObservable} from "mobx";
import {getCookie, setCookie} from "../utils/cookie.ts";
import i18n from "i18next";
import {ToolUserStore} from "./tooluser-store.ts";

interface ILanguageStore {
    language: "de" | "fr" | "en";
    switchLanguage: (language: "de" | "fr" | "en") => void;
}

export class LanguageStore implements ILanguageStore {
    language: "de" | "fr" | "en" = "en";

    constructor(private toolUserStore: ToolUserStore) {
        makeAutoObservable(this);
        this.initializeLanguage();
    }

    initializeLanguage() {
        const languageCookie = getCookie('language');
        if (this.toolUserStore.user?.language) {
            this.language = this.toolUserStore.user.language as "de" | "fr" | "en";
        } else if(languageCookie === 'de' || languageCookie === 'fr' || languageCookie === 'en') {
            this.language = languageCookie;
        }
        i18n.changeLanguage(this.language);
    }


    switchLanguage = (language: "de" | "fr" | "en") => {
        this.language = language;
        i18n.changeLanguage(this.language);
        setCookie('language', this.language)
    }
}
