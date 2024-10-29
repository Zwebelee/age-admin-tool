import {useTranslation} from "react-i18next";
import {SecondaryMenu} from "./SecondaryMenu.tsx";

export const Header = () => {
    const {t} = useTranslation()
    return (
        <>
            <h1>{t("app-title")}</h1>

            <SecondaryMenu/>
        </>
    )
}