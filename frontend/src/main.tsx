import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import App from "./App.tsx"
import "./i18n"
import {RootStore} from "./stores/root-store.ts";
import "sanitize.css";

const rootStore = new RootStore()

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App rootStore={rootStore}/>
    </StrictMode>
)
