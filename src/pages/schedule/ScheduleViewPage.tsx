import AppPage from "@/components/AppPage";
import "@/pages/schedule/SchedulePage.css";
import ScheduleClass, {
	ClassTypesListCollection,
} from "@/entities/domain/ScheduleClass";
import { ApiContext } from "@/service/ApiProvider";
import { formatDateShort, formatTime } from "@/service/FormatDate";
import { Card, Heading, HStack, Input, Tabs, VStack } from "@chakra-ui/react";
import { addDays, endOfISOWeek, startOfISOWeek } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
	LuClock,
	LuMapPin,
	LuUniversity,
	LuUser,
	LuUsers,
	LuWatch,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const ScheduleViewPage: React.FC = () => {
	const apiContext = useContext(ApiContext);
	const [classesData, setClassesData] = useState<ScheduleClass[]>([]);
	const navigate = useNavigate();

	const [dateToShow, setDateToShow] = useState<Date>(new Date());
	const [daysOfWeek, setDaysOfWeek] = useState<Date[]>([]);

	useEffect(() => {
		const loadSchedule = async () => {
			const classes = await apiContext.scheduleClass.getScheduleClasses();
			const data = await Promise.all(
				classes.map(
					async (classDto) =>
						({
							id: classDto.id,
							name: classDto.name,
							teacher: await apiContext.user.getUser(
								classDto.teacherId,
							),
							date: new Date(classDto.date),
							timeSlot: await apiContext.classTimeSlots.getById(
								classDto.timeSlotId,
							),
							classroom: await apiContext.classroom.getById(
								classDto.classroomId,
							),
							subjectWorkProgram:
								await apiContext.subjectWorkProgram.getById(
									classDto.subjectWorkProgramId,
								),
							classType: classDto.classType,
							groups: await Promise.all(
								(await apiContext.studyGroup.getAll())
									.filter((c) =>
										classDto.groupsId.includes(c.id),
									)
									.map(async (s) => ({
										id: s.id,
										name: s.name,
										students:
											await apiContext.user.getAllUsers(),
										fieldOfStudy:
											await apiContext.fieldOfStudy.getById(
												s.fieldOfStudyId,
											),
									})),
							),
						}) as ScheduleClass,
				),
			);

			setClassesData(data);
		};

		const start = startOfISOWeek(dateToShow);
		const end = endOfISOWeek(dateToShow);

		setDaysOfWeek([
			start,
			addDays(start, 1),
			addDays(start, 2),
			addDays(start, 3),
			addDays(start, 4),
			addDays(start, 5),
			end,
		]);

		loadSchedule();
	}, [dateToShow]);

	return (
		<AppPage title="Расписание">
			<VStack gap={5} align="left">
				<p>Выберите дату для просмотра расписания на неделю:</p>
				<DatePicker
					locale="ru"
					dateFormat="dd.MM.yyyy"
					selected={dateToShow}
					onChange={(date) => setDateToShow(date || new Date())}
					customInput={<Input autoComplete="off" />}
				/>
				<Tabs.Root defaultValue={formatDateShort(dateToShow)}>
					<Tabs.List>
						{daysOfWeek.map((dayOfWeek) => (
							<Tabs.Trigger value={formatDateShort(dayOfWeek)}>
								<LuClock />
								{formatDateShort(dayOfWeek)}
							</Tabs.Trigger>
						))}
					</Tabs.List>
					{daysOfWeek.map((dayOfWeek) => (
						<Tabs.Content value={formatDateShort(dayOfWeek)}>
							<div key={dayOfWeek.toString()}>
								<div className="card-content">
									<h2>{formatDateShort(dayOfWeek)}</h2>
								</div>
								<VStack gap={2} align="left" w="30%">
									{classesData &&
										classesData
											.filter(
												(scheduleClass) =>
													scheduleClass.date.getDate() ===
													dayOfWeek.getDate(),
											)
											.sort(
												(
													a: ScheduleClass,
													b: ScheduleClass,
												) =>
													a.timeSlot.ordinal -
													b.timeSlot.ordinal,
											)
											.map((scheduleClass) => (
												<Card.Root
													size="sm"
													className="class-card"
													onClick={() =>
														navigate(
															`./${scheduleClass.id}`,
														)
													}
													key={scheduleClass.id}
												>
													<Card.Header>
														<Heading>
															{
																scheduleClass
																	.timeSlot
																	.ordinal
															}
															.{" "}
															{
																scheduleClass
																	.subjectWorkProgram
																	.subject
																	.name
															}
														</Heading>
													</Card.Header>
													<Card.Body>
														<VStack alignItems="flex-start">
															<HStack>
																<LuWatch />
																{formatTime(
																	scheduleClass
																		.timeSlot
																		.startTime,
																)}
																-
																{formatTime(
																	scheduleClass
																		.timeSlot
																		.endTime,
																)}
															</HStack>
															<HStack>
																<LuUniversity />
																{
																	ClassTypesListCollection.items.find(
																		(s) =>
																			s.key ===
																			scheduleClass.classType,
																	)?.label
																}
																<br />
															</HStack>
															<HStack>
																<LuUser />
																{
																	scheduleClass
																		.teacher
																		.fullName
																}
																<br />
															</HStack>
															<HStack>
																<LuMapPin />
																{
																	scheduleClass
																		.classroom
																		.designation
																}
															</HStack>
															<HStack>
																<LuUsers />
																{scheduleClass.groups
																	.map(
																		(g) =>
																			g.name,
																	)
																	.join(", ")}
															</HStack>
														</VStack>
													</Card.Body>
												</Card.Root>
											))}
								</VStack>
							</div>
						</Tabs.Content>
					))}
				</Tabs.Root>
			</VStack>
		</AppPage>
	);
};

export default ScheduleViewPage;
