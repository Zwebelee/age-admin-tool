import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import "./i18n"
import './index.css'
import {RootStore} from "./stores/root-store.ts";

const rootStore = new RootStore()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App rootStore={rootStore}/>
    </StrictMode>
)
