import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Auth removed: amplify config no longer needed
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
