import { CircularProgress, Box, Typography } from "@mui/material";
import {useRootStore} from "../stores/root-store.ts";
import {observer} from "mobx-react-lite";

export const TestStoreComponent = observer(() => {
   return (
       <Box>
           <Typography variant="h3">TestStoreComponent</Typography>
           <TestAgeStore />
           <TestLicenseStore/>
       </Box>
   );
});

export const TestAgeStore = observer(() => {
    const rootstore = useRootStore();
    const ageStore = rootstore.ageStore;


    if (ageStore.isLoading) {
        return <CircularProgress />;

    }

    if (ageStore.isLoaded ){
        return (
            <Box sx={{border: '3px solid blue', margin: '2px', padding: '10px', borderRadius: '8px'}}>
                <Typography variant="h5">AGE Store</Typography>
                <Typography variant="body1">Age: {ageStore.age?.guid}</Typography>
                <Typography variant="body1">Age: {ageStore.age?.alias}</Typography>
            </Box>
        )
    }

    return <Typography variant="body1">Error loading data</Typography>
});

export const TestLicenseStore = observer(() => {
    const rootstore = useRootStore();
    const licenseStore = rootstore.portalLicenseStore;

    if (licenseStore.isLoading) {
        return <CircularProgress />;
    }

    if (licenseStore.isLoaded) {
        return (
            <Box sx={{border: '3px solid blue', margin: '2px', padding: '10px', borderRadius: '8px'}}>
                <Typography variant="h5">License Store</Typography>
                {Array.from(licenseStore.items.values()).map((item) => {
                    return (
                        <Typography key={item.guid} variant="body1">License: {item.name}: {item.currentusers}/{item.maxusers}</Typography>
                    )
                })}
            </Box>
        )
    }

    return <Typography variant="body1">Error loading data</Typography>
});