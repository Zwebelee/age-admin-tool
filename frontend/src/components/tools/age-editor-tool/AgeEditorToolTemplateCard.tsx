import {
    Button,
    Card,
    TextField,
    Typography,
    CardContent,
    CardActions,
    Dialog,
    DialogTitle,
    DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import {PortalLicense} from "../../../models/portallicense.ts";
import {PortalLicenseStore} from "../../../stores/portallicense-store.ts";
import {Loading} from "../../loading/Loading.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {AgeDataStore} from "../../../models/age-datastore.ts";
import {AgeDatastoreStoreStore} from "../../../stores/age-datastore-store.ts";

type inputItems = PortalLicense | AgeDataStore
type inputStores = PortalLicenseStore | AgeDatastoreStoreStore

interface AgeEditorToolTemplateCardProps {
    item: inputItems;
    isEditing: boolean;
    isNew: boolean;
    onCancel: () => void;
    store: inputStores;
    fields: { name: string, label: string, type: string, disabled: boolean }[];
}


export const AgeEditorToolTemplateCard = observer((props: AgeEditorToolTemplateCardProps) => {

    const {item, onCancel, store, fields} = props;

    const [localItem, setLocalItem] = useState({...item});
    const [isEditing, setIsEditing] = useState(props.isEditing);
    const [isNew, setIsNew] = useState(props.isNew);
    const [deleting, setDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target
        setLocalItem({...localItem, [id]: value});
    };

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
            setLocalItem({...item});
        }
    }

    const handleSave = () => {
        if (isNew) {
            //create a new item
            store.addItem(localItem).then(() => {
                setIsNew(false);
                setIsEditing(false);
                if (onCancel) {
                    onCancel();
                }
            }).catch((e) => {
                console.error('error during save', e);
            });
        } else {
            //update
            store.updateItem(localItem).then(() => {
                setIsEditing(false)
            }).catch(() => {
                setIsEditing(false);
            });
        }
    }

    const handleDelete = () => {
        setDeleting(true);
        setTimeout(() => {
            store.deleteItem(localItem).then(() => {
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


    const viewContent = (
        <>
            {fields.map((field, index) => (
                <Typography
                    key={index}
                    variant={index === 0 ? "h6" : "body2"}
                >{index === 0 ? "" : `${field.label}: `} {localItem[field.name as keyof inputItems]}</Typography>
            ))}
        </>
    )

    const editContent = (
        <>
            {fields.map((field, index) => (
                <Grid sx={{xs: 12}} key={index}>
                    <TextField
                        id={field.name}
                        label={field.label}
                        type={field.type}
                        value={localItem[field.name as keyof inputItems]}
                        onChange={handleChange}
                        disabled={field.disabled}
                        fullWidth
                    />
                </Grid>
            ))}
        </>
    )

    return (
        <Card>
            <CardContent sx={{backgroundColor: 'grey'}}>
                {isEditing ? editContent : viewContent}
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
});
