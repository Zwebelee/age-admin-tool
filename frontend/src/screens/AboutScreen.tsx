import {useTranslation} from "react-i18next";
import {LanguageSelector} from "../components/LanguageSelector.tsx";

export const AboutScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h1>{t("about")}</h1>
            <LanguageSelector/>
        </main>
    );
};