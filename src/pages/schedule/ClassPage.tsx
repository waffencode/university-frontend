import AppPage from "@/components/AppPage";
import { Button } from "@/components/ui/button";
import ScheduleClass from "@/entities/domain/ScheduleClass";
import { ApiContext } from "@/service/ApiProvider";
import {
	HStack,
	NativeSelect,
	Spinner,
	Tabs,
	Text,
	VStack,
} from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useContext, useEffect, useState } from "react";
import { LuUsers } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";

const ClassPage = () => {
	const scheduleClassId = useParams().scheduleClassId as UUID;
	const navigate = useNavigate();
	const apiContext = useContext(ApiContext);

	const [scheduleClass, setScheduleClass] = useState<ScheduleClass>();

	useEffect(() => {
		const loadData = async () => {
			const response =
				await apiContext.scheduleClass.getScheduleClassById(
					scheduleClassId,
				);

			const studyGroups = Promise.all(
				(await apiContext.studyGroup.getAll())
					.filter((s) => response.groupsId.includes(s.id))
					.map(async (s) => ({
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
			};

			setScheduleClass(entity);
		};

		loadData();
	}, []);

	return (
		<AppPage title="Журнал занятия">
			<>
				{/*<pre*/}
				{/*	style={{*/}
				{/*		whiteSpace: "pre-wrap",*/}
				{/*		wordWrap: "break-word",*/}
				{/*		background: "white",*/}
				{/*		padding: "1rem",*/}
				{/*		borderRadius: "4px",*/}
				{/*		marginTop: "1rem",*/}
				{/*	}}*/}
				{/*>*/}
				{/*	{JSON.stringify(scheduleClass, null, 2)}*/}
				{/*</pre>*/}
				{scheduleClass === undefined ? (
					<Spinner />
				) : (
					<>
						<p>Учебные группы на этом занятии:</p>
						<Tabs.Root>
							<Tabs.List>
								{scheduleClass.groups?.map((group) => (
									<Tabs.Trigger
										key={group.id}
										value={group.id}
									>
										<LuUsers />
										{group.name}
									</Tabs.Trigger>
								))}
							</Tabs.List>
							{scheduleClass.groups?.map((group) => (
								<Tabs.Content key={group.id} value={group.id}>
									<VStack gap={3} align="stretch" w="100%">
										{group.students.map((student) => (
											<HStack
												key={student.id}
												p={1}
												bg="white"
												borderRadius="md"
												borderWidth="1px"
												borderColor="gray.100"
												justifyContent="space-between"
												_hover={{ bg: "gray.50" }}
											>
												<Text fontWeight="medium">
													{student.fullName}
												</Text>

												<HStack gap={4}>
													<NativeSelect.Root
														size="sm"
														defaultValue={""}
													>
														<NativeSelect.Field>
															<option value="П">
																Присутствует
															</option>
															<option value="Б">
																Болел(-а)
															</option>
															<option value="Н">
																Уважительная
																причина
															</option>
															<option value="О">
																Отсутствовал(-а)
															</option>
														</NativeSelect.Field>
														<NativeSelect.Indicator />
													</NativeSelect.Root>

													<HStack gap={2}>
														{[1, 2, 3, 4, 5].map(
															(grade) => (
																<Button
																	key={grade}
																	size="sm"
																	colorScheme={
																		5 ===
																		grade
																			? "blue"
																			: "gray"
																	}
																	variant={
																		5 ===
																		grade
																			? "solid"
																			: "outline"
																	}
																>
																	{grade}
																</Button>
															),
														)}
													</HStack>
												</HStack>
											</HStack>
										))}
									</VStack>
								</Tabs.Content>
							))}
						</Tabs.Root>
					</>
				)}

				<HStack gap={4} mt={4}>
					<Button
						variant="surface"
						onClick={() => navigate("/schedule")}
					>
						Назад
					</Button>
				</HStack>
			</>
		</AppPage>
	);
};

export default ClassPage;
