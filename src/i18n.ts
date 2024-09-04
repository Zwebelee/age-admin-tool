import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translation: {
                "app-title": "AGE Administration Tool",
                "home": "Home",
                "about": "About"
            }
        },
        de: {
            translation: {
                "app-title": "AGE Verwaltungstool",
                "home": "Startseite",
                "about": "Über"
            }
        },
        fr: {
            translation: {
                "app-title": "Outil de gestion AGE",
                "home": "Accueil",
                "about": "À propos"
            }
        }
    }
});

export default i18n;