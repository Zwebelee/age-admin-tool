import {useTranslation} from "react-i18next";

export const GroupsScreen = () => {
    const {t} = useTranslation();
    return (
        <>
            <h2>{t("groups")}</h2>
        </>
    );
};