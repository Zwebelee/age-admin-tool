import {SampleMaterialUiComponent} from "../components/SampleMaterialUiComponent.tsx";
import SampleSidecar from "../components/SampleSidecar.tsx";
import Box from "@mui/material/Box";
import {SampleGrid} from "../components/SampleGrid.tsx";
import Button from "@mui/material/Button";
import {useRootStore} from "../stores/root-store.ts";
import {useTranslation} from "react-i18next";
import {SampleHeader} from "../components/SampleHeader.tsx";


export const ExperimentalScreen = () => {
    const store = useRootStore();
    const {t} = useTranslation();
    return (
        <>
            <h2>{t("experimental")}</h2>
            <Box sx={{display: 'flex'}}>
                <SampleSidecar/>
                <Box
                    component="main">
                    <SampleHeader/>
                    <SampleGrid/>
                    <SampleMaterialUiComponent/>
                </Box>
                <Button variant="contained" onClick={() => store.testStore.increment()}>MOBX Count +1</Button>
            </Box>
        </>
    )
};