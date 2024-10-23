import {useTranslation} from "react-i18next";
import {AppBar, Toolbar, Typography} from "@mui/material";
import reactLogo from "../assets/react.svg";
import {exampleAGE} from "../models/exampleAGE.ts";
import {LanguageSelector} from "./LanguageSelector.tsx";
import {MainMenu} from "./MainMenu.tsx";

export const AppHeader = () => {
    const {t} = useTranslation()
    return (
        <AppBar
            position="fixed"
        >
            <Toolbar variant="regular">
                <img src={reactLogo} className="logo react" alt="React logo"/>
                <Typography variant="h4" component="div">
                    {t("app-title")} - {exampleAGE.name}
                </Typography>
                <LanguageSelector/>
                <MainMenu/>
            </Toolbar>
        </AppBar>
    )
}