import {AgeEditorToolTemplateCard} from "./AgeEditorToolTemplateCard.tsx";
import {useRootStore} from "../../../stores/root-store.ts";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import {AgePortal} from "../../../models/age-portal.ts";
import {AgeEditorToolAddButton} from "./AgeEditorToolAddButton.tsx";
import {useTranslation} from "react-i18next";
import "./AgeEditorTool.scss";


export const AgeEditorToolPortals = observer(() => {
    const {t} = useTranslation();
    const {agePortalStore} = useRootStore();
    const [newItem, setNewItem] = useState(false)
    const handleToggleAddNew = () => {
        setNewItem(!newItem);
    }

    const handleCancelNewItem = () => {
        setNewItem(false);
    };

    const fields = [
        {name: "alias", label: "Alias", type: "text", disabled: false, default: "GIS – Core Portal"},
        {name: "name", label: "Name", type: "text", disabled: false, default: "sampleagp-v099t.domain.ch:6443"},
        {name: "description", label: "Description", type: "text", disabled: false, default: "Enterprise Portal"},
        {name: "url", label: "URL", type: "text", disabled: false, default: "http://example.com/coreportal"},
        {name: "type", label: "Type", type: "text", disabled: false, default: "portal"},
        {name: "ishosted", label: "Is Hosted", type: "checkbox", disabled: false, default: true},
        {name: "status", label: "Status", type: "text", disabled: false, default: "active"},
        {name: "guid", label: "GUID", type: "text", disabled: true, default: "123e4567-e89b-12d3-a456-426614174010"},
    ];

    const defaultItem = new AgePortal({
        guid: "123e4567-e89b-12d3-a456-426614174010",
        name: "sampleagp-v099t.domain.ch:6443",
        alias: "GIS – Core Portal",
        description: "Enterprise Portal",
        url: "http://example.com/coreportal",
        type: "portal",
        ishosted: true,
        status: "active"
    });


    return (
        <Grid container rowSpacing={1} direction={"column"}>
            {!newItem && <AgeEditorToolAddButton onClick={handleToggleAddNew}/>}
            {newItem && (
                <>
                    <h4 className="ageEditorTool__addNewTitle">
                        {t("actions.add.add_new")}: Portal
                    </h4>
                    <AgeEditorToolTemplateCard
                        item={defaultItem}
                        isEditing={true}
                        isNew={true}
                        onCancel={handleCancelNewItem}
                        store={agePortalStore}
                        fields={fields}
                    />
                </>
            )}
            {!newItem && agePortalStore.visibleItems.map((item, index) => {
                return (
                    <AgeEditorToolTemplateCard
                            key={index}
                            item={item}
                            isEditing={false}
                            isNew={false}
                            onCancel={() => {
                            }}
                            store={agePortalStore}
                            fields={fields}
                        />
                    )
                }
            )}
        </Grid>
    )
});
