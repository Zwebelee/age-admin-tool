import {useTranslation} from "react-i18next";

export const ToolsScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h1>{t("tools")}</h1>
        </main>
    );
};