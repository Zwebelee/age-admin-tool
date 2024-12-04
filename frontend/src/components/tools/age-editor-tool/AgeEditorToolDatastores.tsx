import {AgeEditorToolTemplateCard} from "./AgeEditorToolTemplateCard.tsx";
import {useRootStore} from "../../../stores/root-store.ts";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import {Button, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {AgeDataStore} from "../../../models/age-datastore.ts";

export const AgeEditorToolDatastores = observer(() => {

    const {ageDataStoreStore} = useRootStore();
    const [newItem, setNewItem] = useState(false)
    const handleToggleAddNew = () => {
        setNewItem(!newItem);
    }

    const handleCancelNewItem = () => {
        setNewItem(false);
    };

    const fields = [
        { name: 'name', label: 'Name', type: 'text', disabled: false, default: '' },
        { name: 'description', label: 'Description', type: 'text', disabled: false, default: '' },
        { name: 'alias', label: 'Alias', type: 'text', disabled: false, default: '' },
        { name: 'type', label: 'Type', type: 'text', disabled: false, default: '' },
        { name: 'ishosted', label: 'Is Hosted', type: 'checkbox', disabled: false, default: false },
        { name: 'url', label: 'URL', type: 'text', disabled: false, default: '' },
        { name: 'status', label: 'Status', type: 'text', disabled: false, default: '' },
        { name: 'capacity_gb', label: 'Capacity (GB)', type: 'number', disabled: false, default: 0 },
        { name: 'used_gb', label: 'Used (GB)', type: 'number', disabled: false, default: 0 },
        { name: 'guid', label: 'GUID', type: 'text', disabled: true, default: '' }
    ];

    const defaultItem = new AgeDataStore({
        "guid": "",
        "name": "Sample Data Store XY",
        "alias": "Dada Data Store XY",
        "type": "Relational Database",
        "ishosted": false,
        "description": "Sample Data Store",
        "url": "http://example.com/datastorexy",
        "status": "active",
        "capacity_gb": 800,
        "used_gb": 599
    });


    return (
        <Grid>
            {!newItem && <Button variant="contained" onClick={handleToggleAddNew}>Add New</Button>}
            {newItem && (
                <>
                    <Typography variant="h6">Add New Portal-License</Typography>
                    <AgeEditorToolTemplateCard
                        item={defaultItem}
                        isEditing={true}
                        isNew={true}
                        onCancel={handleCancelNewItem}
                        store={ageDataStoreStore}
                        fields={fields}
                    />
                </>
            )}
            {!newItem && ageDataStoreStore.visibleItems.map((item, index) => {
                    return (
                        <AgeEditorToolTemplateCard
                            key={index}
                            item={item}
                            isEditing={false}
                            isNew={false}
                            onCancel={() => {
                            }}
                            store={ageDataStoreStore}
                            fields={fields}
                        />
                    )
                }
            )}
        </Grid>
    )
});
