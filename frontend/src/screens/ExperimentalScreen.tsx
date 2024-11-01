import Box from "@mui/material/Box";
import {SampleGrid} from "../components/SampleGrid.tsx";
import Button from "@mui/material/Button";
import {useRootStore} from "../stores/root-store.ts";
import {useTranslation} from "react-i18next";
import {Card, CardContent, Typography} from "@mui/material";
import {TestEntry} from "../models/test-entry.ts";
import {observer} from "mobx-react-lite";


export const ExperimentalScreen = observer(() => {
    const store = useRootStore();
    const {t} = useTranslation();
    return (
        <main>
            <h2>{t("experimental")}</h2>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <Box
                    component="main">
                    <SampleGrid/>
                </Box>
                <h3>Button in outer Component - Testing if mobx is working properly</h3>
                <p>Change Store Count with store-method</p>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
                    <Button variant="contained" onClick={() => store.testStore.decrement()}>- 1</Button>
                    <Button variant="contained" onClick={() => store.testStore.increment()}>+ 1</Button>
                </Box>
                <h3> Backend Testing</h3>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
                    <Button variant="contained" onClick={() => store.testStore.postData(Math.floor(Math.random() * 1001))}> add Test-Entry to
                        Backend</Button>
                    <TestCard testEntry={store.testStore.latestTestEntry}/>
                </Box>

            </Box>
        </main>
    )
});

export const TestCard = ({testEntry}: {testEntry: TestEntry | undefined}) => {
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