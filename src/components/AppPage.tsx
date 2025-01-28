import React from "react";
import HeaderBar from "./HeaderBar";
import {Card, Flex, Heading} from "@chakra-ui/react";
import Sidebar from "./Sidebar";

interface AppPageProps {
    title: string;
    children: React.ReactNode;
}

const AppPage: React.FC<AppPageProps> = ({ title, children }) => {
    return (
        <>
            <HeaderBar />
            <Flex gap={10} marginY={2} grow={5}>
                <Sidebar />
                <Card.Root w="80%" shadow="md" border="0" rounded={3} p={4}>
                    <Card.Header>
                        <Heading>{title}</Heading>
                    </Card.Header>
                    <Card.Body>
                        {children}
                    </Card.Body>
                </Card.Root>
            </Flex>
        </>
    );
}

export default AppPage;