import "./DataHandle.scss";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";


export const DataHandle = () => {
    return (
        <div className="dataHandle dataHandle--hidden">
            <button type="button" className="dataHandle__button">
                <div className="dataHandle__icon">
                    <ArrowBackIosOutlinedIcon fontSize="small"/>
                </div>
            </button>
        </div>
    );
};