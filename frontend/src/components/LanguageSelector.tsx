import {LANGUAGES} from "../constants";
import {useTranslation} from "react-i18next";
import "./LanguageSelector.scss";


export const LanguageSelector = () => {
    const {i18n} = useTranslation();

    const onChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang_code = e.target.value;
        i18n.changeLanguage(lang_code);
    }

    return (
        <select defaultValue={"en"} onChange={onChangeLanguage}>
            {LANGUAGES.map(({code, label}) => (
                <option key={code} value={code}>
                    {label}
                </option>
            ))}
        </select>
    );
};