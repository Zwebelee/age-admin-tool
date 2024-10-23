import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const isActive = ({isActive}: { isActive: boolean }) => `${isActive ? "navLink active" : "navLink"}`;

export const MainMenu = () => {
    const {t} = useTranslation();
    return (
        <nav>
            <div>
                <ul>
                    <li>
                        <NavLink className={isActive} to="/">
                            {t("overview")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={isActive} to="/users">
                            {t("users")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={isActive} to="/contents">
                            {t("contents")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={isActive} to="/tasks">
                            {t("tasks")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={isActive} to="/groups">
                            {t("groups")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={isActive} to="/components">
                            {t("components")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={isActive} to="/experimental">
                            {t("experimental")}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}