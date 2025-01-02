import {useTranslation} from "react-i18next";
import "./DataFilters.scss";

interface DataFiltersProps {
    filterView: boolean;
    filter: JSX.Element;
}


export const DataFilters = ({filterView, filter}: DataFiltersProps) => {
    const {t} = useTranslation();
    return (
        <div className={filterView ? "dataFilters" : "dataFilters dataFilters--hidden"}>
            <div className="dataFilters__contentBox">
                <h3 className="dataFilters__title">{t("filters")}</h3>
                <div className="dataFilters__accordionBox">
                    {filter}
                </div>
            </div>
        </div>
    );
};