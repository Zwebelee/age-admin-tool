import {useTranslation} from "react-i18next";

export const ToolsScreen = () => {
    const {t} = useTranslation();
    return (
        <>
            <h2>{t("tools")}</h2>
        </>
    );
};