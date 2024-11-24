import {LANGUAGES} from "../constants";
import {useTranslation} from "react-i18next";
import {MenuItem} from "@mui/material";
import Select, {SelectChangeEvent} from "@mui/material/Select";


export const LanguageSelector = () => {
    const {i18n} = useTranslation();

    const languages = LANGUAGES.map(
        ({code, label}) => ({
            value: code, label: label
        })
    );

    const onChangeLanguage = (e: SelectChangeEvent) => {
        const lang_code = e.target.value;
        i18n.changeLanguage(lang_code);
    }

    return (
        <Select
            labelId="language-select-label"
            id="language-select"
            value={i18n.language}
            label={i18n.t("language")}
            onChange={onChangeLanguage}
        >
            {languages.map(item =>
                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
            )}
        </Select>)
};