import {LanguageSelector} from "./LanguageSelector.tsx";
import {useTranslation} from "react-i18next";
import {Switch} from "@mui/material";

// export const Header = (props: any) => {

export const Header = ({ toggleTheme, onChange }: { toggleTheme: boolean; onChange: () => void }) => {
    const {t} = useTranslation()
    return (
        <>
            <h1>{t("app-title")}</h1>
            <LanguageSelector/>
            <br/>
            <p>Dark <Switch checked={toggleTheme} onChange={onChange}/> Light</p>
        </>
    )
}