import {useTranslation} from "react-i18next";

export const UsersScreen = () => {
    const {t} = useTranslation();
    return (
        <>
            <h2>{t("users")}</h2>
        </>
    );
};