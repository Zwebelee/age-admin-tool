import {useTranslation} from "react-i18next";

export const TasksScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h2>{t("tasks")}</h2>
        </main>
    );
};