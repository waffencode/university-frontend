import React, {useContext, useEffect, useState} from "react";
import HeaderBar from "../components/HeaderBar.tsx";
import Sidebar from "../components/Sidebar.tsx";
import {Card, createListCollection, Flex, Heading, HStack, ListCollection, VStack, Text} from "@chakra-ui/react";
import {Button} from "../components/ui/button.tsx";
import {ApiContext} from "../service/ApiProvider.tsx";
import {UserContext} from "../service/UserProvider.tsx";
import Message from "../entities/domain/Message.ts";
import './MessagesPage.css';
import {useNavigate} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import {Prose} from "../components/ui/prose.tsx";

const MessagesPage: React.FC = () => {
    const apiContext = useContext(ApiContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    if (!userContext || !userContext.user)
    {
        navigate("/login");
    }

    const [isMessageViewShown, setIsMessageViewShown] = useState<boolean>(false);
    const [shownMessage, setShownMessage] = useState<Message | null>(null);
    const [isNewMessageModeActive, setIsNewMessageModeActive] = useState<boolean>(false);

    const [messages, setMessages] = useState<ListCollection<Message> | null>(null);

    const loadMessages = () => {
        console.log(new Date().toString() + ": Loading messages");

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

    function showExistingMessage(message: Message) {
        setIsMessageViewShown(true);
        setShownMessage(message);
    }

    function hideExistingMessage() {
        setIsMessageViewShown(false);
        setShownMessage(null);
    }

    // Check messages once after page load.
    useEffect(() => {
        loadMessages();
    });

    useEffect(() => {
        const timer = setInterval(() => {
            loadMessages();
        }, 10000);

        return () => clearInterval(timer);
    });

    return (
        <>
            <HeaderBar />
            <Flex gap={10} marginY={2} grow={5} >
                <Sidebar />
                <Card.Root w="80%" shadow="md" border="0" rounded={3} p={4}>
                    <Card.Header>
                        <Heading>Сообщения</Heading>
                    </Card.Header>
                    <Card.Body>
                        <Button onClick={() => setIsNewMessageModeActive(true)}>Новое сообщение</Button>
                        <HStack p={3} align="top">
                            <VStack w="20%">
                                {(!messages || (messages.items.length === 0)) && (
                                    <div>
                                        Сообщений нет
                                    </div>
                                )}
                                {messages && messages.items.map((message: Message) => {
                                        return (
                                            <Card.Root className="message_card" onClick={() => showExistingMessage(message)}>
                                                <Card.Body>
                                                    <Card.Title mt="2">{message.topic}</Card.Title>
                                                    <Card.Description className="message_description">
                                                    {message.text}<br/>
                                                        Sender: {message.sender.id}<br/>
                                                        Date: {message.date.toString()}<br/>
                                                    </Card.Description>
                                                </Card.Body>
                                            </Card.Root>
                                        )
                                    })
                                }
                            </VStack>
                            {isMessageViewShown && shownMessage &&
                                <Card.Root className="message_wide_card" w="80%">
                                    <Card.Body>
                                        <Button style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}  w="10%" onClick={() => hideExistingMessage()}>Закрыть</Button>
                                        <Card.Title mt="2">{shownMessage.topic}</Card.Title>
                                        <Card.Description>
                                            <Prose>
                                                <ReactMarkdown>
                                                    {shownMessage.text}
                                                </ReactMarkdown>
                                            </Prose>
                                            <br/>
                                            Sender: {shownMessage.sender.id}<br/>
                                            Date: {shownMessage.date.toString()}<br/>
                                        </Card.Description>

                                    </Card.Body>
                                </Card.Root>
                            }
                            {isNewMessageModeActive &&
                                <Card.Root>
                                    <Card.Body>
                                        <Button onClick={() => setIsNewMessageModeActive(false)}>Закрыть</Button>
                                        <Card.Title mt="2">Новое сообщение</Card.Title>
                                        <Card.Description>

                                        </Card.Description>
                                    </Card.Body>
                                </Card.Root>
                            }
                        </HStack>
                    </Card.Body>
                </Card.Root>
            </Flex>
        </>
    );
}

export default MessagesPage;
