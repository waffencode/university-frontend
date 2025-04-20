import AppPage from "@/components/AppPage.tsx";
import { Button } from "@/components/ui/button";
import Message from "@/entities/domain/Message.ts";
import "@/pages/messages/MessagesPage.css";
import MessagePreviewCard from "@/pages/messages/MessagePreviewCard";
import MessageView from "@/pages/messages/MessageView.tsx";
import NewMessageForm from "@/pages/messages/NewMessageForm";
import { ApiContext } from "@/service/ApiProvider";
import { UserContext } from "@/service/UserProvider";
import { HStack, StackSeparator, VStack } from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MessagesPage: React.FC = () => {
	const apiContext = useContext(ApiContext);
	const userContext = useContext(UserContext)!;
	const navigate = useNavigate();
	const paramMessageId = useParams().messageId as UUID;

	const [isMessageViewShown, setIsMessageViewShown] =
		useState<boolean>(false);
	const [shownMessage, setShownMessage] = useState<Message | null>(null);
	const [isNewMessageModeActive, setIsNewMessageModeActive] =
		useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const loadMessages = useCallback(() => {
		apiContext.message
			.getMessages(userContext.user!.id)
			.then((response) => {
				setMessages(response);
			});
	}, [apiContext.message, userContext]);

	function showExistingMessage(message: Message) {
		if (isNewMessageModeActive) {
			return;
		}

		navigate("/messages/" + message.id.toString());
	}

	function hideExistingMessage() {
		setIsMessageViewShown(false);
		setShownMessage(null);
		navigate("/messages");
	}

	// Check messages once after page load.
	useEffect(() => {
		if (!userContext || !userContext.user) {
			navigate("/login");
		}

		loadMessages();

		if (paramMessageId !== undefined && paramMessageId !== null) {
			const messageToShow = messages.find(
				(message: Message) => message.id === paramMessageId,
			);
			if (messageToShow !== undefined && messageToShow !== null) {
				if (isNewMessageModeActive) {
					return;
				}

				setIsMessageViewShown(true);
				setShownMessage(messageToShow);
			}
		}
	}, [loadMessages, navigate, userContext]);

	useEffect(() => {
		const timer = setInterval(() => {
			loadMessages();
		}, 10000);

		return () => clearInterval(timer);
	});

	return (
		<AppPage title="Сообщения">
			<Button
				variant="surface"
				onClick={() => setIsNewMessageModeActive(true)}
				disabled={isNewMessageModeActive || isMessageViewShown}
			>
				Новое сообщение
			</Button>
			<HStack p={3} align="top" separator={<StackSeparator />}>
				<VStack w="20%">
					{(!messages || messages.length === 0) && (
						<div>Сообщений нет</div>
					)}
					{messages &&
						messages
							.sort(
								(a: Message, b: Message) =>
									b.date.getTime() - a.date.getTime(),
							)
							.map((message: Message) => (
								<MessagePreviewCard
									message={message}
									showExistingMessage={showExistingMessage}
								/>
							))}
				</VStack>
				{isMessageViewShown && shownMessage && (
					<MessageView
						shownMessage={shownMessage}
						hideExistingMessage={hideExistingMessage}
					/>
				)}
				{isNewMessageModeActive && (
					<NewMessageForm
						isNewMessageModeActive={isNewMessageModeActive}
						setIsNewMessageModeActive={setIsNewMessageModeActive}
					/>
				)}
			</HStack>
		</AppPage>
	);
};

export default MessagesPage;
