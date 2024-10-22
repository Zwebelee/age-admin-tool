import {useTranslation} from "react-i18next";

export const OverviewScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h1>{t("overview")}</h1>
        </main>
    );
};