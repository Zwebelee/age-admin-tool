import {useTranslation} from "react-i18next";

export const UsersScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h1>{t("users")}</h1>
        </main>
    );
};