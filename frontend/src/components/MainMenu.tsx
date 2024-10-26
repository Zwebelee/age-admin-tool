import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

import "./MainMenu.scss";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";
import SettingsInputComponentOutlinedIcon from "@mui/icons-material/SettingsInputComponentOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";



const isActive = ({isActive}: { isActive: boolean }) => `${isActive ? "navLink active" : "navLink"}`;

export const MainMenu = () => {
    const {t} = useTranslation();
    return (
        <nav className="mainMenu">
            <div>
                <ul className="mainMenuList">
                    <li className="mainMenuListItem">
                        <NavLink className={isActive} to="/">
                            <span className="icon"><GridViewOutlinedIcon/></span>
                            {t("overview")}
                        </NavLink>
                    </li>
                    <li className="mainMenuListItem">
                        <NavLink className={isActive} to="/users">
                            <span className="icon"><PeopleAltOutlinedIcon /></span>
                            {t("users")}
                        </NavLink>
                    </li>
                    <li className="mainMenuListItem">
                        <NavLink className={isActive} to="/contents">
                            <span className="icon"><ContentCopyOutlinedIcon/></span>
                            {t("contents")}
                        </NavLink>
                    </li>
                    <li className="mainMenuListItem">
                        <NavLink className={isActive} to="/tasks">
                            <span className="icon"><TaskAltOutlinedIcon/></span>
                            {t("tasks")}
                        </NavLink>
                    </li>
                    <li className="mainMenuListItem">
                        <NavLink className={isActive} to="/groups">
                            <span className="icon"><HolidayVillageOutlinedIcon/></span>
                            {t("groups")}
                        </NavLink>
                    </li>
                    <li className="mainMenuListItem">
                        <NavLink className={isActive} to="/components">
                            <span className="icon"><SettingsInputComponentOutlinedIcon/></span>
                            {t("components")}
                        </NavLink>
                    </li>
                    <li className="mainMenuListItem">
                        <NavLink className={isActive} to="/experimental">
                            <span className="icon"><ScienceOutlinedIcon/></span>
                            {t("experimental")}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}