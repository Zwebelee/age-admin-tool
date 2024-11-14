import {OverviewLink} from "../components/Overview/OverviewLink.tsx";
import "./OverviewScreen.scss";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";
import SettingsInputComponentOutlinedIcon from "@mui/icons-material/SettingsInputComponentOutlined";

export const OverviewScreen = () => {
    return (
        <div className="overviewScreen">
            <OverviewLink
                card="users"
                icon={<PeopleAltOutlinedIcon fontSize="large"/>}
                color="--color2"
                link={true}
                data={[{
                    name: "users",
                    value: 12458,
                }, {
                    name: "creators",
                    value: 1819,
                    maxValue: 4000
                }, {
                    name: "viewer",
                    value: 4895,
                    maxValue: 8000
                }]}
            ></OverviewLink>
            <OverviewLink
                card="contents"
                icon={<ContentCopyOutlinedIcon fontSize="large"/>}
                color="--color3"
                link={true}
                data={[{
                    name: "users",
                    value: 12458,
                }]}
            ></OverviewLink>
            <OverviewLink
                card="tasks"
                icon={<TaskAltOutlinedIcon fontSize="large"/>}
                color="--color4"
                link={true}
                data={[{
                    name: "users",
                    value: 12458,
                }]}
            ></OverviewLink>
            <OverviewLink
                card="groups"
                icon={<HolidayVillageOutlinedIcon fontSize="large"/>}
                color="--color5"
                link={true}
                data={[{
                    name: "users",
                    value: 12458,
                }]}
            ></OverviewLink>
            <OverviewLink
                card="components"
                icon={<SettingsInputComponentOutlinedIcon fontSize="large"/>}
                color="--color6"
                link={true}
                data={[{
                    name: "users",
                    value: 12458,
                }]}
            ></OverviewLink>
        </div>
    );
};