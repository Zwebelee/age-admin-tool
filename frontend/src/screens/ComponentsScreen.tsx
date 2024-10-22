import {useTranslation} from "react-i18next";

export const ComponentsScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h1>{t("components")}</h1>
        </main>
    );
};