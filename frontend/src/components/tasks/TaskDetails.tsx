import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel, List, ListItem, ListItemText,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import {useRootStore} from "../../stores/root-store.ts";
import {useEffect, useState} from "react";
import {ToolUser} from "../../models/tooluser.ts";
import {TaskComment} from "../../models/taskcomment.ts";
import { SelectChangeEvent } from "@mui/material";

interface TaskDetailsDialogProps {
    open: boolean;
    onClose: () => void;
}

export const TaskDetailsDialog = ({open, onClose}: TaskDetailsDialogProps) => {

    const {taskStore, toolUserStore, taskCommentStore} = useRootStore();
    const task = taskStore.selectedItem;
    const [assignedTo, setAssignedTo] = useState(task?.assignedTo || "");
    const [toolUsers, setToolUsers] = useState<ToolUser[]>([]);
    const [taskComments, setTaskComments] = useState<TaskComment[]>([]);

    //TODO: Solve better -> on stores

    // Load all users
    useEffect(() => {
        toolUserStore.loadUsers().then(() => {
            const users = toolUserStore.users;
            if (users) {
                setToolUsers(users);
            }
        });
    }, [toolUserStore]);

    // Load task comments
    useEffect(() => {
        //TODO: load only comments for selected task
        if (task) {
            const comments = Array.from(taskCommentStore.items.values());
            setTaskComments(comments);
        }
    }, [task, taskCommentStore]);


    const handleAssignedToChange = (event: SelectChangeEvent) => {
        setAssignedTo(event.target.value as string);
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Task Details</DialogTitle>
            <DialogContent>
                {task ? (
                    <>
                        <Typography>ID: {task.guid}</Typography>
                        <Typography>Title: {task.title}</Typography>
                        <Typography>Description: {task.description}</Typography>
                        <Typography>Status: {task.status}</Typography>
                        <Typography>Priority: {task.priority}</Typography>
                        <Typography>Assigned To: {task.assignedTo}</Typography>
                        <Typography>Created At: {"task.createdAt.toString()"}</Typography>
                        <Typography>Updated At: {"task.updatedAt.toString()"}</Typography>
                        <Typography>Linked Object GUID: {task.linkedObjectGuid}</Typography>
                        <Typography>Linked Object Type: {task.linkedObjectType}</Typography>
                        <Typography>Task Rule GUID: {task.taskRuleGuid}</Typography>

                        <form>
                            <FormControl>
                                <FormControlLabel
                                    control={<Checkbox name="completed"/>}
                                    label="Completed"
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <Select
                                    value={assignedTo}
                                    onChange={handleAssignedToChange}
                                    displayEmpty
                                    inputProps={{'aria-label': 'Assigned To'}}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {toolUsers.map(user => (
                                        <MenuItem key={user.guid} value={user.guid}>
                                            {user.username}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </form>
                        <Typography variant="h6">Comments</Typography>
                        <List>
                            {taskComments.map(comment => (
                                <ListItem key={comment.guid}>
                                    <ListItemText
                                        primary={comment.comment}
                                        secondary={`By ${toolUsers.find(user => user.guid === comment.tooluserGuid)?.username || 'Unknown'} on ${new Date(comment.createdAt).toLocaleString()}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Button variant={"contained"}>add a new comment</Button>


                    </>
                ) : (
                    <Typography>Invalid Task</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
