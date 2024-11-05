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


export const MainMenu = ({position, onClick = () => {}}: {position: string, onClick: () => void}) => {
    const {t} = useTranslation();
    const isActive = ({isActive}: { isActive: boolean }) => `${isActive ? "mainMenu__navLink mainMenu__navLink--active" : "mainMenu__navLink"}`;
    return (
        <nav className={"mainMenu " + position}>
            <ul className="mainMenu__list">
                <li className="mainMenu__listItem">
                    <NavLink className={isActive} to="/" onClick={onClick}>
                        <span className="mainMenu__icon"><GridViewOutlinedIcon/></span>
                        {t("overview")}
                    </NavLink>
                </li>
                <li className="mainMenu__listItem">
                    <NavLink className={isActive} to="/users" onClick={onClick}>
                        <span className="mainMenu__icon"><PeopleAltOutlinedIcon /></span>
                        {t("users")}
                    </NavLink>
                </li>
                <li className="mainMenu__listItem">
                    <NavLink className={isActive} to="/contents" onClick={onClick}>
                        <span className="mainMenu__icon"><ContentCopyOutlinedIcon/></span>
                        {t("contents")}
                    </NavLink>
                </li>
                <li className="mainMenu__listItem">
                    <NavLink className={isActive} to="/tasks" onClick={onClick}>
                        <span className="mainMenu__icon"><TaskAltOutlinedIcon/></span>
                        {t("tasks")}
                    </NavLink>
                </li>
                <li className="mainMenu__listItem">
                    <NavLink className={isActive} to="/groups" onClick={onClick}>
                        <span className="mainMenu__icon"><HolidayVillageOutlinedIcon/></span>
                        {t("groups")}
                    </NavLink>
                </li>
                <li className="mainMenu__listItem">
                    <NavLink className={isActive} to="/components" onClick={onClick}>
                        <span className="mainMenu__icon"><SettingsInputComponentOutlinedIcon/></span>
                        {t("components")}
                    </NavLink>
                </li>
                <li className="mainMenu__listItem">
                    <NavLink className={isActive} to="/experimental" onClick={onClick}>
                        <span className="mainMenu__icon"><ScienceOutlinedIcon/></span>
                        {t("experimental")}
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}