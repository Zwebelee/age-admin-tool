import {
    Button,
    Card,
    TextField,
    Typography,
    CardContent,
    CardActions,
    Dialog,
    DialogTitle,
    DialogContent, DialogContentText, DialogActions, FormControlLabel, Checkbox
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import {Loading} from "../../loading/Loading.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {ItemType, StoreType} from "../../../stores/abstract-store.ts";
import {useTranslation} from "react-i18next";
import {useRootStore} from "../../../stores/root-store.ts";


interface AgeEditorToolTemplateCardProps {
    item: ItemType;
    isEditing: boolean;
    isNew: boolean;
    onCancel: () => void;
    store: StoreType;
    fields: { name: string, label: string, type: string, disabled: boolean }[];
    canDelete?: boolean;
}


export const AgeEditorToolTemplateCard = observer((props: AgeEditorToolTemplateCardProps) => {
    const {logService} = useRootStore();
    const {t} = useTranslation();
    const {item, onCancel, store, fields, canDelete = true} = props;

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
                logService.error('error during save', e);
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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const {checked} = event.target;
        setLocalItem({...localItem, [fieldName]: checked});
    };


    const viewContent = (
        <Grid container direction={"column"} spacing={0.25}>
            {fields.map((field, index) => (
                <Typography
                    key={index}
                    variant={index === 0 ? "h6" : "body2"}
                >{index === 0 ? "" : `${field.label}: `}
                    {typeof localItem[field.name as keyof ItemType] === 'boolean'
                        ? (localItem[field.name as keyof ItemType] ? 'true' : 'false')
                        : localItem[field.name as keyof ItemType]}
                </Typography>
            ))}
        </Grid>
    )

    const editContent = (
        <Grid container direction={"column"} spacing={1} sx={{xs: 12}}>
            {fields.map((field, index) => (

                field.type === 'checkbox' ? (
                    <Grid key={index}>
                        <FormControlLabel
                            labelPlacement={"start"}
                            control={
                                <Checkbox
                                    checked={localItem[field.name as keyof ItemType] as unknown as boolean}
                                    onChange={(e) => handleCheckboxChange(e, field.name)}
                                    name={field.name}
                                />
                            }
                            label={field.label}
                        />
                    </Grid>
                ) : (
                    <TextField
                        key={index}
                        id={field.name}
                        label={field.label}
                        type={field.type}
                        value={localItem[field.name as keyof ItemType]}
                        onChange={handleChange}
                        disabled={field.disabled}
                        fullWidth
                    />
                )))}
        </Grid>
    )

    return (
        <Card sx={{backgroundColor: 'var(--lightness2-1)'}}>
            <CardContent>
                {isEditing ? editContent : viewContent}
            </CardContent>
            <CardActions>
                {isEditing && <Button variant={"contained"} onClick={handleSave}>{t("actions.save")}</Button>}
                <Button variant={"contained"}
                        onClick={!isEditing ? handleEditClick : handleCancelEditClick}
                >{isEditing ? t("actions.cancel") : t("actions.edit")}</Button>
                {!isNew && canDelete && <Button variant="contained" color="error" onClick={handleOpenDialog}>
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
                        {t("actions.delete.confirmation")}
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
