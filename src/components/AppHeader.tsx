import {useTranslation} from "react-i18next";

export const AppHeader = () => {
    const {t} = useTranslation()
    return <h1 className="app-header">{t("app-title")}</h1>
}