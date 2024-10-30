import {LanguageSelector} from "./LanguageSelector.tsx";
import {Switch} from "@mui/material";

export const UserSettings = ({ toggleTheme, onChange }: { toggleTheme: boolean; onChange: () => void }) => {
    return (
        <>
            <LanguageSelector/>
            <br/>
            <p>Dark <Switch checked={toggleTheme} onChange={onChange}/> Light</p>
        </>
    )
}