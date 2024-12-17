import {useTranslation} from "react-i18next";
import Button from '@mui/material/Button';
import "./DataFilters.scss";

interface DataFiltersProps {
    filter: JSX.Element;
}


export const DataFilters = ({filter}: DataFiltersProps) => {
    const {t} = useTranslation();
    return (
        <div className="dataFilters">
            <h3 className="dataFilters__title">{t("filters")}</h3>
            <div className="dataFilters__accordionBox">
                {filter}
            </div>
            <div className="dataFilters__reset">
                <Button variant="contained">{t("reset")}</Button>
            </div>
        </div>

    );
};