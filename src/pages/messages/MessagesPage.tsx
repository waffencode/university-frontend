import AppPage from "@/components/AppPage.tsx";
import { Button } from "@/components/ui/button";
import Message from "@/entities/domain/Message.ts";
import "@/pages/messages/MessagesPage.css";
import MessagePreviewCard from "@/pages/messages/MessagePreviewCard";
import MessageView from "@/pages/messages/MessageView.tsx";
import NewMessageForm from "@/pages/messages/NewMessageForm";
import { ApiContext } from "@/service/ApiProvider";
import { UserContext } from "@/service/UserProvider";
import {
	createListCollection,
	HStack,
	ListCollection,
	StackSeparator,
	VStack,
} from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";

const MessagesPage: React.FC = () => {
	const apiContext = useContext(ApiContext);
	const userContext = useContext(UserContext)!;
	const navigate = useNavigate();
	const paramMessageId = useParams().messageId as UUID;

	const [isMessageViewShown, setIsMessageViewShown] =
		useState<boolean>(false);
	const [shownMessage, setShownMessage] = useState<Message | null>(null);
	const [newMessage, setNewMessage] = useState<Message | null>(null);
	const [isNewMessageModeActive, setIsNewMessageModeActive] =
		useState<boolean>(false);
	const [messages, setMessages] = useState<ListCollection<Message> | null>(
		null,
	);

	const loadMessages = useCallback(() => {
		console.log(new Date().toString() + ": Loading messages");

		if (!userContext || !userContext.user) {
			return;
		}

		apiContext.message.getMessages(userContext.user.id).then((response) => {
			setMessages(createListCollection({ items: response }));
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

	function enableNewMessageMode() {
		if (isMessageViewShown) {
			return;
		}

		if (!newMessage) {
			let emptyMessage: Message = {
				id: v4() as UUID,
				topic: "",
				text: "",
				date: new Date(),
				isImportant: false,
				sender: userContext.user!,
				receivers: [],
				receiversStudyGroup: [],
			};

			setNewMessage(emptyMessage);
		}

		setIsNewMessageModeActive(true);
	}

	function disableNewMessageMode() {
		setIsNewMessageModeActive(false);
	}

	function deleteNewMessage() {
		setNewMessage(null);
	}

	// Check messages once after page load.
	useEffect(() => {
		if (!userContext || !userContext.user) {
			navigate("/login");
		}

		loadMessages();

		if (paramMessageId !== undefined && paramMessageId !== null) {
			const shownMessage = messages?.items.find(
				(message: Message) => message.id === paramMessageId,
			);
			if (shownMessage !== undefined && shownMessage !== null) {
				if (isNewMessageModeActive) {
					return;
				}

				setIsMessageViewShown(true);
				setShownMessage(shownMessage);
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
				onClick={() => enableNewMessageMode()}
				disabled={isNewMessageModeActive || isMessageViewShown}
			>
				Новое сообщение
			</Button>
			<HStack p={3} align="top" separator={<StackSeparator />}>
				<VStack w="20%">
					{(!messages || messages.items.length === 0) && (
						<div>Сообщений нет</div>
					)}
					{messages &&
						messages.items
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
				{isNewMessageModeActive && newMessage && (
					<NewMessageForm
						newMessage={newMessage}
						setNewMessage={setNewMessage}
						disableNewMessageMode={disableNewMessageMode}
						deleteNewMessage={deleteNewMessage}
					/>
				)}
			</HStack>
		</AppPage>
	);
};

export default MessagesPage;
