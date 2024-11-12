import {useTranslation} from "react-i18next";

import "./MobileMenu.scss";


export const MobileMenu = ({toggleMenu, onClickMenu}: {toggleMenu: boolean, onClickMenu: () => void}) => {
    const {t} = useTranslation();
    return (
        <nav className="mobileMenu">
            <ul className="mobileMenu__list">
                <li className="mobileMenu__listItem">
                    <button className={toggleMenu ? "mobileMenu__button mobileMenu__button--active" : "mobileMenu__button"} onClick={onClickMenu}>
                        <span className="mobileMenu__iconCircle">
                            <span className="mobileMenu__icon"></span>
                        </span>
                        {toggleMenu ? t("close") : t("menu")}
                    </button>
                </li>
            </ul>
        </nav>
    )
}