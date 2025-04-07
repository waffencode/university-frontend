import React from 'react';
import AppPage from "../../components/AppPage";
import {Heading, VStack} from "@chakra-ui/react";
import SubjectsView from "./subject/SubjectsView";
import SubjectWorkProgramsView from "./subject-work-program/SubjectWorkProgramsView";

const ClassesPage: React.FC = () => {
    return (
        <AppPage title="Занятия">
            <VStack gap={4} align={"left"}>
                <Heading size={"lg"}>Рабочие программы дисциплин</Heading>
                <SubjectWorkProgramsView />
                <Heading size={"lg"}>Дисциплины</Heading>
                <SubjectsView />
                <Heading size={"lg"}>Направления подготовки</Heading>
            </VStack>
        </AppPage>
    )
}

export default ClassesPage;