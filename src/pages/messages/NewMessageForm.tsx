import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Prose } from "@/components/ui/prose";
import { toaster } from "@/components/ui/toaster";
import Message from "@/entities/domain/Message";
import User from "@/entities/domain/User";
import { UserRoleNamesCollection } from "@/entities/domain/UserRole";
import { ApiContext } from "@/service/ApiProvider";
import { UserContext } from "@/service/UserProvider";
import {
	Box,
	Card,
	CheckboxCard,
	Dialog,
	Flex,
	HStack,
	Input,
	Portal,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useContext, useEffect, useState } from "react";
import { LuSend, LuTrash } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import { v4 } from "uuid";

interface INewMessageFormProps {
	isNewMessageModeActive: boolean;
	setIsNewMessageModeActive: Function;
}

const NewMessageForm: React.FC<INewMessageFormProps> = ({
	isNewMessageModeActive,
	setIsNewMessageModeActive,
}: INewMessageFormProps) => {
	const [isPreviewEnabled, setIsPreviewEnabled] = useState<boolean>(false);
	const apiContext = useContext(ApiContext);
	const userContext = useContext(UserContext)!;
	const [proposedReceivers, setProposedReceivers] = useState<User[]>([]);
	const [selectedReceivers, setSelectedReceivers] = useState<User[]>([]);

	const [newMessage, setNewMessage] = useState<Message | null>(null);

	function loadReceivers() {
		apiContext.user.getAllUsers().then((response) => {
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

	function deleteNewMessage() {
		setNewMessage(null);
	}

	async function sendMessage(message: Message) {
		await apiContext.message.sendMessage(message);
		deleteNewMessage();
		disableNewMessageMode();

		toaster.create({
			title: "Сообщение успешно отправлено",
			type: "success",
		});
	}

	function enableNewMessageMode() {
		if (!newMessage?.id) {
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

	useEffect(() => {
		if (isNewMessageModeActive) {
			enableNewMessageMode();
		}
	}, []);

	return (
		<>
			{newMessage?.id && (
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
						<Flex justify="flex-start" gap={5} direction="column">
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
									<Button variant="outline">Выбрать</Button>
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
												<VStack gap={2} align="left">
													{proposedReceivers &&
														proposedReceivers.map(
															(receiverUser) => (
																<CheckboxCard.Root
																	size="sm"
																	key={
																		receiverUser.id
																	}
																	value={
																		receiverUser.id
																	}
																	defaultChecked={selectedReceivers.some(
																		(r) =>
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
												<Dialog.ActionTrigger asChild>
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

												<Dialog.ActionTrigger asChild>
													<Button>Сохранить</Button>
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
								<Button onClick={() => sendMessage(newMessage)}>
									<LuSend />
									Отправить
								</Button>
							</Flex>
						</Flex>
					</Card.Body>
				</Card.Root>
			)}
		</>
	);
};

export default NewMessageForm;
