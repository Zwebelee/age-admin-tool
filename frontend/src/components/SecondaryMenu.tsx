import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


const isActive = ({isActive}: { isActive: boolean }) => `${isActive ? "navLink active" : "navLink"}`;

export const SecondaryMenu = () => {
    const {t} = useTranslation();
    return (
        <nav className="secondaryMenu">
            <div>
                <ul className="secondaryMenuList">
                    <li className="secondaryMenuListItem">
                        <NavLink className={isActive} to="/tools">
                            <span className="secondaryMenuListIcon"><HomeRepairServiceOutlinedIcon/></span>
                            {t("tools")}
                        </NavLink>
                    </li>
                    <li className="secondaryMenuListItem">
                        <NavLink className={isActive} to="/my-account">
                            <span className="secondaryMenuListIcon"><PersonOutlineOutlinedIcon/></span>
                            {t("my-account")}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}