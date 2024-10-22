import {Suspense} from "react";
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomeScreen} from "./screens/HomeScreen.tsx";
import {ExperimentalScreen} from "./screens/ExperimentalScreen.tsx";
import {AboutScreen} from "./screens/AboutScreen.tsx";
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
                        <Route path="/" element={<HomeScreen/>}/>
                        <Route path="/experimental" element={<ExperimentalScreen/>}/>
                        <Route path="/about" element={<AboutScreen/>}/>
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
