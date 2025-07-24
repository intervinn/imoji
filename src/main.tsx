import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PropertiesProvider } from './lib/state.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PropertiesProvider>
      <App />
    </PropertiesProvider>
  </StrictMode>,
)
