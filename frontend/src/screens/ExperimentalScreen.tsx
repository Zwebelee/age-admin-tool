import Box from "@mui/material/Box";
import {SampleGrid} from "../components/SampleGrid.tsx";
import Button from "@mui/material/Button";
import {useRootStore} from "../stores/root-store.ts";
import {useTranslation} from "react-i18next";
import {Card, CardContent, Typography, FormControl, TextField, FormLabel} from "@mui/material";
import {TestEntry} from "../models/test-entry.ts";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import {SignInMask} from "../components/SignInMask.tsx";


export const ExperimentalScreen = observer(() => {
    const store = useRootStore();
    const {t} = useTranslation();
    const [newNr, setNewNr] = useState<number>(store.testStore.latestTestEntry ? store.testStore.latestTestEntry.nr : 0);

    const handleUpdateNr = async () => {
        const latestEntry = store.testStore.latestTestEntry;
        if (latestEntry) {
            await store.testStore.updateData(latestEntry.id, {nr: newNr});
            setNewNr(store.testStore.latestTestEntry ? store.testStore.latestTestEntry.nr : 0);


        }
    };


    return (
        <>
            <h2>{t("experimental")}</h2>
            <h3>Testing stuff - Fokus funktionalität, nicht implementierung an sich (weder Design noch Code)</h3>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <Box
                    sx={{border: '3px solid blue', margin: '2px', padding: '10px', borderRadius: '8px'}}
                    component="main">
                    <SampleGrid/>
                </Box>
                <SignInMask/>
                <Box sx={{border: '3px solid blue', margin: '2px', padding: '10px', borderRadius: '8px'}}>
                    <h3>Button in outer component - Testing if mobx is working properly (updates through the
                        mobx-store)</h3>
                    <p>Change Store Count with store-method</p>
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
                        <Button variant="contained" onClick={() => store.testStore.decrement()}>- 1</Button>
                        <Button variant="contained" onClick={() => store.testStore.increment()}>+ 1</Button>
                    </Box>
                </Box>
                <Box sx={{border: '3px solid blue', margin: '2px', padding: '10px', borderRadius: '8px'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, padding: '10px'}}>
                        <Typography variant="h3" component="div" color="orange">
                            Backend-Testing
                        </Typography>
                        <Typography variant="h5" component="div" color="orange">
                            1. Post new Test-Entry to Backend (New ID (Autoincrement) + Random Number)
                        </Typography>

                        <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, padding: '10px'}}>

                            <Button variant="contained"
                                    onClick={async () => {
                                        await store.testStore.postData(Math.floor(Math.random() * 1001));
                                        setNewNr(store.testStore.latestTestEntry ? store.testStore.latestTestEntry.nr : 0);
                                    }}>
                                add Test-Entry
                                to
                                Backend</Button>
                            <TestCard testEntry={store.testStore.latestTestEntry}/>
                        </Box>
                        <Typography variant="h5" component="div" color="orange">
                            2. Update Test-Entry in the Backend
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: 0.5}}>
                            <FormControl sx={{gap: 2}}>
                                <FormLabel sx={{color: 'orange'}}>Edit the last Test-Entry (Testing)</FormLabel>
                                <TextField
                                    type="number"
                                    value={newNr}
                                    onChange={(e) => setNewNr(Number(e.target.value))}
                                    label="New NR"
                                />
                                <Button variant="contained" onClick={handleUpdateNr}>Update NR</Button>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
});

export const TestCard = ({testEntry}: { testEntry: TestEntry | undefined }) => {
    if (!testEntry) {
        return <Card><CardContent>No entries yet</CardContent></Card>;
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="body1" component="div" color="orange">
                    Latest entry from Backend
                </Typography>
                <Typography variant="h5" component="div" color="orange">
                    ID: {testEntry.id}
                </Typography>
                <Typography variant="body2" color="orange">
                    NR: {testEntry.nr}
                </Typography>
            </CardContent>
        </Card>
    );
};