import AppPage from "../../../components/AppPage";
import React from "react";
import SubjectForm from "./SubjectForm";
import {Button} from "../../../components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

const CreateSubjectPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <AppPage title="Добавить новую дисциплину">
            <SubjectForm />
        </AppPage>
    )
}

export default CreateSubjectPage;