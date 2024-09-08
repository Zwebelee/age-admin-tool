import {useTranslation} from "react-i18next";
import {exampleAGE} from "../models/exampleAGE.ts";

export const AppHeader = () => {
    const {t} = useTranslation()
    return (
        <>
            <h1 className="app-header">{t("app-title")}</h1>
            <h2 className="app-subheader">{exampleAGE.name}</h2>
        </>)
}