import {useTranslation} from "react-i18next";
import {UserSettings} from "../components/UserSettings.tsx";

export const MyAccountScreen = ({ toggleTheme, onChange }: { toggleTheme: boolean; onChange: () => void }) => {
    const {t} = useTranslation();
    return (
        <>
            <h2>{t("my-account")}</h2>
            <UserSettings toggleTheme={toggleTheme} onChange={onChange}/>
        </>
    );
};