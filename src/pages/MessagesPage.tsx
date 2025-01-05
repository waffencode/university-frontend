import React from "react";
import HeaderBar from "../components/HeaderBar.tsx";
import Sidebar from "../components/Sidebar.tsx";
import {Card, Flex, Heading, Text} from "@chakra-ui/react";

const MessagesPage: React.FC = () => {
    return (
        <>
            <HeaderBar />
            <Flex gap={10} marginY={2} grow={5} >
                <Sidebar />
                <Card.Root w="80%" shadow="md" border="0" rounded={3}  p={4}>
                    <Card.Header>
                        <Heading>Сообщения</Heading>
                    </Card.Header>
                    <Card.Body>
                        <Text>
                            TBA
                        </Text>
                    </Card.Body>
                </Card.Root>
            </Flex>
        </>
    );
}

export default MessagesPage;
