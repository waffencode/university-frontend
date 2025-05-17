import AppPage from "@/components/AppPage";
import CustomSelectField from "@/components/CustomSelectField";
import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
import ScheduleClass, {
	ClassTypesListCollection,
} from "@/entities/domain/ScheduleClass";
import ScheduleClassDetails, {
	AttendanceTypesListCollection,
	ScheduleClassDetailsDto,
	StudentDetails,
} from "@/entities/domain/ScheduleClassDetails";
import { ApiContext } from "@/service/ApiProvider";
import { formatTime } from "@/service/FormatDate";
import {
	Box,
	HStack,
	Image,
	Spinner,
	Tabs,
	Text,
	VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { UUID } from "node:crypto";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuSave, LuUsers } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";

const ClassPage = () => {
	const scheduleClassId = useParams().scheduleClassId as UUID;
	const navigate = useNavigate();
	const apiContext = useContext(ApiContext);
	const { handleSubmit, setValue, control, getValues, watch } =
		useForm<ScheduleClassDetailsDto>({
			defaultValues: {
				id: "",
				studentDetailsDtoList: [],
			},
		});

	watch();

	const [scheduleClass, setScheduleClass] = useState<ScheduleClass>();
	const [isSaving, setIsSaving] = useState(false);

	const onSubmit = async (data: ScheduleClassDetailsDto) => {
		try {
			data.studentDetailsDtoList.forEach(
				(sd) => (sd.attendance = Number(sd.attendance)),
			);
			setIsSaving(true);
			await apiContext.scheduleClass.updateClassJournal(
				scheduleClassId,
				data,
			);
			setIsSaving(false);
			toaster.create({
				title: "Сохранено",
				type: "success",
			});
		} catch (e) {
			console.error(e);
			toaster.create({
				title: "Ошибка",
				type: "error",
			});
		}
	};

	useEffect(() => {
		const loadData = async () => {
			const response =
				await apiContext.scheduleClass.getScheduleClassById(
					scheduleClassId,
				);

			const studyGroups = Promise.all(
				(
					await apiContext.scheduleClass.getStudyGroupsForClass(
						scheduleClassId,
					)
				).map(async (s) => ({
					id: s.id,
					name: s.name,
					students: (await apiContext.user.getAllUsers()).filter(
						(u) => s.studentsIdList.includes(u.id),
					),
					fieldOfStudy: await apiContext.fieldOfStudy.getById(
						s.fieldOfStudyId,
					),
				})),
			);

			const detailsDto =
				await apiContext.scheduleClass.getScheduleClassDetails(
					scheduleClassId,
				);

			const details: ScheduleClassDetails = {
				id: detailsDto.id,
				studentDetailsList: await Promise.all(
					detailsDto.studentDetailsDtoList.map(
						async (studentDetails) =>
							({
								id: studentDetails.id,
								student: await apiContext.user.getUser(
									studentDetails.studentId as UUID,
								),
								attendance: studentDetails.attendance,
								grade: studentDetails.grade,
							}) as StudentDetails,
					),
				),
			};

			const entity = {
				id: response.id,
				name: response.name,
				teacher: await apiContext.user.getUser(response.teacherId),
				date: new Date(response.date),
				timeSlot: await apiContext.classTimeSlots.getById(
					response.timeSlotId,
				),
				classroom: await apiContext.classroom.getById(
					response.classroomId,
				),
				subjectWorkProgram: await apiContext.subjectWorkProgram.getById(
					response.subjectWorkProgramId,
				),
				classType: response.classType,
				groups: await studyGroups,
				details: details,
			};

			setScheduleClass(entity);

			setValue("id", entity.details.id);
			setValue(
				"studentDetailsDtoList",
				entity.details.studentDetailsList.map((s) => ({
					id: s.id,
					studentId: s.student.id,
					attendance: s.attendance,
					grade: s.grade,
				})),
			);
		};

		loadData();
	}, []);

	return (
		<AppPage title="Журнал занятия">
			{scheduleClass === undefined ? (
				<Spinner />
			) : (
				<>
					<HStack gap={6} alignItems="flex-start">
						<VStack gap={4} align="left" w="30%">
							<VStack gap={0} align="left">
								<Text
									textStyle="sm"
									color="gray.400"
									fontWeight="semibold"
								>
									Дисциплина
								</Text>
								<Text fontWeight="semibold">
									{
										scheduleClass.subjectWorkProgram.subject
											.name
									}
								</Text>
							</VStack>
							<VStack gap={0} align="left">
								<Text
									textStyle="sm"
									color="gray.400"
									fontWeight="semibold"
								>
									Дата и время
								</Text>
								<Text fontWeight="semibold">
									{format(
										new Date(scheduleClass.date),
										"dd.MM.yyyy",
									)}{" "}
									(
									{formatTime(
										scheduleClass.timeSlot.startTime,
									)}
									—
									{formatTime(scheduleClass.timeSlot.endTime)}
									)
								</Text>
							</VStack>
							<VStack gap={0} align="left">
								<Text
									textStyle="sm"
									color="gray.400"
									fontWeight="semibold"
								>
									Аудитория
								</Text>
								<Text fontWeight="semibold">
									{scheduleClass.classroom.designation}
								</Text>
							</VStack>
							<VStack gap={0} align="left">
								<Text
									textStyle="sm"
									color="gray.400"
									fontWeight="semibold"
								>
									Вид занятия
								</Text>
								<Text fontWeight="semibold">
									{
										ClassTypesListCollection.items[
											scheduleClass.classType
										].label
									}
								</Text>
							</VStack>
						</VStack>
						<VStack gap={4} align="left" w="40%">
							<VStack gap={1} align="left">
								<Text
									textStyle="sm"
									color="gray.400"
									fontWeight="semibold"
								>
									Преподаватель
								</Text>
								<Text fontWeight="semibold">
									<HStack gap={2}>
										<Image
											w="2.5rem"
											borderRadius="full"
											src={
												scheduleClass.teacher.avatarUri
											}
										/>
										{scheduleClass.teacher.fullName}
									</HStack>
								</Text>
							</VStack>
							<VStack gap={0} align="left">
								<Text
									textStyle="sm"
									color="gray.400"
									fontWeight="semibold"
								>
									Тема
								</Text>
								<Text>{scheduleClass.name}</Text>
							</VStack>
						</VStack>
					</HStack>

					<Box mt={6}>
						<p>Учебные группы на этом занятии:</p>
						<form onSubmit={handleSubmit(onSubmit)}>
							<VStack gap={4} align="left">
								<Tabs.Root
									defaultValue={scheduleClass.groups[0].id}
								>
									<Tabs.List>
										{scheduleClass.groups
											?.sort((a, b) =>
												a.name.localeCompare(b.name),
											)
											.map((group) => (
												<Tabs.Trigger
													key={group.id}
													value={group.id}
												>
													<LuUsers />
													{group.name}
												</Tabs.Trigger>
											))}
									</Tabs.List>
									{scheduleClass.groups
										?.sort((a, b) =>
											a.name.localeCompare(b.name),
										)
										.map((group, groupIndex) => (
											<Tabs.Content
												key={group.id}
												value={group.id}
											>
												<VStack
													gap={3}
													align="stretch"
													w="100%"
												>
													{group.students
														.sort((a, b) =>
															a.fullName.localeCompare(
																b.fullName,
															),
														)
														.map(
															(
																student,
																rowNumber,
															) => {
																const studentIndex =
																	scheduleClass.details.studentDetailsList.findIndex(
																		(s) =>
																			s
																				.student
																				.id ===
																			student.id,
																	);

																return (
																	<HStack
																		key={
																			student.id
																		}
																		p={1}
																		bg="white"
																		borderRadius="md"
																		borderWidth="1px"
																		borderColor="gray.100"
																		justifyContent="space-between"
																		_hover={{
																			bg: "gray.50",
																		}}
																	>
																		<Text fontWeight="medium">
																			{rowNumber +
																				1}
																			.{" "}
																			{
																				student.fullName
																			}
																		</Text>

																		<HStack
																			gap={
																				2
																			}
																			w="40%"
																		>
																			<CustomSelectField
																				control={
																					control
																				}
																				name={`studentDetailsDtoList.${studentIndex}.attendance`}
																				options={
																					AttendanceTypesListCollection.items
																				}
																				defaultValue={`studentDetailsDtoList.${studentIndex}.attendance`}
																				size={
																					"sm"
																				}
																			/>

																			<Button
																				size="sm"
																				variant={
																					getValues(
																						`studentDetailsDtoList.${studentIndex}.grade`,
																					) ===
																					null
																						? "solid"
																						: "outline"
																				}
																				onClick={() => {
																					setValue(
																						`studentDetailsDtoList.${studentIndex}.grade`,
																						null!,
																					);
																				}}
																			>
																				Без
																				оценки
																			</Button>
																			{[
																				1,
																				2,
																				3,
																				4,
																				5,
																			].map(
																				(
																					grade,
																				) => (
																					<Button
																						key={
																							grade
																						}
																						size="sm"
																						variant={
																							getValues(
																								`studentDetailsDtoList.${studentIndex}.grade`,
																							) ===
																							grade
																								? "solid"
																								: "outline"
																						}
																						onClick={() => {
																							setValue(
																								`studentDetailsDtoList.${studentIndex}.grade`,
																								grade,
																							);
																						}}
																					>
																						{
																							grade
																						}
																					</Button>
																				),
																			)}
																		</HStack>
																	</HStack>
																);
															},
														)}
												</VStack>
											</Tabs.Content>
										))}
								</Tabs.Root>
								<Button w="15%" type="submit">
									{isSaving ? <Spinner /> : <LuSave />}
									Сохранить журнал
								</Button>
							</VStack>
						</form>
					</Box>
				</>
			)}

			<HStack gap={4} mt={4}>
				<Button variant="surface" onClick={() => navigate("/schedule")}>
					Назад
				</Button>
			</HStack>
		</AppPage>
	);
};

export default ClassPage;
