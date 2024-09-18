import {SampleMaterialUiComponent} from "../components/SampleMaterialUiComponent.tsx";
import Sidecar from "../components/Sidecar.tsx";
import Box from "@mui/material/Box";
import {MainGrid} from "../components/MainGrid.tsx";
import Button from "@mui/material/Button";
import {useRootStore} from "../stores/root-store.ts";


export const HomeScreen = () => {
    const store = useRootStore();
    return (
        <Box sx={{display: 'flex'}}>
            <Sidecar/>
            <Box
                component="main">
                <MainGrid/>
                <SampleMaterialUiComponent/>
            </Box>
            <Button variant="contained" onClick={() => store.testStore.increment()}>MOBX Count +1</Button>
        </Box>
    )
};