import {useTranslation} from "react-i18next";
import "./DataFilters.scss";

export const DataFilters = () => {
    const {t} = useTranslation();
    return (
        <div className="dataFilters">
            <h3 className="dataFilters__title">{t("filters")}</h3>
        </div>

    );
};