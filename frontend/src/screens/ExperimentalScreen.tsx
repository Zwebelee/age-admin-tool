import {useTranslation} from "react-i18next";
import {observer} from "mobx-react-lite";
import {TestStoreComponent} from "../components/StoreTesting.tsx";

export const ExperimentalScreen = observer(() => {
    const {t} = useTranslation();

    return (
        <>
            <h2>{t("experimental")}</h2>
            <h3>Testing stuff - Fokus funktionalität, nicht implementierung an sich (weder Design noch Code)</h3>
            <TestStoreComponent/>
        </>
    )
});
