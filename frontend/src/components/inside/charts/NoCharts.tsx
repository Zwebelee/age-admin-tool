import {useTranslation} from "react-i18next";
import "./NoCharts.scss";


export const NoCharts = () => {

    const {t} = useTranslation();

    return (
        <div className="noCharts">
            <p>{t("no-charts")}</p>
        </div>
    )
}