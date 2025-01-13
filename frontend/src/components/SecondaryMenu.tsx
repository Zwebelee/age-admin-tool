import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

import "./SecondaryMenu.scss";
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {observer} from "mobx-react-lite";
import {useRootStore} from "../stores/root-store";
import {usePermission} from "../hooks/usePermission.ts";
import {permissions} from "../config/permissions.ts";


export const SecondaryMenu = observer(({position, onClickMenuItem}: {
    position: string,
    onClickMenuItem: () => void
}) => {
    const {t} = useTranslation();
    const {toolUserStore} = useRootStore();
    const hasPermission = usePermission(permissions.VIEW_TASKS)
    const isActive = ({isActive}: {
        isActive: boolean
    }) => `${isActive ? "secondaryMenu__navLink secondaryMenu__navLink--active" : "secondaryMenu__navLink"}`;
    return (
        <nav className={"secondaryMenu " + position}>
            <ul className="secondaryMenu__list">
                {toolUserStore.userLoaded && hasPermission && (<li className="secondaryMenu__listItem">
                    <NavLink className={isActive} to="/utils" onClick={onClickMenuItem}>
                        <div className="secondaryMenu__innerListItem">
                            <span className="secondaryMenu__icon"><HomeRepairServiceOutlinedIcon/></span>
                            {t("tools.title")}
                        </div>
                    </NavLink>
                </li>)}
                <li className="secondaryMenu__listItem">
                    <NavLink className={isActive} to="/my-account" onClick={onClickMenuItem}>
                        <div className="secondaryMenu__innerListItem">
                            <span className="secondaryMenu__icon"><PersonOutlineOutlinedIcon/></span>
                            {t("my-account")}
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
});
