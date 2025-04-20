import Message from "@/entities/domain/Message";
import formatDate from "@/service/FormatDate";
import { Card, HStack } from "@chakra-ui/react";
import React from "react";
import "@/pages/messages/MessagePreviewCard.css";
import { LuMessageCircleWarning } from "react-icons/lu";

interface IMessagePreviewCardProps {
	message: Message;
	showExistingMessage: Function;
}

const MessagePreviewCard: React.FC<IMessagePreviewCardProps> = ({
	message,
	showExistingMessage,
}: IMessagePreviewCardProps) => {
	return (
		<Card.Root
			className="message_card"
			key={message.id}
			onClick={() => showExistingMessage(message)}
		>
			<Card.Body>
				<Card.Title mt="2">
					<HStack gap={2}>
						{message.isImportant && (
							<LuMessageCircleWarning color="red" />
						)}
						{message.topic}
					</HStack>
				</Card.Title>
				<Card.Description className="message_description">
					{message.text}
					<br />
					{message.sender.fullName}
					<br />
					{formatDate(message.date)}
					<br />
				</Card.Description>
			</Card.Body>
		</Card.Root>
	);
};

export default MessagePreviewCard;
