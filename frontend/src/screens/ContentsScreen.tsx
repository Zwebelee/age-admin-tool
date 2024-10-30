import {useTranslation} from "react-i18next";

export const ContentsScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h2>{t("contents")}</h2>
        </main>
    );
};