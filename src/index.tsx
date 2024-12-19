import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import {ChakraProvider, createSystem, defaultConfig, defineConfig} from "@chakra-ui/react";
import './index.css';

const config = defineConfig({
    globalCss: {
        "body": {
            background: "#f5f5f5",
        },
    },
})

const system = createSystem(defaultConfig, config);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider value={system}>
            <BrowserRouter future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
);
