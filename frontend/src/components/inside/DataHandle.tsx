import "./DataHandle.scss";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

interface dataHandle {
    filterView: boolean;
    onClickHandle: () => void;
}


export const DataHandle = ({filterView, onClickHandle}: dataHandle) => {
    return (
        <div className={filterView ? "dataHandle" : "dataHandle dataHandle--hidden"}>
            <button type="button" className="dataHandle__button" onClick={onClickHandle}>
                <div className="dataHandle__icon">
                    <ArrowBackIosOutlinedIcon fontSize="small"/>
                </div>
            </button>
        </div>
    );
};