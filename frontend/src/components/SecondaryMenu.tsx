import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


const isActive = ({isActive}: { isActive: boolean }) => `${isActive ? "secondaryMenu__navLink secondaryMenu__navLink--active" : "secondaryMenu__navLink"}`;

export const SecondaryMenu = () => {
    const {t} = useTranslation();
    return (
        <nav className="secondaryMenu">
            <div>
                <ul className="secondaryMenu__List">
                    <li className="secondaryMenu__ListItem">
                        <NavLink className={isActive} to="/tools">
                            <span className="secondaryMenu__icon"><HomeRepairServiceOutlinedIcon/></span>
                            {t("tools")}
                        </NavLink>
                    </li>
                    <li className="secondaryMenuListItem">
                        <NavLink className={isActive} to="/my-account">
                            <span className="secondaryMenu__icon"><PersonOutlineOutlinedIcon/></span>
                            {t("my-account")}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}