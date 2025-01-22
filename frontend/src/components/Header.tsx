import {NavLink} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {SecondaryMenu} from "./SecondaryMenu.tsx";
import {MobileMenu} from "./MobileMenu.tsx";

import "./Header.scss";
import logoLight from "../assets/logoLight-kantonLuzern.svg";
import logoDark from "../assets/logoDark-kantonLuzern.svg";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../stores/root-store.ts";

interface IHeader {
    toggleMenu: boolean;
    onClickMenu: () => void;
    onClickLogo: () => void;
}

export const Header = observer((
    {toggleMenu, onClickMenu, onClickLogo}: IHeader) => {
    const {themeStore} = useRootStore()
    const {t} = useTranslation()
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    const logo = themeStore.theme === 'light' ? logoLight : logoDark;
    return (
        <div className="header">
            <div className="header__logo">
                <NavLink to="/" onClick={onClickLogo} className="header__logoLink">
                    <img src={logo} alt="Logo Kanton Luzern" className="header__logoImg"/>
                </NavLink>
            </div>
            <div className="header__title">
                <h1 className="header__name">{t("app-title")}</h1>
            </div>
            <div className="header__menu">
                {!isLoginPage && <SecondaryMenu position="secondaryMenuDesktop" onClickMenuItem={() => {
                }}/>}
                {!isLoginPage && <MobileMenu toggleMenu={toggleMenu} onClickMenu={onClickMenu}/>}
            </div>
        </div>
    )
})