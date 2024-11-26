import {OverviewBox} from "../components/overview/OverviewBox.tsx";
import {InsideBox} from "../components/inside/InsideBox.tsx";
import SettingsInputComponentOutlinedIcon from "@mui/icons-material/SettingsInputComponentOutlined";

export const ComponentsScreen = () => {
    return (
        <>
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
            <InsideBox
                color="--color6"
            ></InsideBox>
        </>
    );
};