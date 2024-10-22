import {useTranslation} from "react-i18next";

export const ContentsScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h1>{t("contents")}</h1>
        </main>
    );
};