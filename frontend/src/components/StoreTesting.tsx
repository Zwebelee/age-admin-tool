import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    CircularProgress,
    SelectChangeEvent,
} from "@mui/material";
import {useRootStore} from "../stores/root-store.ts";
import {observer} from "mobx-react-lite";
import {PortalLicense} from "../models/portallicense.ts";
import {useState} from "react";
import {PortalLicenseFilter} from "./portallicense-filter.tsx";


export const TestStoreComponent = observer(() => {
   return (
       <Box>
           <Typography variant="h3">TestStoreComponent</Typography>
           <TestAgeStore />
           <TestLicenseStore/>
           <PortalLicenseFilter/>
           <TestAddLicense/>
           <TestUpdateLicense/>
           <TestGeneralStore/>
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

export const TestAddLicense = observer(() => {
    const rootstore = useRootStore();
    const licenseStore = rootstore.portalLicenseStore;

    const newLicesnse: PortalLicense= {
        class: "",
        id: "",
        level: "",
        state: "",
        guid: '123',
        name: 'New License',
        currentusers: 0,
        maxusers: 10
    }

    return (
        <Box>
            <Typography variant="h5">Add License</Typography>
            <button onClick={() => licenseStore.addItem(newLicesnse)}>Add License</button>
        </Box>
    )
})

// compontent which lets us pick and update and portallicense

export const TestUpdateLicense = observer(() => {
    const rootstore = useRootStore();
    const licenseStore = rootstore.portalLicenseStore;
    const [selectedLicense, setSelectedLicense] = useState<PortalLicense | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        level: "",
        state: "",
        maxusers: 0,
        currentusers: 0
    });

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const license = licenseStore.items.get(event.target.value as string);
        if (license) {
            setSelectedLicense(license);
            setFormData({
                name: license.name,
                description: license.description || "",
                level: license.level,
                state: license.state,
                maxusers: license.maxusers,
                currentusers: license.currentusers
            });
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = () => {
        if (selectedLicense) {
            const updatedLicense = { ...selectedLicense, ...formData };
            licenseStore.updateItem(updatedLicense);
        }
    };

    const handleDelete = () => {
        if (selectedLicense) {
            licenseStore.deleteItem(selectedLicense);
            setSelectedLicense(null);
            setFormData({
                name: "",
                description: "",
                level: "",
                state: "",
                maxusers: 0,
                currentusers: 0
            });
        }
    };

    return (
        <Box>
            <Typography variant="h5">Update / Delete a License</Typography>
            <FormControl fullWidth>
                <InputLabel id="license-select-label">Select License</InputLabel>
                <Select sx={{ mt: 1, backgroundColor:'grey' }}
                    labelId="license-select-label"
                    value={selectedLicense ? selectedLicense.guid : ""}
                    onChange={handleSelectChange}
                >
                    {Array.from(licenseStore.items.values()).map((license) => (
                        <MenuItem sx={{backgroundColor:'grey'}} key={license.guid} value={license.guid}>
                            {license.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedLicense && (
                <Box component="form" sx={{ mt: 2, backgroundColor:'grey' }}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Level"
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Max Users"
                        name="maxusers"
                        type="number"
                        value={formData.maxusers}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Current Users"
                        name="currentusers"
                        type="number"
                        value={formData.currentusers}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
                        Update License
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete} sx={{ mt: 2, ml: 2 }}>
                        Delete License
                    </Button>
                </Box>
            )}
        </Box>
    );
});

export const TestGeneralStore = observer( () => {
    const rootstore = useRootStore();
    const store = rootstore.ageDataStoreStore;

    if (store.isLoading){
        return <CircularProgress />;
    }

    if (store.isLoaded) {
        console.log('ok')
        console.log(store.items)
        return <Typography>hi</Typography>

    }

})