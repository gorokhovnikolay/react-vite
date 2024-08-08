import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { AuthProvider } from './context/context-provider/context-provider.tsx'
import App from './App.tsx'
import '@mantine/core/styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <MantineProvider>
            <AuthProvider>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </AuthProvider>
        </MantineProvider>
    </BrowserRouter>,
)
