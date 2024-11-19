import React from 'react';
import './App.css';
import LoginPage from "../pages/LoginPage.tsx";
import {Route, Routes} from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage.tsx";
import IndexPage from "../pages/IndexPage.tsx";
import DashboardPage from "../pages/DashboardPage.tsx";
import RegistrationConfirmationPage from "../pages/RegistrationConfirmationPage.tsx";

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/register/confirm" element={<RegistrationConfirmationPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </>
    );
}

export default App;