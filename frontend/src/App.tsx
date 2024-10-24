import {Suspense, useState} from "react";
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {OverviewScreen} from "./screens/OverviewScreen.tsx";
import {UsersScreen} from "./screens/UsersScreen.tsx";
import {ContentsScreen} from "./screens/ContentsScreen.tsx";
import {TasksScreen} from "./screens/TasksScreen.tsx";
import {GroupsScreen} from "./screens/GroupsScreen.tsx";
import {ComponentsScreen} from "./screens/ComponentsScreen.tsx";
import {ExperimentalScreen} from "./screens/ExperimentalScreen.tsx";
import {Header} from "./components/Header.tsx";
import {Sidebar} from "./components/Sidebar.tsx";
import {Alert, LinearProgress} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {RootStore, RootStoreProvider, useRootStore} from "./stores/root-store.ts";
import {observer} from "mobx-react-lite";

const AppObserver = observer(() => {

    const [toggleTheme, setToggleTheme] = useState(false);
    const toggleSwitch = () => {
        setToggleTheme(!toggleTheme);
    };
    const theme = createTheme({
        palette: {
            mode: toggleTheme ? "light" : "dark",
            primary: {
                main: "#90caf9",
            },
            secondary: {
                main: "#f48fb1",
            },
        },
    });

    if (!useRootStore().init) {
        return <LinearProgress/>;
    }
    return (
        <Suspense fallback="loading">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Grid container spacing={0}>
                            <Grid size={12}>
                                <p>Header</p>
                                <Header toggleTheme={toggleTheme} onChange={toggleSwitch} />
                            </Grid>
                            <Grid size="auto">
                                <p>Sidebar</p>
                                <Sidebar/>
                            </Grid>
                            <Grid size="auto">
                                <p>Main</p>
                                <Routes>
                                    <Route path="/" element={<OverviewScreen/>}/>
                                    <Route path="/users" element={<UsersScreen/>}/>
                                    <Route path="/contents" element={<ContentsScreen/>}/>
                                    <Route path="/tasks" element={<TasksScreen/>}/>
                                    <Route path="/groups" element={<GroupsScreen/>}/>
                                    <Route path="/components" element={<ComponentsScreen/>}/>
                                    <Route path="/experimental" element={<ExperimentalScreen/>}/>
                                </Routes>
                            </Grid>
                        </Grid>
                </ThemeProvider>
            </BrowserRouter>
        </Suspense>
    )
});

function App({rootStore}: { rootStore: RootStore }) {
    if (rootStore) {
        return (
            <RootStoreProvider value={rootStore}>
                <AppObserver/>
            </RootStoreProvider>
        );
    }
    return <Alert severity="error">Missing RootStore</Alert>;
}

export default App
