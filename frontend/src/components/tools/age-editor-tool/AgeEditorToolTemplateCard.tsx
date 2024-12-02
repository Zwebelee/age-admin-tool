import {Button, Card, TextField, Typography, CardContent} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import {PortalLicense} from "../../../models/portallicense.ts";
import {PortalLicenseStore} from "../../../stores/portallicense-store.ts";

type inputItems = PortalLicense;
type inputStores = PortalLicenseStore

interface AgeEditorToolTemplateCardProps {
    item: inputItems;
    isEditing: boolean;
    isNew: boolean;
    onCancel: () => void;
    onSave: (item: any) => void;
    store: inputStores;
    fields: { name: string, label: string, type: string, disabled: boolean }[];
}


export const AgeEditorToolTemplateCard = observer((props: AgeEditorToolTemplateCardProps) => {
    const {item, isEditing, isNew, onCancel, onSave, store, fields} = props;
    const [localItem, setLocalItem] = useState(item);

    const handleChange = (field: string, value: never) => {
        setLocalItem({...localItem, [field]: value});
    };

    const handleSave = () => {
        if (isNew) {
            store.addItem(localItem);
        } else {
            store.updateItem(localItem);
        }
        onSave(localItem);
    };





    //TODO: Continue here!!!!!!!!!!!!!






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
                        label={field.label}
                        type={field.type}
                        value={localItem[field.name as keyof inputItems]}
                        disabled
                        fullWidth
                    />
                </Grid>
            ))}
        </>
    )

    return (
        <Grid>
            <Typography>test</Typography>
            <Card>
                <CardContent sx={{backgroundColor: 'grey'}}>
                    {isEditing ? editContent : viewContent}
                </CardContent>
                <Grid sx={{xs: 12}}>
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                    <Button variant="outlined" onClick={onCancel}>Cancel</Button>
                </Grid>
            </Card>
        </Grid>
    );
});