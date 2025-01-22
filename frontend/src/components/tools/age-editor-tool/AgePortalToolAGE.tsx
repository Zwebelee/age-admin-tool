import {AgeEditorToolTemplateCard} from "./AgeEditorToolTemplateCard.tsx";
import {useRootStore} from "../../../stores/root-store.ts";
import {observer} from "mobx-react-lite";
import Grid from "@mui/material/Grid2";


export const AgeEditorToolAGE = observer(() => {

    const {ageStore} = useRootStore();

    const fields = [
        {name: "alias", label: "Alias", type: "text", disabled: false, default: "GIS – Core"},
        {name: "name", label: "Name", type: "text", disabled: false, default: "ArcGIS Enterprise"},
        {name: "description", label: "Description", type: "text", disabled: false, default: "Central Enterprise GIS"},
        {name: "guid", label: "GUID", type: "text", disabled: true, default: ""},

    ];

    return (
        <Grid container rowSpacing={1} direction={"column"}>
            {ageStore.visibleItems.map((item, index) => {
                    return (
                        <AgeEditorToolTemplateCard
                            key={index}
                            item={item}
                            isEditing={false}
                            isNew={false}
                            onCancel={() => {
                            }}
                            store={ageStore}
                            fields={fields}
                            canDelete={false}
                        />
                    )
                }
            )}
        </Grid>
    )
});
