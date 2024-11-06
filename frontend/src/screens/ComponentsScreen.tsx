import {useTranslation} from "react-i18next";

export const ComponentsScreen = () => {
    const {t} = useTranslation();
    return (
        <>
            <h2>{t("components")}</h2>
        </>
    );
};