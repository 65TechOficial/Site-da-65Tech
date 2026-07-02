import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App, App2} from './App.jsx'
import { GlobalStyles } from './styles/GlobalStyle.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>,
)
