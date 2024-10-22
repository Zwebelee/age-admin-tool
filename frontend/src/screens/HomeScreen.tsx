import {useTranslation} from "react-i18next";

export const HomeScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h1>{t("home")}</h1>
        </main>
    );
};