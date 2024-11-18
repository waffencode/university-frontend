import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./app/App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { BrowserRouter } from "react-router-dom";
import {ChakraProvider, createSystem, defaultConfig, defaultSystem, defineConfig} from "@chakra-ui/react";
import {ColorModeProviderProps} from "@/components/ui/color-mode.tsx";

// const theme = extendTheme({
//     styles: {
//         global: () => ({
//             body: {
//                 color: 'default',
//                 bg: '#F5F5F5',
//             },
//         }),
//     },
// // });
//
// const config = defineConfig({
//     globalCss: {
//         "body": {
//             background: "#f5f5f5",
//         },
//     },
// })

// const system = createSystem(defaultConfig, config);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
        <Provider>
            {/*<BrowserRouter>*/}

                    <App />

            {/*</BrowserRouter>*/}
        </Provider>
    // {/*</React.StrictMode>*/}
);
