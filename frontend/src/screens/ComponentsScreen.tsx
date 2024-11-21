import {OverviewBox} from "../components/Overview/OverviewBox.tsx";
import SettingsInputComponentOutlinedIcon from "@mui/icons-material/SettingsInputComponentOutlined";

export const ComponentsScreen = () => {
    return (
        <OverviewBox
            card="components"
            icon={<SettingsInputComponentOutlinedIcon fontSize="large"/>}
            color="--color6"
            link={false}
            data={[{
                name: "users",
                value: 12458,
            }]}
        ></OverviewBox>
    );
};