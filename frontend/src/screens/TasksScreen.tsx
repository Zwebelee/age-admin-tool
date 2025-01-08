import {OverviewBox} from "../components/overview/OverviewBox.tsx";
import {InsideBox} from "../components/inside/InsideBox.tsx";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import {NoFilters} from "../components/inside/filters/NoFilters.tsx";
import {useRootStore} from "../stores/root-store.ts";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import {TaskDetailsDialog} from "../components/tasks/TaskDetails.tsx";
import {useTranslation} from "react-i18next";
import {Button} from "@mui/material";
import {GridColDef} from "@mui/x-data-grid";

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
        return <Button variant="contained" onClick={() => handleDialogOpen(params.row.guid)}>Details</Button>;
    };

    const rows = taskStore.visibleItems.map((item) => ({
        id: item.guid,
        ...item,
    }));

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "details", headerName: 'Details', width: 180, renderCell: detailButton },
        { field: "title", headerName: t('title'), width: 180 },
        { field: "description", headerName: t('description'), width: 180 },
        { field: "status", headerName: t('status'), width: 180 },
        { field: "priority", headerName: t('priority'), width: 180 },
        { field: "assigned_to", headerName: t('assignedTo'), width: 180 },
        { field: "created_at", headerName: t('createdAt'), width: 180 },
        { field: "updated_at", headerName: t('updatedAt'), width: 180 },
        { field: "linked_object_guid", headerName: t('linkedObjectGuid'), width: 180 },
        { field: "linked_object_type", headerName: t('linkedObjectType'), width: 180 },
        { field: "guid", headerName: "GUID", width: 180 },
        { field: "task_rule_guid", headerName: t('taskRuleGuid'), width: 180 },

    ];

    const hiddenColumns = {
        id: false,
        created_at: false,
        updated_at: false,
        linked_object_guid: false,
        linked_object_type: false,
        guid: false,
        task_rule_guid: false,
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
