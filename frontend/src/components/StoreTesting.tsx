import { CircularProgress, Box, Typography } from "@mui/material";
import {useRootStore} from "../stores/root-store.ts";
import {observer} from "mobx-react-lite";

export const TestStoreComponent = observer(() => {
    const rootstore = useRootStore();
    const ageStore = rootstore.ageStore;

    if (ageStore.isLoading) {
        return <CircularProgress />;

    }

    if (ageStore.isLoaded ){
        return (
            <Box>
                <Typography variant="h3">TestStoreComponent</Typography>
                <Typography variant="body1">Age: {ageStore.age?.guid}</Typography>
                <Typography variant="body1">Age: {ageStore.age?.alias}</Typography>
            </Box>
        )
    }

    return <Typography variant="body1">Error loading data</Typography>
});