import {makeAutoObservable} from "mobx";
import {getCookie, setCookie} from "../utils/cookie.ts";
import i18n from "i18next";

interface ILanguageStore {
    language: "de" | "fr" | "en";
    switchLanguage: (language: "de" | "fr" | "en") => void;
}

export class LanguageStore implements ILanguageStore {
    language: "de" | "fr" | "en" = "en";

    constructor(){
        makeAutoObservable(this);
        const languageCookie = getCookie('language');
        if (languageCookie === 'de' || languageCookie === 'fr' || languageCookie === 'en') {
            this.language = languageCookie
            i18n.changeLanguage(this.language)
        }
    }

    switchLanguage = (language: "de" | "fr" | "en") => {
        this.language = language;
        i18n.changeLanguage(this.language);
        setCookie('language', this.language)
    }
}
