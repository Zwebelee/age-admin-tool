import "./DataHandle.scss";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";


export const DataHandle = () => {
    return (
        <div className="dataHandle">
            <button type="button" className="dataHandle__button">
                <ArrowBackIosOutlinedIcon fontSize="small"/>
            </button>
        </div>
    );
};