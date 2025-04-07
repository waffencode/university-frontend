import AppPage from "../../../components/AppPage";
import React from "react";
import SubjectForm from "./SubjectForm";

const CreateSubjectPage: React.FC = () => {
    return (
        <AppPage title="Добавить новую дисциплину">
            <SubjectForm />
        </AppPage>
    )
}

export default CreateSubjectPage;