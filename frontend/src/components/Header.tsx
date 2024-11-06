import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {SecondaryMenu} from "./SecondaryMenu.tsx";
import {MobileMenu} from "./MobileMenu.tsx";

import "./Header.scss";
import logoLight from "../assets/logoLight-kantonLuzern.svg";
import logoDark from "../assets/logoDark-kantonLuzern.svg";



export const Header = ({ toggleTheme, toggleMenu, onClickMenu, onClickLogo }: { toggleTheme: boolean, toggleMenu: boolean, onClickMenu: () => void, onClickLogo: () => void}) => {
    const {t} = useTranslation()
    const logo = toggleTheme ? logoLight : logoDark;
    return (
        <div className="header">
            <NavLink to="/" onClick={onClickLogo}>
                <img src={logo} alt="Logo Kanton Luzern" className="logo"/>
            </NavLink>
            <h1>{t("app-title")}</h1>
            <SecondaryMenu position="secondaryMenuDesktop" onClickMenuItem={() => {}}/>
            <MobileMenu toggleMenu={toggleMenu} onClickMenu={onClickMenu}/>
        </div>
    )
}