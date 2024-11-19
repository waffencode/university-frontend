import React from "react";
import HeaderBar from "../components/HeaderBar.tsx";
import Sidebar from "../components/Sidebar.tsx";
import {Button, Card, Flex, Group, Heading, HStack, Text} from "@chakra-ui/react";

const DashboardPage: React.FC = () => {
    return (
        <>
            <HeaderBar />
            <Flex gap={10} marginY={2} grow={5} >
                <Sidebar />
                <Card.Root w="80%" shadow="md" border="0" rounded={3}  p={4}>
                    <Card.Header>
                        <Heading>University</Heading>
                    </Card.Header>
                    <Card.Body>
                        <Text>
                            Информационная система “Университет” (“University”) для студентов и преподавателей
                            университета.<br/><br/>

                            Задача системы — обеспечение студентов ВУЗа информацией о ходе образовательного процесса,
                            интеграция функционала рабочих мест студента, преподавателя и методиста в едином сервисе.
                        </Text>
                    </Card.Body>
                </Card.Root>
            </Flex>
        </>
);
}

export default DashboardPage;
