import {Button, Typography} from "@mui/material";
import {PortalLicenseCard} from "./PortalLicenseCard.tsx";
import Grid from "@mui/material/Grid2";
import { observer } from "mobx-react-lite";
import {useRootStore} from "../../../stores/root-store.ts";
import {useState} from "react";
import {PortalLicense} from "../../../models/portallicense.ts";

export const PortalLicenseTool = observer(() => {

    const {portalLicenseStore} = useRootStore()
    const [newItem, setNewItem] = useState(false)

    const handleToggleAddNew = () => {
        setNewItem(!newItem)
    }

    const handleCancelNewItem = () => {
        setNewItem(false);
    };


    const defaultPortalLicense = new PortalLicense({
        id: Date.now().toString(),
        name: "New License",
        description: "",
        level: "0",
        state: "",
        maxusers: 0,
        currentusers: 0,
        guid: ""
    });


    return(
        <Grid>
            {!newItem && <Button variant="contained" onClick={handleToggleAddNew}>Add New</Button>}
    {newItem && (
        <>
            <Typography variant="h6">Add New License</Typography>
    <PortalLicenseCard item={defaultPortalLicense} isEditing={true} isNew={true}
        onCancel={handleCancelNewItem}/>
    </>

    )}

    {!newItem && portalLicenseStore.visibleItems.map((item, index) => {
        return (
            <PortalLicenseCard item={item} key={index}/>
    )
    })}
    </Grid>
    )
})