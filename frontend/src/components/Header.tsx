import {LanguageSelector} from "./LanguageSelector.tsx";
import {useTranslation} from "react-i18next";
import {Switch} from "@mui/material";

export const Header = (props: any) => {
    const {t} = useTranslation()
    return (
        <>
            <h1>{t("app-title")}</h1>
            <LanguageSelector/>
            <br/>
            <p>Dark <Switch checked={props.toggleTheme} onChange={props.onChange}/> Light</p>
        </>
    )
}