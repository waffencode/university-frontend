import React from 'react';
import {Card, HStack, VStack} from "@chakra-ui/react";
import {Button} from "./ui/button";
import {Prose} from "./ui/prose";
import ReactMarkdown from "react-markdown";
import Message from "../entities/domain/Message";
import "../pages/MessagesPage.css"
import {LuContact} from "react-icons/lu";
import "../service/FormatDate.ts"
import formatDate from "../service/FormatDate.ts";

interface MessageViewProps {
    shownMessage: Message;
    hideExistingMessage: Function;
}

const MessageView: React.FC<MessageViewProps> = ({shownMessage, hideExistingMessage}) => {
    return (
        <Card.Root className="message_wide_card" w="80%">
            <Card.Body>
                <Button className="close_message_button" w="10%" onClick={() => hideExistingMessage()}>Закрыть</Button>
                <Card.Title mt="2">{shownMessage.topic}</Card.Title>
                <Card.Description>
                    <HStack gap={3} mt="2" mb="2">
                        <LuContact size="2rem"/>
                        <VStack>
                            {shownMessage.sender.fullName} {'<' + shownMessage.sender.email + '>'}<br/>
                            Отправлено: {formatDate(shownMessage.date)}<br/>
                        </VStack>
                    </HStack>
                    <hr />
                    <Prose mt="5">
                        <ReactMarkdown>
                            {shownMessage.text}
                        </ReactMarkdown>
                    </Prose>
                    <br/>
                </Card.Description>
            </Card.Body>
        </Card.Root>
    );
}

export default MessageView;