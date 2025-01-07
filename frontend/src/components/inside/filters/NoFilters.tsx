import {useTranslation} from "react-i18next";
import "./NoFilters.scss";


export const NoFilters = () => {
    const {t} = useTranslation();

    return (
        <p className="noFilters">{t("no-filters")}</p>
    )
}