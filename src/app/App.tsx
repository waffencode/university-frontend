import React from 'react';
import './App.css';
import LoginPage from "../pages/LoginPage.tsx";
import {Navigate, Route, Routes} from "react-router-dom";

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Navigate replace to="/login" />
        </>
    );
}

export default App;