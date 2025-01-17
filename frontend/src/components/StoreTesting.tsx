import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    CircularProgress,
    SelectChangeEvent,
} from "@mui/material";
import {useRootStore} from "../stores/root-store.ts";
import {observer} from "mobx-react-lite";
import {PortalLicense} from "../models/portallicense.ts";
import {useEffect, useState} from "react";
import {PortalLicenseFilter} from "./portallicense-filter.tsx";
import {Task} from "../models/task.ts";
import {TaskRule} from "../models/taskrule.ts";
import {TaskComment} from "../models/taskcomment.ts";
import { permissions } from "../config/permissions.ts";
import {usePermission} from "../hooks/usePermission.ts";


export const TestStoreComponent = observer(() => {
    return (
        <Box>
            <Typography variant="h3">TestStoreComponent</Typography>
            <TestAgeStore/>
            <TestLicenseStore/>
            <PortalLicenseFilter/>
            <TestAddLicense/>
            <TestUpdateLicense/>
            <TestGeneralStore/>
            <TestStore/>
            <TestPermissions/>
        </Box>
    );
});

export const TestAgeStore = observer(() => {
    const rootstore = useRootStore();
    const ageStore = rootstore.ageStore;

    if (ageStore.isLoading) {
        return <CircularProgress/>;

    }

    if (ageStore.isLoaded) {
        return (
            <Box sx={{border: "0.1875rem solid blue", margin: "0.125rem", padding: "0.625rem", borderRadius: "0.5rem"}}>
                <Typography variant="h5">AGE Store</Typography>
                <Typography variant="body1">Age: {ageStore.age?.guid}</Typography>
                <Typography variant="body1">Age: {ageStore.age?.alias}</Typography>
            </Box>
        )
    }

    return <Typography variant="body1">Error loading data</Typography>
});

export const TestLicenseStore = observer(() => {
    const rootstore = useRootStore();
    const licenseStore = rootstore.portalLicenseStore;

    if (licenseStore.isLoading) {
        return <CircularProgress/>;
    }

    if (licenseStore.isLoaded) {
        return (
            <Box sx={{border: "0.1875rem solid blue", margin: "0.125rem", padding: "0.625rem", borderRadius: "0.5rem"}}>
                <Typography variant="h5">License Store</Typography>
                {Array.from(licenseStore.items.values()).map((item) => {
                    return (
                        <Typography key={item.guid}
                                    variant="body1">License: {item.name}: {item.currentusers}/{item.maxusers}</Typography>
                    )
                })}
            </Box>
        )
    }

    return <Typography variant="body1">Error loading data</Typography>
});

export const TestAddLicense = observer(() => {
    const rootstore = useRootStore();
    const licenseStore = rootstore.portalLicenseStore;


    const newLicesnse: PortalLicense = {
        class: "",
        id: "",
        level: "",
        state: "",
        guid: '123',
        name: 'New License',
        currentusers: 0,
        maxusers: 10
    }

    return (
        <Box>
            <Typography variant="h5">Add License</Typography>
            <button onClick={() => licenseStore.addItem(newLicesnse)}>Add License</button>
        </Box>
    )
})

// compontent which lets us pick and update and portallicense

export const TestUpdateLicense = observer(() => {
    const rootstore = useRootStore();
    const licenseStore = rootstore.portalLicenseStore;
    const [selectedLicense, setSelectedLicense] = useState<PortalLicense | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        level: "",
        state: "",
        maxusers: 0,
        currentusers: 0
    });

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const license = licenseStore.items.get(event.target.value as string);
        if (license) {
            setSelectedLicense(license);
            setFormData({
                name: license.name,
                description: license.description || "",
                level: license.level,
                state: license.state,
                maxusers: license.maxusers,
                currentusers: license.currentusers
            });
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = () => {
        if (selectedLicense) {
            const updatedLicense = {...selectedLicense, ...formData};
            licenseStore.updateItem(updatedLicense);
        }
    };

    const handleDelete = () => {
        if (selectedLicense) {
            licenseStore.deleteItem(selectedLicense);
            setSelectedLicense(null);
            setFormData({
                name: "",
                description: "",
                level: "",
                state: "",
                maxusers: 0,
                currentusers: 0
            });
        }
    };

    return (
        <Box>
            <Typography variant="h5">Update / Delete a License</Typography>
            <FormControl fullWidth>
                <InputLabel id="license-select-label">Select License</InputLabel>
                <Select sx={{mt: 1, backgroundColor: 'grey'}}
                        labelId="license-select-label"
                        value={selectedLicense ? selectedLicense.guid : ""}
                        onChange={handleSelectChange}
                >
                    {Array.from(licenseStore.items.values()).map((license) => (
                        <MenuItem sx={{backgroundColor: 'grey'}} key={license.guid} value={license.guid}>
                            {license.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedLicense && (
                <Box component="form" sx={{mt: 2, backgroundColor: 'grey'}}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Level"
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Max Users"
                        name="maxusers"
                        type="number"
                        value={formData.maxusers}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Current Users"
                        name="currentusers"
                        type="number"
                        value={formData.currentusers}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdate} sx={{mt: 2}}>
                        Update License
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete} sx={{mt: 2, ml: 2}}>
                        Delete License
                    </Button>
                </Box>
            )}
        </Box>
    );
});

export const TestGeneralStore = observer(() => {
    const rootstore = useRootStore();
    const store = rootstore.ageDataStoreStore;
    const log = rootstore.logService

    if (store.isLoading) {
        return <CircularProgress/>;
    }

    if (store.isLoaded) {
        log.info("Datastore store loaded")
        console.log(store.items)
        return <Typography>hi</Typography>

    }

})

export const TestStore = observer(() => {
    const {taskStore,taskRuleStore, taskCommentStore} = useRootStore();
    console.log("itemcount", taskStore.visibleItems.length);
    console.log("commentcoiunt", taskCommentStore.visibleItems.length);


    const handleClick = ()=>{
        console.log('test')
    }


    return (
        <>
            <Typography>Test</Typography>
            {taskStore.visibleItems.map((item) => {
                return (
                    <Typography key={item.guid} variant="body1">{item.guid}</Typography>
                )
            })}
            <Typography>{taskRuleStore.visibleItems.length}</Typography>
            {taskRuleStore.visibleItems.map((item) => {
                return (
                    <Typography key={item.guid} variant="body1">{item.guid}</Typography>
                )})}
            <Typography>{taskCommentStore.visibleItems.length}</Typography>
            <Button variant={"contained"} onClick={handleClick}>Click</Button>
            <TaskDetails taskId={"1"}></TaskDetails>
        </>
    );
})


const TaskDetails = observer(({ taskId }: { taskId: string }) => {
    const { taskStore, taskRuleStore, taskCommentStore } = useRootStore();
    const [task, setTask] = useState<Task | null>(null);
    const [taskRule, setTaskRule] = useState<TaskRule | null>(null);
    const [comments, setComments] = useState<TaskComment[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTask = taskStore.items.get(taskId);
            if (fetchedTask) {
                setTask(fetchedTask);
                const fetchedTaskRule = taskRuleStore.items.get(String(fetchedTask.taskRuleGuid));
                if (fetchedTaskRule) {
                    setTaskRule(fetchedTaskRule);
                }
                const fetchedComments = Array.from(taskCommentStore.items.values()).filter(comment => String(comment.guid) === taskId);
                setComments(fetchedComments);
            }
        };
        fetchData();
    }, [taskId, taskStore, taskRuleStore, taskCommentStore]);

    if (!task) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h5">Task Details</Typography>
            <Typography variant="body1">Task ID: {task.guid}</Typography>
            <Typography variant="body1">Task Name: {task.title}</Typography>
            {taskRule && (
                <>
                    <Typography variant="h6">Task Rule</Typography>
                    <Typography variant="body1">Rule ID: {taskRule.guid}</Typography>
                    <Typography variant="body1">Rule Name: {taskRule.name}</Typography>
                </>
            )}
            <Typography variant="h6">Comments</Typography>
            {comments.map(comment => (
                <Box key={comment.guid} sx={{ mt: 2 }}>
                    <Typography variant="body2">Comment ID: {comment.guid}</Typography>
                    <Typography variant="body2">Comment: {comment.comment}</Typography>
                </Box>
            ))}
        </Box>
    );
});

const TestPermissions = observer(() => {
    //TODO: (A) continue crawlback here

    const hasPermission = usePermission(permissions.VIEW_TASKS);

    return (
        <>
            <Typography variant="h5">Permission Test</Typography>
            <Typography variant="h6">Test see this button</Typography>
            {!hasPermission ? (
                <Button variant="contained" color="error">Nope</Button>
            ):(
            <Button variant="contained" color={"success"}>Yes - Permission Granted</Button>)}
        </>
    );
});