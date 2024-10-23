import {LanguageSelector} from "./LanguageSelector.tsx";
import {useTranslation} from "react-i18next";

export const Header = () => {
    const {t} = useTranslation()
    return (
        <>
            <h1>{t("app-title")}</h1>
            <LanguageSelector/>
        </>
    )
}