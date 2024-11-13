import {OverviewLink} from "../components/Overview/OverviewLink.tsx";
import SettingsInputComponentOutlinedIcon from "@mui/icons-material/SettingsInputComponentOutlined";

export const ComponentsScreen = () => {
    return (
        <OverviewLink
            card="components"
            icon={<SettingsInputComponentOutlinedIcon fontSize="large"/>}
            color="--color6"
            link={false}
            data={[{
                name: "users",
                value: 12458,
            }]}
        ></OverviewLink>
    );
};