import {observer} from "mobx-react-lite";
import Grid from "@mui/material/Grid2";
import {Button, List, ListItem} from "@mui/material";
import {useState} from "react";
import {AgeEditorToolPortallicenses} from "./AgeEditorToolPortallicenses.tsx";
import {AgeEditorToolDatastores} from "./AgeEditorToolDatastores.tsx";
import {AgeEditorToolPortals} from "./AgePortalToolPortals.tsx";
import {AgePortalToolWebadaptors} from "./AgePortalToolWebadaptors.tsx";
import {AgePortalToolServers} from "./AgePortalToolServers.tsx";
import {AgeEditorToolAGE} from "./AgePortalToolAGE.tsx";
import {useTranslation} from "react-i18next";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const tools = [
    {name: "Enterprise", component: AgeEditorToolAGE},
    {name: "PortalLicenses", component: AgeEditorToolPortallicenses},
    {name: "DataStores", component: AgeEditorToolDatastores},
    {name: "Portals", component: AgeEditorToolPortals},
    {name: "WebAdaptors", component: AgePortalToolWebadaptors},
    {name: "Servers", component: AgePortalToolServers},
];

interface cardCloseProps {
    cardClose: () => void
}


export const AgeEditorTool = observer(({cardClose}: cardCloseProps) => {
    const {t} = useTranslation();
    const gridsize = [3,9]

    const [selectedTool, setSelectedTool] = useState<string>(tools[0].name);

    const handleSelectTool = (tool: string) => {
        setSelectedTool(tool);
    };


    return (
        <>
            <h1>{t("tools.age-editor.title")}</h1>
            <Button className="toolUserEditor__close" onClick={cardClose}>
                {t("actions.close")}&nbsp;<HighlightOffOutlinedIcon fontSize="large"/>
            </Button>
            <Grid container spacing={3}>
                <Grid size={gridsize[0]}>
                    <List>
                        {tools.map((tool, index) => (
                            <ListItem key={index}>
                                <Button
                                    style={{display:"flex", flexGrow: 1}}
                                    variant={selectedTool === tool.name ? "contained" : "outlined"}
                                    onClick={() => handleSelectTool(tool.name)}
                                >{tool.name}</Button>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid size={gridsize[1]}>
                    {tools.map(tool => (
                        selectedTool === tool.name && (<tool.component key={tool.name}/>
                    )))}
                </Grid>
            </Grid>
        </>
    )
});
