import {NavLink, useNavigate, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

import "./MobileMenu.scss";


export const MobileMenu = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const location = useLocation();
    const locationMobileMenu = location.pathname === "/mobile-menu";
    let navlink;
    if (locationMobileMenu) {
        navlink =
            <NavLink className="mobileMenu__navLink mobileMenu__navLink--active" to=".." onClick={(e) => {
                e.preventDefault();
                navigate(-1);
            }}>
                <span className="mobileMenu__iconCircle"></span>
                {t("close")}
            </NavLink>
    } else {
        navlink =
            <NavLink className="mobileMenu__navLink" to="/mobile-menu">
                <span className="mobileMenu__iconCircle"></span>
                {t("menu")}
            </NavLink>
    }

    return (
        <nav className="mobileMenu">
            <ul className="mobileMenu__list">
                <li className="mobileMenu__listItem">
                    {navlink}
                    <span className="mobileMenu__icon"></span>
                </li>
                <li className="mobileMenu__listItem">

                </li>
            </ul>
        </nav>
    )
}