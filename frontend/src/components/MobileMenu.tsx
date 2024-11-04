import {NavLink, useNavigate, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

import "./MobileMenu.scss";


export const MobileMenu = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const location = useLocation();
    const pathMobileMenu = location.pathname === "/mobile-menu";

    return (
        <nav className="mobileMenu">
            <ul className="mobileMenu__list">
                <li className="mobileMenu__listItem">
                    <NavLink
                        className={pathMobileMenu ? "mobileMenu__navLink mobileMenu__navLink--active" : "mobileMenu__navLink"}
                        to={pathMobileMenu ? ".." : "/mobile-menu"}
                        onClick={pathMobileMenu ? (e) => {
                            e.preventDefault();
                            navigate(-1);
                        } : () => {}}
                    >
                        <span className="mobileMenu__iconCircle">
                            <span className="mobileMenu__icon"></span>
                        </span>
                        {pathMobileMenu ? t("close") : t("menu")}
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}