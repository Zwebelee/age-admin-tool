import {useTranslation} from "react-i18next";

export const GroupsScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h1>{t("groups")}</h1>
        </main>
    );
};