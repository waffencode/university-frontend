import React, {useCallback, useContext, useEffect, useState} from "react";
import HeaderBar from "../components/HeaderBar.tsx";
import Sidebar from "../components/Sidebar.tsx";
import {
    Box,
    Card,
    createListCollection,
    Flex,
    Heading,
    HStack,
    Input,
    ListCollection, StackSeparator,
    Textarea,
    VStack
} from "@chakra-ui/react";
import {Button} from "../components/ui/button.tsx";
import {ApiContext} from "../service/ApiProvider.tsx";
import {UserContext} from "../service/UserProvider.tsx";
import Message from "../entities/domain/Message.ts";
import './MessagesPage.css';
import {useNavigate} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import {Prose} from "../components/ui/prose.tsx";
import {Field} from "../components/ui/field.tsx";
import {Checkbox} from "../components/ui/checkbox.tsx";
import { CheckboxCard } from "../components/ui/checkbox-card"
import {v4} from "uuid";
import {UUID} from "node:crypto";
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent, DialogFooter, DialogHeader,
    DialogRoot, DialogTitle,
    DialogTrigger
} from "../components/ui/dialog.tsx";
import User from "../entities/domain/User.ts";

const MessagesPage: React.FC = () => {

    const apiContext = useContext(ApiContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const [isMessageViewShown, setIsMessageViewShown] = useState<boolean>(false);
    const [shownMessage, setShownMessage] = useState<Message | null>(null);
    const [newMessage, setNewMessage] = useState<Message | null>(null);
    const [isNewMessageModeActive, setIsNewMessageModeActive] = useState<boolean>(false);
    const [messages, setMessages] = useState<ListCollection<Message> | null>(null);
    const [isPreviewEnabled, setIsPreviewEnabled] = useState<boolean>(false);

    const loadMessages = useCallback(() => {
        console.log(new Date().toString() + ": Loading messages");

        if (!userContext || !userContext.user)
        {
            return;
        }

        apiContext.message.getMessages(userContext.user.id).then((response) => {
            setMessages(createListCollection({items: response}));
        });
    }, [apiContext.message, userContext]);

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

    function enableNewMessageMode() {
        if (!userContext || !userContext.user)
        {
            return;
        }

        let emptyMessage: Message = {
            id: v4() as UUID,
            topic: "",
            text: "",
            date: new Date(),
            isImportant: false,
            sender: userContext.user,
            receivers: [],
            receiversStudyGroup: []
        };

        setNewMessage(emptyMessage);
        setIsNewMessageModeActive(true);
    }

    function disableNewMessageMode() {
        setNewMessage(null);
        setIsNewMessageModeActive(false);
    }

    // function getReceivers(): User[] {
    //     console.log(new Date().toString() + ": Getting receivers");
    //
    //     apiContext.user.getAllUsers().then((response) => {
    //         console.log(new Date().toString() + ": Receivers loaded");
    //         console.log(response);
    //         return response;
    //     });
    // }

    // Check messages once after page load.
    useEffect(() => {
        if (!userContext || !userContext.user)
        {
            navigate("/login");
        }

        loadMessages();
    }, [loadMessages, navigate, userContext]);

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
                        <Button onClick={() => enableNewMessageMode()}>Новое сообщение</Button>
                        <HStack p={3} align="top" separator={<StackSeparator />}>
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
                            {isNewMessageModeActive && newMessage &&
                                <Card.Root className="message_wide_card" w="80%">
                                    <Card.Body>
                                        <Button style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}  w="10%" onClick={() => disableNewMessageMode()}>Закрыть</Button>
                                        <Card.Title mt="2">Новое сообщение</Card.Title>
                                        <Card.Description>
                                            <Flex justify="flex-start" gap={5} direction="column">
                                                <Field label="Тема">
                                                    <Input placeholder="Тема" value={newMessage.topic} onChange={(e) => setNewMessage({ ...newMessage, topic: e.target.value })} />
                                                </Field>
                                                <Checkbox checked={newMessage.isImportant} onCheckedChange={(e) => setNewMessage({ ...newMessage, isImportant: !!e.checked })}>Это сообщение с высокой важностью</Checkbox>
                                                <Field label="Текст сообщения (поддерживается Markdown)">
                                                    { isPreviewEnabled &&
                                                        <>
                                                            <Box
                                                                p="2"
                                                                borderWidth="1px"
                                                                borderColor="border.disabled"
                                                                borderRadius="5px"
                                                                color="fg.disabled"
                                                                w="100%"
                                                            >
                                                                <Prose>
                                                                    <ReactMarkdown>
                                                                        {newMessage.text}
                                                                    </ReactMarkdown>
                                                                </Prose>
                                                            </Box>

                                                            <Button variant="outline" onClick={() => setIsPreviewEnabled(false)}>Отключить предпросмотр</Button>
                                                        </>
                                                    }
                                                    { !isPreviewEnabled &&
                                                        <>
                                                            <Textarea resize="vertical" placeholder="Текст сообщения" value={newMessage.text} onChange={(e) => setNewMessage({ ...newMessage, text: e.target.value })} />
                                                            <Button variant="outline" onClick={() => setIsPreviewEnabled(true)}>Предпросмотр</Button>
                                                        </>
                                                    }
                                                </Field>
                                                <Field label="Получатели">
                                                    <DialogRoot size="cover" placement="center" motionPreset="slide-in-bottom">
                                                        <DialogTrigger>
                                                            <Button variant="outline">Выбрать</Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogCloseTrigger />
                                                            <DialogHeader>
                                                                <DialogTitle>Выбрать получателей</DialogTitle>
                                                            </DialogHeader>
                                                            <DialogBody>
                                                                {/*{getReceivers().map((receiver) => (*/}
                                                                {/*        <CheckboxCard label={receiver.fullName} description={receiver.email} key={receiver.id} maxW="240px" />*/}
                                                                {/*    ))*/}
                                                                {/*}*/}
                                                            </DialogBody>
                                                            <DialogFooter>
                                                                <DialogActionTrigger asChild>
                                                                    <Button variant="outline">Отмена</Button>
                                                                </DialogActionTrigger>
                                                                <Button>Сохранить</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </DialogRoot>
                                                </Field>
                                                <Flex style={{ marginTop: '1.5rem'}} gap={2} justify="flex-end">
                                                    <Button onClick={() => sendMessage(newMessage)}>Отправить</Button>
                                                    <Button>Удалить</Button>
                                                </Flex>
                                            </Flex>
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
