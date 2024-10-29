import {useTranslation} from "react-i18next";

export const MyAccountScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h1>{t("my-account")}</h1>
        </main>
    );
};