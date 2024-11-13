import {OverviewLink} from "../components/Overview/OverviewLink.tsx";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";

export const GroupsScreen = () => {
    return (
        <OverviewLink
            card="groups"
            icon={<HolidayVillageOutlinedIcon fontSize="large"/>}
            color="--color5"
            link={false}
            data={[{
                name: "users",
                value: 12458,
            }]}
        ></OverviewLink>
    );
};