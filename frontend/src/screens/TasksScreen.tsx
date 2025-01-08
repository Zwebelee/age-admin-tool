import {OverviewBox} from "../components/overview/OverviewBox.tsx";
import {InsideBox} from "../components/inside/InsideBox.tsx";
import {NoFilters} from "../components/inside/filters/NoFilters.tsx";
import {NoCharts} from "../components/inside/charts/NoCharts.tsx";
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
                }]}
            ></OverviewBox>
            <InsideBox
                color="--color4"
                rows={[]}
                columns={[]}
                hiddenColumns={[]}
                filter={<NoFilters/>}
                charts={<NoCharts/>}
            ></InsideBox>
        </>
    );
};