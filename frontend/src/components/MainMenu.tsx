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
import {permissions} from "../config/permissions.ts";
import {useRootStore} from "../stores/root-store.ts";
import { observer } from "mobx-react-lite";


export const MainMenu = observer(({position, onClickMenuItem = () => {}}: {position: string, onClickMenuItem: () => void}) => {
    const {t} = useTranslation();
    const {toolUserStore, permissionsStore} = useRootStore();
    const hasPermission = permissionsStore.hasPermission(toolUserStore.user?.guid || "", permissions.VIEW_TASKS);

    const isActive = ({isActive}: { isActive: boolean }) => `${isActive ? "mainMenu__navLink mainMenu__navLink--active" : "mainMenu__navLink"}`;


    return (
        <nav className={"mainMenu " + position}>
            <ul className="mainMenu__list">
                <li className="mainMenu__listItem">
                    <NavLink className={isActive} to="/" onClick={onClickMenuItem}>
                        <div className="mainMenu__innerListItem">
                            <span className="mainMenu__icon"><GridViewOutlinedIcon/></span>
                            {t("overview")}
                        </div>
                    </NavLink>
                </li>
                <li className="mainMenu__listItem mainMenu__listItem--color2">
                    <NavLink className={isActive} to="/users" onClick={onClickMenuItem}>
                        <div className="mainMenu__innerListItem">
                            <span className="mainMenu__icon"><PeopleAltOutlinedIcon/></span>
                            {t("users")}
                        </div>
                    </NavLink>
                </li>
                <li className="mainMenu__listItem mainMenu__listItem--color3">
                    <NavLink className={isActive} to="/contents" onClick={onClickMenuItem}>
                        <div className="mainMenu__innerListItem">
                            <span className="mainMenu__icon"><ContentCopyOutlinedIcon/></span>
                            {t("contents")}
                        </div>
                    </NavLink>
                </li>
                {toolUserStore.userLoaded && hasPermission && (<li className="mainMenu__listItem mainMenu__listItem--color4">
                    <NavLink className={isActive} to="/tasks" onClick={onClickMenuItem}>
                        <div className="mainMenu__innerListItem">
                            <span className="mainMenu__icon"><TaskAltOutlinedIcon/></span>
                            {t("tasks")}
                        </div>
                    </NavLink>
                </li>)}
                <li className="mainMenu__listItem mainMenu__listItem--color5">
                    <NavLink className={isActive} to="/groups" onClick={onClickMenuItem}>
                        <div className="mainMenu__innerListItem">
                            <span className="mainMenu__icon"><HolidayVillageOutlinedIcon/></span>
                            {t("groups")}
                        </div>
                    </NavLink>
                </li>
                <li className="mainMenu__listItem mainMenu__listItem--color6">
                    <NavLink className={isActive} to="/components" onClick={onClickMenuItem}>
                        <div className="mainMenu__innerListItem">
                            <span className="mainMenu__icon"><SettingsInputComponentOutlinedIcon/></span>
                            {t("components")}
                        </div>
                    </NavLink>
                </li>
                <li className="mainMenu__listItem">
                    <NavLink className={isActive} to="/experimental" onClick={onClickMenuItem}>
                        <div className="mainMenu__innerListItem">
                            <span className="mainMenu__icon"><ScienceOutlinedIcon/></span>
                            {t("experimental")}
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
)
});
