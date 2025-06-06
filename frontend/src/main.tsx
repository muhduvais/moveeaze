import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { TabProvider } from './contexts/TabContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TabProvider>
      <App />
    </TabProvider>
  </StrictMode>,
)
