import React, {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../service/UserProvider.tsx";

const IndexPage: React.FC = () => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext?.user) {
            navigate('/dashboard');
        }
        else
        {
            navigate('/login');
        }
    });

    return (
        <>

        </>
    );
}

export default IndexPage;