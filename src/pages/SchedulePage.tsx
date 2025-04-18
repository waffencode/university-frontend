import ScheduleClass, {
	ClassTypesListCollection,
} from "@/entities/domain/ScheduleClass";
import { ApiContext } from "@/service/ApiProvider";
import {
	formatDateShort,
	formatDateWithDotsDivider,
	formatTime,
} from "@/service/FormatDate";
import { Card, Heading, HStack, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
	LuMapPin,
	LuUniversity,
	LuUser,
	LuUsers,
	LuWatch,
} from "react-icons/lu";
import AppPage from "../components/AppPage";
import "./SchedulePage.css";

const SchedulePage: React.FC = () => {
	const apiContext = useContext(ApiContext);
	const [classesData, setClassesData] = useState<ScheduleClass[]>([]);

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
							groups: (
								await apiContext.studyGroup.getAll()
							).filter((c) => classDto.groupsId.includes(c.id)),
						}) as ScheduleClass,
				),
			);

			setClassesData(data);
		};

		loadSchedule();
	}, []);

	return (
		<AppPage title="Расписание">
			<div>
				<div className="card-content">
					<h2>{formatDateShort(new Date())}</h2>
				</div>
				<VStack gap={2} align="left" w="30%">
					{classesData &&
						classesData.map((scheduleClass) => (
							<Card.Root
								size="sm"
								className="class-card"
								key={scheduleClass.id}
							>
								<Card.Header>
									<Heading>
										{
											scheduleClass.subjectWorkProgram
												.subject.name
										}{" "}
										(
										{formatDateWithDotsDivider(
											scheduleClass.date,
										)}
										)
									</Heading>
								</Card.Header>
								<Card.Body>
									<VStack alignItems="flex-start">
										<HStack>
											<LuWatch />
											{formatTime(
												scheduleClass.timeSlot
													.startTime,
											)}
											-
											{formatTime(
												scheduleClass.timeSlot.endTime,
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
											{scheduleClass.teacher.fullName}
											<br />
										</HStack>
										<HStack>
											<LuMapPin />
											{
												scheduleClass.classroom
													.designation
											}
										</HStack>
										<HStack>
											<LuUsers />
											{scheduleClass.groups
												.map((g) => g.name)
												.join(", ")}
										</HStack>
									</VStack>
								</Card.Body>
							</Card.Root>
						))}
				</VStack>
			</div>
		</AppPage>
	);
};

export default SchedulePage;
