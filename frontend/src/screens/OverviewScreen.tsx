import {useTranslation} from "react-i18next";

export const OverviewScreen = () => {
    const {t} = useTranslation();
    return (
        <>
            <h2>{t("overview")}</h2>
        </>
    );
};