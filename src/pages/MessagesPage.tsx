import React, {useContext, useEffect, useState} from "react";
import HeaderBar from "../components/HeaderBar.tsx";
import Sidebar from "../components/Sidebar.tsx";
import {Card, createListCollection, Flex, Heading, HStack, ListCollection, VStack} from "@chakra-ui/react";
import {Button} from "../components/ui/button.tsx";
import {ApiContext} from "../service/ApiProvider.tsx";
import {UserContext} from "../service/UserProvider.tsx";
import Message from "../entities/domain/Message.ts";

const MessagesPage: React.FC = () => {
    const apiContext = useContext(ApiContext);
    const userContext = useContext(UserContext);

    const [isMessageViewShown, setIsMessageViewShown] = useState<boolean>(false);
    const [messages, setMessages] = useState<ListCollection<Message> | null>(null);

    const loadMessages = () => {
        if (!userContext || !userContext.user)
        {
            return;
        }

        apiContext.message.getMessages(userContext.user.id).then((response) => {
            setMessages(createListCollection({items: response}));
        });
    };

    async function sendMessage(message: Message) {
        await apiContext.message.sendMessage(message);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            loadMessages();
            console.log(new Date().toString() + ": Loading messages");
        }, 10000);

        return () => clearInterval(timer);
    });

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
                                {messages && messages.items.map((message: Message) => {
                                        return (
                                            <Card.Root className="message_card">
                                                <Card.Body>
                                                    <Card.Title mt="2">{message.topic}</Card.Title>
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
