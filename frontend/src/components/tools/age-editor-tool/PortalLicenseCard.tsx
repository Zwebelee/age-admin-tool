import {observer} from "mobx-react-lite";
import {PortalLicense} from "../../../models/portallicense.ts";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import {useRootStore} from "../../../stores/root-store.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import {Loading} from "../../loading/Loading.tsx";

interface PortalLicenseCardProps {
    item: PortalLicense;
    isEditing?: boolean;
    isNew?: boolean;
    onCancel?: () => void;
}

export const PortalLicenseCard = observer(({
                                               item,
                                               isEditing: initialEditing = false,
                                               isNew: initialNew = false,
                                               onCancel
                                           }: PortalLicenseCardProps) => {

    const {portalLicenseStore} = useRootStore();
    // const defaultState = {...license};

    const [isEditing, setIsEditing] = useState(initialEditing);
    const [isNew, setIsNew] = useState(initialNew);
    const [state, setState] = useState({...item});
    const [deleting, setDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);


    const handleEditClick = () => {
        setIsEditing(!isEditing);
    }

    const handleCancelEditClick = () => {
        if (isNew) {
            setIsNew(false);
            setIsEditing(false);
            if (onCancel) {
                onCancel();
            }

        } else {
            setIsEditing(false);
            setState({...item});
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setState({...state, [id]: value});
    }

    const handleSave = () => {
        //TODO : if isNew -> save create item, otherwise update
        portalLicenseStore.updateItem(state);
        setIsEditing(false);
    }

    const handleDelete = () => {
        setDeleting(true);
        setTimeout(() => {
            portalLicenseStore.deleteItem(state).then(() => {
                setDeleting(false);
                setOpenDialog(false);
            }).catch(() => {
                setDeleting(false);
            });
        }, 1250);
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }


    return (
        <Card>
            <CardContent sx={{backgroundColor: 'grey'}}>
                {isEditing ? (
                    <>
                        <TextField
                            id="name"
                            label="Name"
                            value={state.name}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            id="description"
                            label="Description"
                            value={state.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                        />
                        <TextField
                            id="level"
                            label="Level"
                            value={state.level}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            id="state"
                            label="State"
                            value={state.state}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            id="maxusers"
                            label="Max Users"
                            type="number"
                            value={state.maxusers}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            id="currentusers"
                            label="Current Users"
                            type="number"
                            value={state.currentusers}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            id="id"
                            label="ID"
                            value={state.id}
                            disabled
                            fullWidth
                        />
                        <TextField
                            id="guid"
                            label="GUID"
                            value={state.guid}
                            disabled
                            fullWidth
                        />

                    </>
                ) : (
                    <>
                        <Typography variant="h6" component="div">
                            {state.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {state.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Level: {state.level}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            State: {state.state}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Max Users: {state.maxusers}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Current Users: {state.currentusers}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            ID: {state.id}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            GUID: {state.guid}
                        </Typography>

                    </>
                )}
            </CardContent>
            <CardActions>
                {isEditing && <Button variant={"contained"} onClick={handleSave}>Save</Button>}
                <Button variant={"contained"}
                        onClick={!isEditing ? handleEditClick : handleCancelEditClick}
                >{isEditing ? "Cancel" : "Edit"}</Button>
                {!isNew && <Button variant="contained" color="error" onClick={handleOpenDialog}>
                    {deleting ? <Loading/> : <DeleteIcon/>}
                </Button>}
            </CardActions>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you really want to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
})