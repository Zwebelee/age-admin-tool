import {useTranslation} from "react-i18next";

export const ComponentsScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h2>{t("components")}</h2>
        </main>
    );
};