import { Card, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { LuContact } from "react-icons/lu";
import "../service/FormatDate.ts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Message from "../entities/domain/Message";
import "../pages/MessagesPage.css";
import formatDate from "../service/FormatDate.ts";
import { Button } from "./ui/button";
import { Prose } from "./ui/prose";

interface MessageViewProps {
	shownMessage: Message;
	hideExistingMessage: Function;
}

const MessageView: React.FC<MessageViewProps> = ({
	shownMessage,
	hideExistingMessage,
}) => {
	return (
		<Card.Root className="message_wide_card" w="80%">
			<Card.Body>
				<Button
					className="close_message_button"
					w="10%"
					onClick={() => hideExistingMessage()}
				>
					Закрыть
				</Button>
				<Card.Title mt="2">
					<Heading size="2xl">{shownMessage.topic}</Heading>
				</Card.Title>
				<HStack gap={3} mt="2" mb="2">
					<LuContact size="2rem" />
					<VStack fontSize="sm">
						{shownMessage.sender.fullName}{" "}
						{"<" + shownMessage.sender.email + ">"}
						<br />
						Отправлено: {formatDate(shownMessage.date)}
						<br />
						Кому:{" "}
						{shownMessage.receivers
							.map((r) => r.fullName)
							.join(", ")}
					</VStack>
				</HStack>
				<hr />
				<Prose mt="5">
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{shownMessage.text}
					</ReactMarkdown>
				</Prose>
				<br />
			</Card.Body>
		</Card.Root>
	);
};

export default MessageView;
