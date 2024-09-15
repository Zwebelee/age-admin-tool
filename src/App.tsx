import {Suspense} from "react";
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomeScreen} from "./screens/HomeScreen.tsx";
import {AboutScreen} from "./screens/AboutScreen.tsx";
import {AppHeader} from "./components/AppHeader.tsx";

function App() {

    return (
        <Suspense fallback="loading">
            <BrowserRouter>
                <AppHeader/>
                <Routes>
                    <Route path="/" element={<HomeScreen/>}/>
                    <Route path="/about" element={<AboutScreen/>}/>
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}

export default App
