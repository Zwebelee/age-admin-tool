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

    const getColor = (color: string) => getComputedStyle(document.body).getPropertyValue(color);
    const color1 = getColor("--color1");
    const lightness1 = getColor("--lightness1");
    const lightness2 = getColor("--lightness2");
    const lightness3 = getColor("--lightness3");
    const lightness4 = getColor("--lightness4");

    const [toggleTheme, setToggleTheme] = useState(false);
    const toggleSwitch = () => {
        setToggleTheme(!toggleTheme);
    };
    const themeDark = createTheme({
        palette: {
            background: {
                default: lightness3,
            },
            text: {
                primary: lightness2,
            },
            primary: {
                main: color1,
            },
        }
    });
    const themeLight = createTheme({
        palette: {
            background: {
                default: lightness4,
            },
            text: {
                primary: lightness1,
            },
            primary: {
                main: color1,
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
                                    <Header toggleTheme={toggleTheme} onChange={toggleSwitch}/>
                                </Grid>
                                <Grid size="auto">
                                    <Sidebar/>
                                </Grid>
                                <Grid size="auto">
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
