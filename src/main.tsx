import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./i18n"
import './index.css'

//TODO: keep in mind - init mobx root store OUTSIDE strict mode!!!



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
