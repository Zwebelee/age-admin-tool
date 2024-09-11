import {Suspense} from "react";
import './App.css'
import {AppHeader} from "./components/AppHeader.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LanguageSelector} from "./components/LanguageSelector.tsx";
import {HomeScreen} from "./screens/HomeScreen.tsx";
import {AboutScreen} from "./screens/AboutScreen.tsx";

function App() {

    return (
        <Suspense fallback="loading">
            <BrowserRouter>
                <AppHeader/>
                <LanguageSelector/>
                <Routes>
                    <Route path="/" element={<HomeScreen/>}/>
                    <Route path="/about" element={<AboutScreen/>}/>
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}

export default App
