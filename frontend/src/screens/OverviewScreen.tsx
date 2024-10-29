import {useTranslation} from "react-i18next";

export const OverviewScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h2>{t("overview")}</h2>
        </main>
    );
};