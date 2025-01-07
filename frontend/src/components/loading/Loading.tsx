import {CircularProgress} from "@mui/material";
import "./Loading.scss";


export const Loading = () => {
    return (
        <div className="loading">
            <CircularProgress/>
        </div>
    )
}