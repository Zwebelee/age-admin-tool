import {SampleMaterialUiComponent} from "../components/SampleMaterialUiComponent.tsx";
import Sidecar from "../components/Sidecar.tsx";
import Box from "@mui/material/Box";
import {MainGrid} from "../components/MainGrid.tsx";


export const HomeScreen = () => {
    return (
        <Box sx={{display: 'flex'}}>
            <Sidecar/>
            <Box
                component="main">
                <MainGrid/>
                <SampleMaterialUiComponent/>
            </Box>
        </Box>
    )
};