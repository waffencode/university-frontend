import AppPage from "../../../components/AppPage";
import React, {useContext, useEffect} from "react";
import SubjectForm from "./SubjectForm";
import {UUID} from "node:crypto";
import {useParams} from "react-router-dom";
import Subject from "@/entities/domain/Subject.ts";
import {ApiContext} from "@/service/ApiProvider.tsx";

const EditSubjectPage: React.FC = () => {
    const subjectId = useParams().subjectId as UUID;
    const apiContext = useContext(ApiContext);

    const [subject, setSubject] = React.useState<Subject>();

    useEffect(() => {
        const fetchSubject = async () => {
            await apiContext.subject.getById(subjectId).then((response) => {
                setSubject(response);
            });
        }

        if (subjectId) {
            fetchSubject().catch(console.error);
        }
    }, []);

    return (
        <AppPage title="Редактировать дисциплину">
            {
                subject ? (
                    <SubjectForm subject={subject}/>
                ) : (
                    <div>Загрузка...</div>
                )
            }
        </AppPage>
    )
}

export default EditSubjectPage;