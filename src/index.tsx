import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage";
import { Provider } from "./components/ui/provider.tsx"


const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
                <Provider>
                    <RouterProvider router={router} />
                </Provider>
    </React.StrictMode>
);
