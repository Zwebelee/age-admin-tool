import {useTranslation} from "react-i18next";
import {UserSettings} from "../components/UserSettings.tsx";

export const MyAccountScreen = ({ toggleTheme, onChange }: { toggleTheme: boolean; onChange: () => void }) => {
    const {t} = useTranslation();
    return (
        <main>
            <h1>{t("my-account")}</h1>
            <UserSettings toggleTheme={toggleTheme} onChange={onChange}/>
        </main>
    );
};