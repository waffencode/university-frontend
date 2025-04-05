import AppPage from "../../../components/AppPage";
import React from "react";
import SubjectForm from "./SubjectForm";
import {UUID} from "node:crypto";
import {useParams} from "react-router-dom";

const EditSubjectPage: React.FC = () => {
    const subjectId = useParams().subjectId as UUID;

    return (
        <AppPage title="Редактировать дисциплину">
            <SubjectForm />
        </AppPage>
    )
}

export default EditSubjectPage;