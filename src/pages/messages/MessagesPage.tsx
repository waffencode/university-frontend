import AppPage from "@/components/AppPage.tsx";
import Message from "@/entities/domain/Message.ts";
import "@/pages/messages/MessagesPage.css";
import MessagePreviewCard from "@/pages/messages/MessagePreviewCard";
import MessageView from "@/pages/messages/MessageView.tsx";
import NewMessageForm from "@/pages/messages/NewMessageForm";
import { ApiContext } from "@/service/ApiProvider";
import { UserContext } from "@/service/UserProvider";
import { Button, HStack, Presence, StackSeparator, VStack } from "@chakra-ui/react";
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
		if (!userContext || !userContext.user?.id) {
			navigate("/login");
			return;
		}

		apiContext.message
			.getMessages(userContext.user!.id)
			.then((response) => {
				setMessages(response);
			});
	}, []);

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
									key={message.id}
									message={message}
									showExistingMessage={showExistingMessage}
								/>
							))}
				</VStack>
				{isMessageViewShown && shownMessage && (
					<Presence
						w="100%"
						animationName={{
							_open: "slide-from-bottom, fade-in",
							_closed: "slide-to-bottom, fade-out",
						}}
						animationDuration="moderate"
						present={isMessageViewShown}
					>
						<MessageView
							shownMessage={shownMessage}
							hideExistingMessage={hideExistingMessage}
						/>
					</Presence>
				)}
				{isNewMessageModeActive && (
					<Presence
						w="100%"
						animationName={{
							_open: "slide-from-bottom, fade-in",
							_closed: "slide-to-bottom, fade-out",
						}}
						animationDuration="moderate"
						present={isNewMessageModeActive}
					>
						<NewMessageForm
							setIsNewMessageModeActive={
								setIsNewMessageModeActive
							}
						/>
					</Presence>
				)}
			</HStack>
		</AppPage>
	);
};

export default MessagesPage;
