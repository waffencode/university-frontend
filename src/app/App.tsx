import React from 'react';
import './App.css';
import {
    Route,
    Routes,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage.tsx";

const App: React.FC = () => {
    return (

        // <Routes>
        //     <Route path="/login" element={<LoginPage />} />
        // </Routes>
        <LoginPage />
    );
}

export default App;