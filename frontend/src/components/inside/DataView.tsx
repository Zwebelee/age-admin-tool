import {useTranslation} from "react-i18next";

import "./DataView.scss";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";


export const DataView = () => {
    const {t} = useTranslation();
    return (
        <div className="dataView">
            <p className="dataView__name">{t("view")}</p>
            <button type="button" className="dataView__button"><ViewListOutlinedIcon/></button>
            <button type="button" className="dataView__button"><PieChartOutlinedIcon/></button>
        </div>
    );
};