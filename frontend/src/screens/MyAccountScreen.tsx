import {useTranslation} from "react-i18next";
import {UserSettings} from "../components/UserSettings.tsx";

export const MyAccountScreen = () => {
    const {t} = useTranslation();
    return (
        <>
            <h2>{t("my-account")}</h2>
            <UserSettings/>
        </>
    );
};