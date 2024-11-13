import {OverviewLink} from "../components/Overview/OverviewLink.tsx";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

export const TasksScreen = () => {
    return (
        <OverviewLink
            card="tasks"
            icon={<TaskAltOutlinedIcon fontSize="large"/>}
            color="--color4"
            link={false}
            data={[{
                name: "users",
                value: 12458,
            }]}
        ></OverviewLink>
    );
};