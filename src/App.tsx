import './App.css'
import {AppHeader} from "./components/AppHeader.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LanguageSelector} from "./components/LanguageSelector.tsx";
import {HomeScreen} from "./screens/HomeScreen.tsx";
import {AboutScreen} from "./screens/AboutScreen.tsx";

function App() {

  return (
    <BrowserRouter>
        <AppHeader/>
        <LanguageSelector/>
        <Routes>
            <Route path="/" element={<HomeScreen/>}/>
            <Route path="/about" element={<AboutScreen/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
