import {OverviewBox} from "../components/overview/OverviewBox.tsx";
import {InsideBox} from "../components/inside/InsideBox.tsx";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

export const TasksScreen = () => {
    return (
        <>
            <OverviewBox
                card="tasks"
                icon={<TaskAltOutlinedIcon fontSize="large"/>}
                color="--color4"
                link={false}
                data={[{
                    name: "users",
                    value: 12458,
                }]}
            ></OverviewBox>
            <InsideBox
                color="--color4"
            ></InsideBox>
        </>
    );
};