import { Button } from "@/components/ui/button";
import { Prose } from "@/components/ui/prose";
import Message from "@/entities/domain/Message";
import "@/pages/messages/MessagesPage.css";
import formatDate from "@/service/FormatDate.ts";
import { Card, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { LuContact, LuMessageCircleWarning } from "react-icons/lu";
import "@/service/FormatDate.ts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
				<VStack fontSize="sm" align="left" gap={2} padding={2}>
					<VStack fontSize="sm" align="left" gap={2} padding={2}>
						<HStack gap={3} mt="2" mb="2" align="top">
							<LuContact size="2rem" />
							<VStack fontSize="sm">
								{shownMessage.sender.fullName}{" "}
								{"<" + shownMessage.sender.email + ">"}
								<br />
								Отправлено: {formatDate(shownMessage.date)}
								<br />
								Кому:{" "}
								{shownMessage.receivers
									.map((r) => `${r.fullName} <${r.email}>`)
									.join(", ")}
							</VStack>
						</HStack>
						{shownMessage.isImportant && (
							<HStack gap={2} fontSize="sm">
								<LuMessageCircleWarning color="red" />
								Это сообщение с высокой важностью
							</HStack>
						)}
					</VStack>
					<hr />
					<Prose maxWidth="100%" size="md">
						<ReactMarkdown remarkPlugins={[remarkGfm]}>
							{shownMessage.text}
						</ReactMarkdown>
					</Prose>
				</VStack>
			</Card.Body>
		</Card.Root>
	);
};

export default MessageView;
