import {OverviewBox} from "../components/overview/OverviewBox.tsx";
import {InsideBox} from "../components/inside/InsideBox.tsx";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";

export const GroupsScreen = () => {
    return (
        <>
            <OverviewBox
                card="groups"
                icon={<HolidayVillageOutlinedIcon fontSize="large"/>}
                color="--color5"
                link={false}
                data={[{
                    name: "users",
                    value: 12458,
                }]}
            ></OverviewBox>
            <InsideBox
                color="--color5"
            ></InsideBox>
        </>
    );
};