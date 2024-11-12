import Grid from "@mui/material/Grid2";
import {OverviewCard} from "../components/OverviewCard.tsx";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";
import SettingsInputComponentOutlinedIcon from "@mui/icons-material/SettingsInputComponentOutlined";

export const OverviewScreen = () => {
    return (
        <Grid container spacing={3}>
            <OverviewCard
                card="users"
                icon={ <PeopleAltOutlinedIcon fontSize="large" /> }
                color="--color2"
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
            ></OverviewCard>
            <OverviewCard
                card="contents"
                icon={ <ContentCopyOutlinedIcon fontSize="large" /> }
                color="--color3"
                data={[{
                    name: "users",
                    value: 12458,
                }]}
            ></OverviewCard>
            <OverviewCard
                card="tasks"
                icon={ <TaskAltOutlinedIcon fontSize="large" /> }
                color="--color4"
                data={[{
                    name: "users",
                    value: 12458,
                }]}
            ></OverviewCard>
            <OverviewCard
                card="groups"
                icon={ <HolidayVillageOutlinedIcon fontSize="large" /> }
                color="--color5"
                data={[{
                    name: "users",
                    value: 12458,
                }]}
            ></OverviewCard>
            <OverviewCard
                card="components"
                icon={ <SettingsInputComponentOutlinedIcon fontSize="large" /> }
                color="--color6"
                data={[{
                    name: "users",
                    value: 12458,
                }]}
            ></OverviewCard>
        </Grid>
    );
};