import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {useTranslation} from "react-i18next";
import "./DataFilters.scss";


export const DataFilters = () => {
    const {t} = useTranslation();
    return (
        <div className="dataFilters">
            <h3 className="dataFilters__title">{t("filters")}</h3>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("role")}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label={t("role")}
                    // onChange={handleChange}
                >
                    <MenuItem value={10}>Admin</MenuItem>
                    <MenuItem value={20}>User</MenuItem>
                    <MenuItem value={30}>Guest</MenuItem>
                    <MenuItem value={30}>Editor</MenuItem>
                    <MenuItem value={30}>Contributor</MenuItem>
                </Select>
            </FormControl>

        </div>

    );
};