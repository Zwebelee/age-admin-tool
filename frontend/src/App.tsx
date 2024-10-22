import {Suspense} from "react";
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {OverviewScreen} from "./screens/OverviewScreen.tsx";
import {UsersScreen} from "./screens/UsersScreen.tsx";
import {ContentsScreen} from "./screens/ContentsScreen.tsx";
import {TasksScreen} from "./screens/TasksScreen.tsx";
import {GroupsScreen} from "./screens/GroupsScreen.tsx";
import {ComponentsScreen} from "./screens/ComponentsScreen.tsx";
import {ExperimentalScreen} from "./screens/ExperimentalScreen.tsx";
import {AppHeader} from "./components/AppHeader.tsx";
import {Alert, LinearProgress} from "@mui/material";
import {RootStore, RootStoreProvider, useRootStore} from "./stores/root-store.ts";
import {observer} from "mobx-react-lite";

const AppObserver = observer(() => {
        if (!useRootStore().init) {
            return <LinearProgress/>;
        }
        return (
            <Suspense fallback="loading">
                <BrowserRouter>
                    <AppHeader/>
                    <Routes>
                        <Route path="/" element={<OverviewScreen/>}/>
                        <Route path="/users" element={<UsersScreen/>}/>
                        <Route path="/contents" element={<ContentsScreen/>}/>
                        <Route path="/tasks" element={<TasksScreen/>}/>
                        <Route path="/groups" element={<GroupsScreen/>}/>
                        <Route path="/components" element={<ComponentsScreen/>}/>
                        <Route path="/experimental" element={<ExperimentalScreen/>}/>
                    </Routes>
                </BrowserRouter>
            </Suspense>
        )
    }
);

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
