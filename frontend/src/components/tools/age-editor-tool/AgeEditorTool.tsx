import {observer} from "mobx-react-lite";
import Grid from '@mui/material/Grid2';
import {Button, List, ListItem, Typography} from "@mui/material";
import {useState} from "react";
import {PortalLicenseTool} from "./PortalLicenseTool.tsx";
import {AgePortalTool} from "./AgePortalTool.tsx";

const tools = [
    {name: 'PortalLicenses', component: PortalLicenseTool},
    {name: 'DataStores', component: () => <Typography>DataStores Component</Typography>},
    {name: 'Portals', component: AgePortalTool}
];

export const AgeEditorTool = observer(() => {

    const gridsize = 9

    const [selectedTool, setSelectedTool] = useState<string>(tools[0].name);

    const handleSelectTool = (tool: string) => {
        setSelectedTool(tool);
    };


    return (
        <>
            <h1>AGE Editor</h1>

            <Grid container spacing={3}>
                <Grid size={3}>
                    <List>
                        {tools.map((tool, index) => (
                            <ListItem key={index}>
                                <Button
                                    variant={selectedTool === tool.name ? "contained" : "outlined"}
                                    onClick={() => handleSelectTool(tool.name)}
                                >{tool.name}</Button>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid size={gridsize}>
                    {tools.map(tool => (
                        selectedTool === tool.name && <tool.component key={tool.name}/>
                    ))}
                </Grid>
            </Grid>
        </>
    )
})
