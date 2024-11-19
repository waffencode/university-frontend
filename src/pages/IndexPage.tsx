import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const IndexPage: React.FC = () => {
    const navigate = useNavigate();

    // TODO: Navigate to dashboard if logged in.
    useEffect(() => {
        navigate('/login');
    });

    return (
        <>

        </>
    );
}

export default IndexPage;