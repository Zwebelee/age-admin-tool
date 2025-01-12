import {OverviewBox} from "../components/overview/OverviewBox.tsx";
import {InsideBox} from "../components/inside/InsideBox.tsx";
import {NoFilters} from "../components/inside/filters/NoFilters.tsx";
import {useRootStore} from "../stores/root-store.ts";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import {TaskDetailsDialog} from "../components/tasks/TaskDetails.tsx";
import {useTranslation} from "react-i18next";
import {Button} from "@mui/material";
import {GridColDef} from "@mui/x-data-grid";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";


export const TasksScreen = observer(() => {
    
    const {t} = useTranslation();
    const {taskStore} = useRootStore()
    const [open, setOpen] = useState(false);

    const handleDialogOpen = (guid: string) => {
        const selectedTask = taskStore.items.get(guid);
        if (selectedTask) {
            taskStore.setSelectedItem(selectedTask);
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
        taskStore.resetSelectedItem();
    };

    const detailButton = (params: any) => {
        return (
            <Button
                size="small"
                variant="contained"
                onClick={() => handleDialogOpen(params.row.guid)}
            ><InfoOutlinedIcon/></Button>
        );
    };

    const rows = taskStore.visibleItems.map((item) => ({
        id: item.guid,
        ...item,
    }));

    const columns: GridColDef[] = [
        { field: "id",                 headerName: "ID",                         width: 320 },
        { field: "guid",               headerName: "GUID",                       width: 320 },
        { field: "taskRuleGuid",       headerName: t("task-rule-guid"),          width: 320 },
        { field: "details",            headerName: t("details"),                 width: 85, renderCell: detailButton },
        { field: "title",              headerName: t("title"),                   width: 320 },
        { field: "description",        headerName: t("description"),             width: 550 },
        { field: "status",             headerName: t("status"),                  width: 180 },
        { field: "priority",           headerName: t("priority"),                width: 180 },
        { field: "assignedTo",         headerName: t("assigned-to"),             width: 320 },
        { field: "createdAt",          headerName: t("created"),                 width: 280 },
        { field: "updatedAt",          headerName: t("modified"),                width: 280 },
        { field: "linkedObjectGuid",   headerName: t("linked-object-guid"),      width: 320 },
        { field: "linkedObjectType",   headerName: t("linked-object-type"),      width: 240 },

    ];

    const hiddenColumns = {
        id: false,
        guid: false,
        taskRuleGuid: false,
        linkedObjectGuid: false,
        linkedObjectType: false,
    }

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
                rows={rows}
                columns={columns}
                hiddenColumns={hiddenColumns}
                filter={<NoFilters/>}
            ></InsideBox>
            <TaskDetailsDialog open={open} onClose={handleClose}/>
        </>
    );
});
