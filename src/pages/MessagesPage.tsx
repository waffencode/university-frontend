import React, {useState} from "react";
import HeaderBar from "../components/HeaderBar.tsx";
import Sidebar from "../components/Sidebar.tsx";
import {Card, createListCollection, Flex, Heading, HStack, VStack} from "@chakra-ui/react";
import {Button} from "../components/ui/button.tsx";

const MessagesPage: React.FC = () => {
    const [isMessageViewShown, setIsMessageViewShown] = useState<boolean>(false);

    const messagesPlaceholder = createListCollection({
        items: [
            { key: 1, theme: "Message1", text: "Hello" },
            { key: 2, theme: "Message2", text: "World" },
            { key: 3, theme: "Message3", text: "Example message" },
        ],
    })

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
                        <Button>Новое сообщение</Button>
                        <HStack>
                            <VStack>
                                {messagesPlaceholder.items.map((message) => {
                                        return (
                                            <Card.Root className="message_card">
                                                <Card.Body>
                                                    <Card.Title mt="2">{message.theme}</Card.Title>
                                                    <Card.Description>
                                                    {message.text}
                                                    </Card.Description>
                                                </Card.Body>
                                            </Card.Root>
                                        )
                                    })
                                }
                            </VStack>
                        </HStack>
                    </Card.Body>
                </Card.Root>
            </Flex>
        </>
    );
}

export default MessagesPage;
