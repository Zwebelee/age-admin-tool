import {LANGUAGES} from "../constants";
import {MenuItem} from "@mui/material";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {useRootStore} from "../stores/root-store.ts";
import {observer} from "mobx-react-lite";


export const LanguageSelector = observer(() => {
    const {languageStore} = useRootStore();

    const languages = LANGUAGES.map(
        ({code, label}) => ({
            value: code, label: label
        })
    );

    const onChangeLanguage = (e: SelectChangeEvent) => {
        const lang_code = e.target.value as "de" | "fr" | "en";
        languageStore.switchLanguage(lang_code);
    }

    return (
        <Select
            labelId="language-select-label"
            id="language-select"
            value={languageStore.language}
            onChange={onChangeLanguage}
        >
            {languages.map(item =>
                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
            )}
        </Select>)
});