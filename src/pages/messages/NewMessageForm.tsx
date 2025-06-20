import CustomSelectField from "@/components/CustomSelectField";
import { Prose } from "@/components/ui/prose";
import { toaster } from "@/components/ui/toaster";
import { MessageDto } from "@/entities/domain/Message";
import { StudyGroupDto } from "@/entities/domain/StudyGroup";
import User from "@/entities/domain/User";
import ReceiversSelectDialog from "@/pages/messages/ReceiversSelectDialog";
import { ApiContext } from "@/service/ApiProvider";
import { UserContext } from "@/service/UserProvider";
import { Badge, Box, Button, Card, Checkbox, Field, Flex, HStack, Input, Text, Textarea, Wrap } from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuInfo, LuLink, LuSend, LuTrash, LuX } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import { v4 } from "uuid";

interface INewMessageFormProps {
	setIsNewMessageModeActive: Function;
}

const NewMessageForm: React.FC<INewMessageFormProps> = ({ setIsNewMessageModeActive }: INewMessageFormProps) => {
	const apiContext = useContext(ApiContext);
	const userContext = useContext(UserContext)!;

	const { register, handleSubmit, control, watch, getValues, setValue, reset } = useForm<MessageDto>({
		defaultValues: {
			id: v4() as UUID,
			topic: "",
			text: "",
			date: new Date().toISOString(),
			isImportant: false,
			senderId: userContext.user?.id,
			receiversIds: [],
			receiversStudyGroupIds: [],
			attachments: [],
		},
	});

	watch();

	const addAttachment = (url: string) => {
		const attachments = getValues("attachments");
		setValue("attachments", [...attachments, url]);
	};

	const removeAttachment = (index: number) => {
		const attachments = getValues("attachments");
		setValue(
			"attachments",
			attachments.filter((_, i) => i !== index),
		);
	};

	const [isPreviewEnabled, setIsPreviewEnabled] = useState<boolean>(false);
	const [proposedReceivers, setProposedReceivers] = useState<User[]>([]);
	const [studyGroups, setStudyGroups] = useState<StudyGroupDto[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const loadStudyGroups = async () => {
			const response = await apiContext.studyGroup.getAll();
			setStudyGroups(response);
		};

		const loadReceivers = async () => {
			const response = await apiContext.message.getAvailableReceivers(userContext.user!.id);
			setProposedReceivers(response);
		};

		loadStudyGroups();
		loadReceivers();
		setIsNewMessageModeActive(true);
		setIsLoading(false);
	}, []);

	const onSubmit = async (data: MessageDto) => {
		try {
			await apiContext.message.sendMessage(data);

			toaster.create({
				title: "Сообщение успешно отправлено",
				type: "success",
			});

			setIsNewMessageModeActive(false);
		} catch (e) {
			toaster.create({
				title: "Ошибка!",
				type: "error",
			});
		}
	};

	const cannotAddNewAttachment = () => {
		const attachments = getValues("attachments");

		return attachments.length > 0 && attachments.at(-1) === "";
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{!isLoading && (
				<Card.Root className="message_wide_card" w="80%" maxW="80%">
					<Card.Body>
						<Button
							className="close_message_button"
							w="10%"
							onClick={() => setIsNewMessageModeActive(false)}
						>
							Закрыть
						</Button>
						<Card.Title mt="2">Новое сообщение</Card.Title>
						<Flex justify="flex-start" gap={5} direction="column">
							<Field.Root>
								<Field.Label>Тема</Field.Label>
								<Input required maxLength={120} placeholder="Тема" {...register("topic")} />
							</Field.Root>
							<Controller
								control={control}
								name="isImportant"
								render={({ field }) => (
									<Field.Root>
										<Checkbox.Root
											checked={field.value}
											onCheckedChange={({ checked }) => field.onChange(checked)}
										>
											<Checkbox.HiddenInput />
											<Checkbox.Control />
											<Checkbox.Label>Это сообщение с высокой важностью</Checkbox.Label>
										</Checkbox.Root>
									</Field.Root>
								)}
							/>
							<Field.Root>
								<Field.Label>Текст сообщения (поддерживается Markdown)</Field.Label>
								{isPreviewEnabled ? (
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
												<ReactMarkdown>{getValues("text")}</ReactMarkdown>
											</Prose>
										</Box>

										<Button variant="outline" onClick={() => setIsPreviewEnabled(false)}>
											Отключить предпросмотр
										</Button>
									</>
								) : (
									<>
										<Textarea
											required
											maxLength={4000}
											resize="vertical"
											placeholder="Текст сообщения"
											{...register("text")}
										/>
										<Button variant="outline" onClick={() => setIsPreviewEnabled(true)}>
											Предпросмотр
										</Button>
									</>
								)}
							</Field.Root>
							<Field.Root>
								<Field.Label>Получатели</Field.Label>
							</Field.Root>

							<ReceiversSelectDialog
								proposedReceivers={proposedReceivers}
								selectedReceivers={getValues("receiversIds")}
								setSelectedReceivers={(selectedIds) => {
									setValue("receiversIds", selectedIds);
								}}
							/>

							<Wrap gap={2}>
								{getValues("receiversIds")?.map((receiverId) => {
									const receiver = proposedReceivers.find((s) => s.id === receiverId);
									if (!receiver) return null;

									return (
										<Badge key={receiver.id}>
											{receiver.fullName} &lt;
											{receiver.email}&gt;
											<LuX />
										</Badge>
									);
								})}
							</Wrap>

							<Field.Root>
								<Field.Label>Отправить сообщение группам...</Field.Label>
								<CustomSelectField
									control={control}
									name={"receiversStudyGroupIds"}
									multiple
									options={studyGroups
										.sort((a, b) => a.name.localeCompare(b.name))
										.map((studyGroup) => ({
											key: studyGroup.id,
											value: studyGroup.id.toString(),
											label: studyGroup.name,
										}))}
								/>
							</Field.Root>

							<Field.Root>
								<Field.Label>Ссылки на вложения</Field.Label>
								{getValues("attachments").length === 0 && (
									<Text fontSize="xs">
										<HStack>
											<LuInfo />
											Вложения отсутствуют
										</HStack>
									</Text>
								)}
								{getValues("attachments").map((_field, index) => (
									<HStack key={index} gap={2}>
										<LuLink />

										<Input
											type="url"
											placeholder="Ссылка на файл..."
											{...register(`attachments.${index}`)}
										/>
										<Button variant="ghost" onClick={() => removeAttachment(index)}>
											<LuTrash />
										</Button>
									</HStack>
								))}
							</Field.Root>

							<Button
								size="sm"
								w="min-content"
								variant="outline"
								onClick={() => {
									if (!cannotAddNewAttachment()) {
										addAttachment("");
									}
								}}
								disabled={cannotAddNewAttachment()}
							>
								<LuLink />
								Добавить вложение
							</Button>

							<Flex style={{ marginTop: "1.5rem" }} gap={2} justify="flex-end">
								<Button colorPalette="red" variant="surface" onClick={() => reset()}>
									<LuTrash />
									Удалить
								</Button>
								<Button type="submit">
									<LuSend />
									Отправить
								</Button>
							</Flex>
						</Flex>
					</Card.Body>
				</Card.Root>
			)}
		</form>
	);
};

export default NewMessageForm;
