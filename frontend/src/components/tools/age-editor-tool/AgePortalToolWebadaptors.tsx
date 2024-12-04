import {AgeEditorToolTemplateCard} from "./AgeEditorToolTemplateCard.tsx";
import {useRootStore} from "../../../stores/root-store.ts";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import {Button, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {AgeWebAdaptor} from "../../../models/age-webadaptor.ts";

export const AgePortalToolWebadaptors = observer(() => {

    const {ageWebAdaptorStore} = useRootStore();
    const [newItem, setNewItem] = useState(false)
    const handleToggleAddNew = () => {
        setNewItem(!newItem);
    }

    const handleCancelNewItem = () => {
        setNewItem(false);
    };

    const fields = [
        {name: 'machineName', label: 'Machine Name', type: 'text', disabled: false, default: "TESTNAME-V099T"},
        {name: 'machineIP', label: 'Machine IP', type: 'text', disabled: false, default: "33.88.99.11"},
        {name: 'webAdaptorURL', label: 'Web Adaptor URL', type: 'text', disabled: false, default: "https://sampe.webadaptor.ch/core-blabli"},
        {name: 'id', label: 'ID', type: 'text', disabled: true, default: "e6f238b1-9412-412f-b37c-12b028becfaf"},
        {name: 'description', label: 'Description', type: 'text', disabled: false, default: ""},
        {name: 'httpPort', label: 'HTTP Port', type: 'number', disabled: false, default: 99},
        {name: 'httpsPort', label: 'HTTPS Port', type: 'number', disabled: false, default: 444},
        {name: 'refreshServerListInterval', label: 'Refresh Server List Interval', type: 'number', disabled: false, default: 1},
        {name: 'reconnectServerOnFailureInterval', label: 'Reconnect Server On Failure Interval', type: 'number', disabled: false, default: 1},
        {name: 'guid', label: 'GUID', type: 'text', disabled: true, default: "123e4567-e89b-12d3-a456-426614333011"},
    ];

    const defaultItem = new AgeWebAdaptor({
        guid: "123e4567-e89b-12d3-a456-426614333011",
        machineName: "TESTNAME-V099T",
        machineIP: "33.88.99.11",
        webAdaptorURL: "https://sampe.webadaptor.ch/core-blabli",
        id: "e6f238b1-9412-412f-b37c-12b028becfaf",
        description: "",
        httpPort: 99,
        httpsPort: 444,
        refreshServerListInterval: 1,
        reconnectServerOnFailureInterval: 1
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
                        store={ageWebAdaptorStore}
                        fields={fields}
                    />
                </>
            )}
            {!newItem && ageWebAdaptorStore.visibleItems.map((item, index) => {
                    return (
                        <AgeEditorToolTemplateCard
                            key={index}
                            item={item}
                            isEditing={false}
                            isNew={false}
                            onCancel={() => {
                            }}
                            store={ageWebAdaptorStore}
                            fields={fields}
                        />
                    )
                }
            )}
        </Grid>
    )
});
