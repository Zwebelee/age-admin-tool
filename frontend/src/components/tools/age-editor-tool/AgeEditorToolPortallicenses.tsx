import {AgeEditorToolTemplateCard} from "./AgeEditorToolTemplateCard.tsx";
import {useRootStore} from "../../../stores/root-store.ts";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {PortalLicense} from "../../../models/portallicense.ts";
import {AgeEditorToolAddButton} from "./AgeEditorToolAddButton.tsx";

export const AgeEditorToolPortallicenses = observer(() => {
    const {portalLicenseStore} = useRootStore();
    const [newItem, setNewItem] = useState(false)
    const handleToggleAddNew = () => {
        setNewItem(!newItem);
    }

    const handleCancelNewItem = () => {
        setNewItem(false);
    };

    const fields = [
        {name: 'name', label: 'Name', type: 'text', disabled: false, default: "New License"},
        {name: 'description', label: 'Description', type: 'text', disabled: false, default: "Sample Description"},
        {name: 'level', label: 'Level', type: 'text', disabled: false, default: "0"},
        {name: 'state', label: 'State', type: 'text', disabled: false, default: "active"},
        {name: 'maxusers', label: 'Max Users', type: 'number', disabled: false, default: 200},
        {name: 'currentusers', label: 'Current Users', type: 'number', disabled: false, default: 120},
        {name: 'id', label: 'ID', type: 'text', disabled: true, default: "NewLicenseXT"},
        {name: 'guid', label: 'GUID', type: 'text', disabled: true, default: ""},
    ];

    const defaultPortalLicense = new PortalLicense({
        name: "New License",
        description: "Sample Description",
        level: "0",
        state: "active",
        maxusers: 200,
        currentusers: 120,
        id: Date.now().toString(),
        guid: ""
    });


    return (
        <Grid container rowSpacing={1} direction={"column"}>
            {!newItem && <AgeEditorToolAddButton onClick={handleToggleAddNew}/>}
            {newItem && (
                <>
                    <Typography variant="h6">Add New Portal-License</Typography>
                    <AgeEditorToolTemplateCard
                        item={defaultPortalLicense}
                        isEditing={true}
                        isNew={true}
                        onCancel={handleCancelNewItem}
                        store={portalLicenseStore}
                        fields={fields}
                    />
                </>
            )}
            {!newItem && portalLicenseStore.visibleItems.map((item, index) => {
                    return (
                        <AgeEditorToolTemplateCard
                            key={index}
                            item={item}
                            isEditing={false}
                            isNew={false}
                            onCancel={() => {
                            }}
                            store={portalLicenseStore}
                            fields={fields}
                        />
                    )
                }
            )}
        </Grid>
    )
});
