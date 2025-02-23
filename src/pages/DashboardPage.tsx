import React from "react";
import AppPage from "../components/AppPage.tsx";
import {Center, Heading, Image, VStack} from "@chakra-ui/react";

const DashboardPage: React.FC = () => {
    return (
        <AppPage title="University">
            <Center>
                <VStack gap={3}>
                    <Image height="150px" src="/static/img/logo.png" />
                    <VStack marginY={10}>
                        <Heading>University</Heading>
                        Open-source платформа для университета
                    </VStack>
                </VStack>
            </Center>
            Информационная система “Университет” (“University”) для студентов и преподавателей
            университета.<br/><br/>

            Задача системы — обеспечение студентов ВУЗа информацией о ходе образовательного процесса,
            интеграция функционала рабочих мест студента, преподавателя и методиста в едином сервисе.
        </AppPage>
    );
}

export default DashboardPage;
