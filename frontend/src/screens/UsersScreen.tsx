import {useTranslation} from "react-i18next";

export const UsersScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h2>{t("users")}</h2>
        </main>
    );
};