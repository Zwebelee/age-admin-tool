import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel, FormLabel, List, ListItem, ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {useRootStore} from "../../stores/root-store.ts";
import React, {useEffect, useState} from "react";
import {ToolUser} from "../../models/tooluser.ts";
import {TaskComment} from "../../models/taskcomment.ts";
import {SelectChangeEvent} from "@mui/material";
import {useTranslation} from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./TaskDetails.scss";
import {observer} from "mobx-react-lite";
import {Task} from "../../models/task.ts";


interface TaskDetailsDialogProps {
    open: boolean;
    onClose: () => void;
}


export const TaskDetailsDialog = observer(({open, onClose}: TaskDetailsDialogProps) => {

    const {t} = useTranslation();
    const {taskStore, toolUserStore, taskCommentStore} = useRootStore();
    const task = taskStore.selectedItem;
    const [toolUsers, setToolUsers] = useState<ToolUser[]>([]);
    const [taskComments, setTaskComments] = useState<TaskComment[]>([]);
    const [assignedToUser, setAssignedToUser] = useState<ToolUser | undefined>(undefined);
    const [newComment, setNewComment] = useState<string>("");

    //TODO: Solve better -> user Loading and Profile Loading should be on stores and not in a useEffect
    useEffect(() => {
        toolUserStore.loadUsers().then(() => {
            const users = toolUserStore.users;
            if (users) {
                setToolUsers(users);
                if (task?.assignedTo) {
                    const assignedToUser = users.find(user => user.guid === task.assignedTo);
                    setAssignedToUser(assignedToUser);
                }
            }
        });
    }, [toolUserStore, task]);

    // Load task comments
    useEffect(() => {
        const loadComments = async () => {
            if (task) {
                await taskCommentStore.loadTaskComments(task.guid);
                const comments = Array.from(taskCommentStore.items.values());
                comments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
                setTaskComments(comments);
            }
        };
        loadComments().then();
        return () => {
            setTaskComments([]);
            setAssignedToUser(undefined);
            taskCommentStore.clearItems();
        };
    }, [task, taskCommentStore]);


    const handleAssignedToChange = async (event: SelectChangeEvent) => {
        const newAssignedTo = event.target.value as string;

        if (task) {
            await taskStore.updateItem(new Task({
                ...task.toJSON(),
                assigned_to: newAssignedTo
            }));
            // Update the local state to trigger re-render
            taskStore.setSelectedItem(Task.fromJSON({
                ...task.toJSON(),
                assigned_to: newAssignedTo
            }));
        }

    };

    const handleCompletedChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!task) {
            return;
        }
        const newStatus = event.target.checked ? "done" : "pending";
        await taskStore.updateItem(Task.fromJSON({
            ...task.toJSON(),
            status: newStatus
        }));
        // Update the local state to trigger re-render
        taskStore.setSelectedItem(Task.fromJSON({
            ...task.toJSON(),
            status: newStatus
        }));
    };

    const handleNewCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const handleAddComment = async () => {
        if (task && newComment.trim()) {
            const newTaskComment = new TaskComment({
                guid: "",
                taskId: task.guid,
                comment: newComment,
                tooluserGuid: toolUserStore.user?.guid || "",
                createdAt: new Date(),
            });

            await taskCommentStore.addTaskComment(task.guid, newTaskComment);
            setTaskComments([...taskComments, newTaskComment]);
            setNewComment("");
        }
    };


    return (
        <Dialog
            className="taskDetails"
            open={open}
            onClose={onClose}
        >
            <DialogTitle>{t("task-details")}</DialogTitle>
            <DialogContent>
                {task ? (
                    <>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography component="span">{t("task-information")}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List
                                    className="taskDetails__list"
                                    sx={{listStyleType: "disc"}}>
                                    <ListItem>
                                        <ListItemText
                                            primary="ID"
                                            secondary={task.guid}
                                            sx={{display: "list-item"}}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={t("title")}
                                            secondary={task.title}
                                            sx={{display: "list-item"}}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={t("description")}
                                            secondary={task.description}
                                            sx={{display: "list-item"}}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={t("priority")}
                                            secondary={task.priority}
                                            sx={{display: "list-item"}}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={t("assigned-to")}
                                            secondary={assignedToUser?.username}
                                            sx={{display: "list-item"}}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={t("created")}
                                            secondary={task.createdAt.toString()}
                                            sx={{display: "list-item"}}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={t("modified")}
                                            secondary={task.updatedAt.toString()}
                                            sx={{display: "list-item"}}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={t("linked-object-guid")}
                                            secondary={task.linkedObjectGuid}
                                            sx={{display: "list-item"}}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={t("linked-object-type")}
                                            secondary={task.linkedObjectType}
                                            sx={{display: "list-item"}}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={t("task-rule-guid")}
                                            secondary={task.taskRuleGuid}
                                            sx={{display: "list-item"}}
                                        />
                                    </ListItem>
                                </List>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Typography component="span">{t("task-edit")}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <form>
                                    <FormControl sx={{marginBottom: "1rem"}}>
                                        <FormLabel component="legend">{t("status")}</FormLabel>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="completed"
                                                    checked={task.status === "done"}
                                                    onChange={handleCompletedChange}
                                                />}
                                            label={t("completed")}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <FormLabel component="legend"
                                                   sx={{marginBottom: "0.5rem"}}>{t("assigned-to")}</FormLabel>
                                        <Select
                                            value={assignedToUser?.guid || ""}
                                            onChange={handleAssignedToChange}
                                            displayEmpty
                                            inputProps={{"aria-label": "Assigned To"}}
                                        >
                                            <MenuItem value="">
                                                <em>{t("no-one")}</em>
                                            </MenuItem>
                                            {toolUsers.map(user => (
                                                <MenuItem key={user.guid} value={user.guid}>
                                                    {user.username}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </form>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                <Typography component="span">{t("task-comments")}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List
                                    sx={{listStyleType: "disc"}}
                                >
                                    {taskComments.length > 0 ? (
                                        taskComments.map((comment, index) => (
                                            <ListItem key={`${comment.guid}-${index}`}>
                                                <ListItemText
                                                    primary={comment.comment}
                                                    secondary={`By ${toolUsers.find(user => user.guid === comment.tooluserGuid)?.username || "Unknown"} on ${new Date(comment.createdAt).toLocaleString()}`}
                                                    sx={{display: "list-item"}}
                                                />
                                            </ListItem>
                                        ))
                                    ) : (
                                        <ListItem>
                                            <ListItemText
                                                primary={`${t("none")} ${t("task-comments")}`}
                                                sx={{display: "list-item"}}
                                            />
                                        </ListItem>
                                    )}
                                </List>
                                <TextField
                                    label={t("new-comment")}
                                    value={newComment}
                                    onChange={handleNewCommentChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    sx={{marginTop: "1rem"}}
                                />
                                <div className="taskDetails__commentButton">
                                    <Button variant={"contained"} onClick={handleAddComment}>
                                        {t("actions.add.title")}
                                    </Button>
                                </div>
                            </AccordionDetails>
                        </Accordion>

                    </>
                ) : (
                    <Typography>Invalid Task</Typography>
                )}
            </DialogContent>
            <DialogActions
                className="taskDetails__closeButton"
            >
                <Button
                    size="small"
                    endIcon={<CloseOutlinedIcon/>}
                    onClick={onClose}
                >{t("actions.close")}</Button>
            </DialogActions>
        </Dialog>
    );
});
