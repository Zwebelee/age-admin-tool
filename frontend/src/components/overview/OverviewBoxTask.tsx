import {observer} from "mobx-react-lite";
import {OverviewBox} from "./OverviewBox.tsx";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

export const OverviewBoxTask = observer(() => {
    const taskCardProps = {
        card: "tasks",
        icon: <TaskAltOutlinedIcon fontSize="large"/>,
        color: "--color4",
        link: true,
        data: [{
            name: "Critical",
            value: 4,
        }, {
            name: "Warning",
            value: 14,
        }, {
            name: "Information",
            value: 31,
        }, {
            name: "News",
            value: 3,
        }]
    }

    return <OverviewBox {...taskCardProps}/>
})