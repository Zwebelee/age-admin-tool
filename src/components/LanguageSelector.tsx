import {NavLink} from "react-router-dom";
import {LANGUAGES} from "../constants";
import {useTranslation} from "react-i18next";

const isActive = ({isActive}: any) => `link ${isActive ? "active" : ""}`;


export const LanguageSelector = () => {
    const {i18n, t} = useTranslation();

    const onChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang_code = e.target.value;
        i18n.changeLanguage(lang_code);
    }

    return (
        <nav>
            <div>
                <ul>
                    <li>
                        <NavLink className={isActive} to="/">
                            {t("home")}
                        </NavLink>
                    </li>
                    <li><NavLink className={isActive} to="/about">
                        {t("about")}
                    </NavLink>
                    </li>
                </ul>
            </div>
            <select defaultValue={"en"} onChange={onChangeLanguage}>
                {LANGUAGES.map(({code, label}) => (
                    <option key={code} value={code}>
                        {label}
                    </option>
                ))}
            </select>
        </nav>
    );
};