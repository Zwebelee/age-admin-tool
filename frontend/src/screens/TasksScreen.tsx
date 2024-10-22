import {useTranslation} from "react-i18next";

export const TasksScreen = () => {
    const {t} = useTranslation();
    return (
        <main>
            <h1>{t("tasks")}</h1>
        </main>
    );
};