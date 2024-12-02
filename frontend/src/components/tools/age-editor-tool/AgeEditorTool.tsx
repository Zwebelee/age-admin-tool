import {observer} from "mobx-react-lite";
import Grid from '@mui/material/Grid2';
import {Button, List, ListItem} from "@mui/material";
import {useRootStore} from "../../../stores/root-store.ts";
import {PortalLicenseCard} from "./PortalLicenseCard.tsx";


export const AgeEditorTool = observer(() => {
    const {portalLicenseStore} = useRootStore()
    const gridsize = 9

    return (
        <>
            <h1>AGE Editor</h1>

            <Grid container spacing={3}>
                <Grid size={3}>
                    <List>
                        {Array.from({length: 10}, (_, index) => (
                            <ListItem key={index}>
                                <Button variant="contained">{index}</Button>
                            </ListItem>
                        ))
                        }

                    </List>
                </Grid>
                <Grid size={gridsize}>
                    <Grid>
                        <Button variant="contained">Add</Button>
                        <p>add a item</p>
                        {portalLicenseStore.visibleItems.map((item, index) => {
                            return (
                                <PortalLicenseCard item={item} key={index}/>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
})
