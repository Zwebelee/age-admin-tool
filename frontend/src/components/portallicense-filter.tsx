import {observer} from "mobx-react-lite";
import {useRootStore} from "../stores/root-store.ts";
import {useState} from "react";
import {
    Box,
    CircularProgress,
    FormControl, IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const PortalLicenseFilter = observer(() => {
    const rootstore = useRootStore();
    const licenseStore = rootstore.portalLicenseStore;
    const [selectedFilter, setSelectedFilter] = useState<string>("");

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        const filter = event.target.value;
        setSelectedFilter(filter);
        licenseStore.filters = filter ? [`name-${filter}`] : [];
    };

    const handleReset = () => {
        setSelectedFilter("");
        licenseStore.clearFilters();
    }

    if (licenseStore.isLoading) {
        return <CircularProgress />;
    }

    if (licenseStore.isLoaded) {
        return (
            <Box sx={{border: '3px solid blue', margin: '2px', padding: '10px', borderRadius: '8px'}}>
                <Typography variant="h5">License VisItems</Typography>
                <FormControl fullWidth>
                    <InputLabel id="filter-select-label">Filter by Name</InputLabel>
                    <Select
                        labelId="filter-select-label"
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        sx={{ mt: 1, backgroundColor: 'grey' }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {Array.from(licenseStore.items.values()).map((license) => (
                            <MenuItem key={license.guid} value={license.name}>
                                {license.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {Array.from(licenseStore.visibleItems.values()).map((item) => {
                    return (
                        <Typography key={item.guid} variant="body1">License: {item.name}: {item.currentusers}/{item.maxusers}</Typography>
                    )
                })}
                <IconButton onClick={handleReset} aria-label="reset">
                    <RestartAltIcon sx={{color:'red'}} />
                </IconButton>
            </Box>
        )
    }

    return <Typography variant="body1">Error loading data</Typography>
});