import {useTranslation} from "react-i18next";
import {UserSettings} from "../components/UserSettings.tsx";
import {observer} from "mobx-react-lite";

export const MyAccountScreen = observer(() => {
    const {t} = useTranslation();
    return (
        <>
            <h2>{t("my-account")}</h2>
            <UserSettings/>
        </>
    );
});