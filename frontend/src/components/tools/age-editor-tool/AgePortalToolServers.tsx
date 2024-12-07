import {AgeEditorToolTemplateCard} from "./AgeEditorToolTemplateCard.tsx";
import {useRootStore} from "../../../stores/root-store.ts";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import {Button, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {AgeServer} from "../../../models/age-server.ts";
import {useTranslation} from "react-i18next";

export const AgePortalToolServers = observer(() => {
    const {t} = useTranslation();
    const {ageServerStore} = useRootStore();
    const [newItem, setNewItem] = useState(false)
    const handleToggleAddNew = () => {
        setNewItem(!newItem);
    }

    const handleCancelNewItem = () => {
        setNewItem(false);
    };

    const fields = [
        {name: 'name', label: 'Name', type: 'text', disabled: false, default: "sampleserver-v088t.domain.ch:6444"},
        {name: 'adminUrl', label: 'Admin URL', type: 'text', disabled: false, default: "https://sampleserver-v088t.domain.ch:6444/arcgis"},
        {name: 'url', label: 'URL', type: 'text', disabled: false, default: "https://webadaptor.sample.ch/gisstuff"},
        {name: 'isHosted', label: 'Is Hosted', type: 'checkbox', disabled: false, default: true},
        {name: 'serverType', label: 'Server Type', type: 'text', disabled: false, default: "ArcGIS"},
        {name: 'serverRole', label: 'Server Role', type: 'text', disabled: false, default: "HOSTING_SERVER"},
        {name: 'serverFunction', label: 'Server Function', type: 'text', disabled: false, default: ""},
        {name: 'id', label: 'ID', type: 'text', disabled: true, default: "jiCabcde3fgWz8Qn"},
        {name: 'guid', label: 'GUID', type: 'text', disabled: true, default: "123e4567-e89b-12d3-a456-426614174012"},

    ];

    const defaultItem = new AgeServer({
        guid: "123e4567-e89b-12d3-a456-426614174012",
        id: "jiCabcde3fgWz8Qn",
        name: "sampleserver-v088t.domain.ch:6444",
        adminUrl: "https://sampleserver-v088t.domain.ch:6444/arcgis",
        url: "https://webadaptor.sample.ch/gisstuff",
        isHosted: true,
        serverType: "ArcGIS",
        serverRole: "HOSTING_SERVER",
        serverFunction: ""
    });


    return (
        <Grid>
            {!newItem && <Button variant="contained" onClick={handleToggleAddNew}>{t("actions.add.title")}</Button>}
            {newItem && (
                <>
                    <Typography variant="h6">Add New Portal-License</Typography>
                    <AgeEditorToolTemplateCard
                        item={defaultItem}
                        isEditing={true}
                        isNew={true}
                        onCancel={handleCancelNewItem}
                        store={ageServerStore}
                        fields={fields}
                    />
                </>
            )}
            {!newItem && ageServerStore.visibleItems.map((item, index) => {
                    return (
                        <AgeEditorToolTemplateCard
                            key={index}
                            item={item}
                            isEditing={false}
                            isNew={false}
                            onCancel={() => {
                            }}
                            store={ageServerStore}
                            fields={fields}
                        />
                    )
                }
            )}
        </Grid>
    )
});
