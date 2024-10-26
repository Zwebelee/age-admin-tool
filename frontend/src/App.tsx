import {Suspense, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RootStore, RootStoreProvider, useRootStore} from "./stores/root-store.ts";
import {observer} from "mobx-react-lite";

import {Alert, LinearProgress} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./globalVariables.scss";
import "./App.scss";

import {OverviewScreen} from "./screens/OverviewScreen.tsx";
import {UsersScreen} from "./screens/UsersScreen.tsx";
import {ContentsScreen} from "./screens/ContentsScreen.tsx";
import {TasksScreen} from "./screens/TasksScreen.tsx";
import {GroupsScreen} from "./screens/GroupsScreen.tsx";
import {ComponentsScreen} from "./screens/ComponentsScreen.tsx";
import {ExperimentalScreen} from "./screens/ExperimentalScreen.tsx";

import {Header} from "./components/Header.tsx";
import {Sidebar} from "./components/Sidebar.tsx";



const AppObserver = observer(() => {

    const [toggleTheme, setToggleTheme] = useState(false);
    const toggleSwitch = () => {
        setToggleTheme(!toggleTheme);
    };
    const themeLight = createTheme({
        palette: {
            background: {
                default: "#EEEEEE"
            },
            text: {
                primary: "#000000"
            },
            primary: {
                main: "#009FE3",
            },
        }
    });
    const themeDark = createTheme({
        palette: {
            background: {
                default: "#424242"
            },
            text: {
                primary: "#FFFFFF"
            },
            primary: {
                main: "#009FE3",
            },
        }
    });

    if (!useRootStore().init) {
        return <LinearProgress/>;
    }

    return (
        <Suspense fallback="loading">
            <BrowserRouter>
                <ThemeProvider theme={toggleTheme ? themeLight : themeDark}>
                    <CssBaseline/>
                    <div className={toggleTheme ? "themeLight" : "themeDark"}>
                        <div className="app">
                            <Grid container spacing={0}>
                                <Grid size={12}>
                                    <p>Header</p>
                                    <Header toggleTheme={toggleTheme} onChange={toggleSwitch}/>
                                </Grid>
                                <Grid size="auto">
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
                        </div>
                    </div>
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
