import AppPage from "@/components/AppPage.tsx";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Prose } from "@/components/ui/prose";
import { toaster } from "@/components/ui/toaster";
import Message from "@/entities/domain/Message.ts";
import "@/pages/messages/MessagesPage.css";
import User from "@/entities/domain/User.ts";
import { UserRoleNamesCollection } from "@/entities/domain/UserRole";
import MessagePreviewCard from "@/pages/messages/MessagePreviewCard";
import MessageView from "@/pages/messages/MessageView.tsx";
import { ApiContext } from "@/service/ApiProvider";
import { UserContext } from "@/service/UserProvider";
import {
	Box,
	Card,
	CheckboxCard,
	createListCollection,
	Dialog,
	Flex,
	HStack,
	Input,
	ListCollection,
	Portal,
	StackSeparator,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { LuSend, LuTrash } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";

// TODO: Refactor.
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
	const [isPreviewEnabled, setIsPreviewEnabled] = useState<boolean>(false);
	const [proposedReceivers, setProposedReceivers] = useState<User[]>([]);
	const [selectedReceivers, setSelectedReceivers] = useState<User[]>([]);

	const loadMessages = useCallback(() => {
		console.log(new Date().toString() + ": Loading messages");

		if (!userContext || !userContext.user) {
			return;
		}

		apiContext.message.getMessages(userContext.user.id).then((response) => {
			setMessages(createListCollection({ items: response }));
		});
	}, [apiContext.message, userContext]);

	async function sendMessage(message: Message) {
		await apiContext.message.sendMessage(message);
		deleteNewMessage();
		disableNewMessageMode();

		toaster.create({
			title: "Сообщение успешно отправлено",
			type: "success",
		});
	}

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

	function loadReceivers() {
		console.log(new Date().toString() + ": Getting receivers");

		apiContext.user.getAllUsers().then((response) => {
			console.log(new Date().toString() + ": Receivers loaded");
			setProposedReceivers(response);
		});
	}

	function onDialogOpenClose() {
		loadReceivers();
		Object.assign(newMessage!.receivers, selectedReceivers);
	}

	function handleReceiver(selectedUser: User, isChecked: boolean) {
		if (isChecked) {
			selectedReceivers.push(selectedUser);
		} else {
			let copy = Object.assign([], selectedReceivers);
			let index = copy.indexOf(selectedUser);
			copy.splice(index, 1);
			setSelectedReceivers(copy);
		}
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
					<Card.Root className="message_wide_card" w="80%">
						<Card.Body>
							<Button
								className="close_message_button"
								w="10%"
								onClick={() => disableNewMessageMode()}
							>
								Закрыть
							</Button>
							<Card.Title mt="2">Новое сообщение</Card.Title>
							<Flex
								justify="flex-start"
								gap={5}
								direction="column"
							>
								<Field label="Тема">
									<Input
										placeholder="Тема"
										value={newMessage.topic}
										onChange={(e) =>
											setNewMessage({
												...newMessage,
												topic: e.target.value,
											})
										}
									/>
								</Field>
								<Checkbox
									checked={newMessage.isImportant}
									onCheckedChange={(e) =>
										setNewMessage({
											...newMessage,
											isImportant: !!e.checked,
										})
									}
								>
									Это сообщение с высокой важностью
								</Checkbox>
								<Field label="Текст сообщения (поддерживается Markdown)">
									{isPreviewEnabled && (
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

											<Button
												variant="outline"
												onClick={() =>
													setIsPreviewEnabled(false)
												}
											>
												Отключить предпросмотр
											</Button>
										</>
									)}
									{!isPreviewEnabled && (
										<>
											<Textarea
												resize="vertical"
												placeholder="Текст сообщения"
												value={newMessage.text}
												onChange={(e) =>
													setNewMessage({
														...newMessage,
														text: e.target.value,
													})
												}
											/>
											<Button
												variant="outline"
												onClick={() =>
													setIsPreviewEnabled(true)
												}
											>
												Предпросмотр
											</Button>
										</>
									)}
								</Field>
								<Field label="Получатели"></Field>
								<Dialog.Root
									size="cover"
									placement="center"
									motionPreset="slide-in-bottom"
									onOpenChange={() => onDialogOpenClose()}
								>
									<Dialog.Trigger asChild>
										<Button variant="outline">
											Выбрать
										</Button>
									</Dialog.Trigger>
									<Portal>
										<Dialog.Backdrop />
										<Dialog.Positioner>
											<Dialog.Content>
												<Dialog.Header>
													<Dialog.Title>
														Выбрать получателей
													</Dialog.Title>
												</Dialog.Header>
												<Dialog.Body>
													<VStack
														gap={2}
														align="left"
													>
														{proposedReceivers &&
															proposedReceivers.map(
																(
																	receiverUser,
																) => (
																	<CheckboxCard.Root
																		size="sm"
																		key={
																			receiverUser.id
																		}
																		value={
																			receiverUser.id
																		}
																		defaultChecked={selectedReceivers.some(
																			(
																				r,
																			) =>
																				r.id ===
																				receiverUser.id,
																		)}
																		onCheckedChange={(
																			e,
																		) =>
																			handleReceiver(
																				receiverUser,
																				!!e.checked,
																			)
																		}
																		maxW="240px"
																	>
																		<CheckboxCard.HiddenInput />
																		<CheckboxCard.Control>
																			<CheckboxCard.Content>
																				<CheckboxCard.Label>
																					{
																						receiverUser.fullName
																					}
																				</CheckboxCard.Label>
																				<CheckboxCard.Description>
																					{
																						receiverUser.email
																					}
																				</CheckboxCard.Description>
																			</CheckboxCard.Content>
																			<CheckboxCard.Indicator />
																		</CheckboxCard.Control>
																	</CheckboxCard.Root>
																),
															)}
													</VStack>
												</Dialog.Body>
												<Dialog.Footer>
													<Dialog.ActionTrigger
														asChild
													>
														<Button
															variant="outline"
															onClick={() =>
																setSelectedReceivers(
																	[],
																)
															}
														>
															Сброс
														</Button>
													</Dialog.ActionTrigger>

													<Dialog.ActionTrigger
														asChild
													>
														<Button>
															Сохранить
														</Button>
													</Dialog.ActionTrigger>
												</Dialog.Footer>
											</Dialog.Content>
										</Dialog.Positioner>
									</Portal>
								</Dialog.Root>
								<HStack gap={2}>
									{selectedReceivers?.map((receiver) => (
										<Card.Root key={receiver.id}>
											<Card.Body>
												<Card.Title>
													{receiver.fullName}
												</Card.Title>
												<Card.Description>
													{
														UserRoleNamesCollection.at(
															receiver.role,
														)?.label
													}
													<br />
													{"<" + receiver.email + ">"}
												</Card.Description>
											</Card.Body>
										</Card.Root>
									))}
								</HStack>

								<Flex
									style={{ marginTop: "1.5rem" }}
									gap={2}
									justify="flex-end"
								>
									<Button
										colorPalette="red"
										variant="surface"
										onClick={() => deleteNewMessage()}
									>
										<LuTrash />
										Удалить
									</Button>
									<Button
										onClick={() => sendMessage(newMessage)}
									>
										<LuSend />
										Отправить
									</Button>
								</Flex>
							</Flex>
						</Card.Body>
					</Card.Root>
				)}
			</HStack>
		</AppPage>
	);
};

export default MessagesPage;
