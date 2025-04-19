import AppPage from "@/components/AppPage";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import Classroom from "@/entities/domain/Classroom";
import ClassTimeSlot from "@/entities/domain/ClassTimeSlot";
import {
	ClassTypesListCollection,
	ScheduleClassDto,
} from "@/entities/domain/ScheduleClass";
import { StudyGroupDto } from "@/entities/domain/StudyGroup";
import {
	PlannedClass,
	SubjectWorkProgram,
} from "@/entities/domain/SubjectWorkProgram";
import User from "@/entities/domain/User";
import UserRole from "@/entities/domain/UserRole";
import CustomDatePicker from "@/pages/classes/scheduling/CustomDatePicker";
import CustomMultipleSelectField from "@/pages/classes/scheduling/CustomMultipleSelectField";
import { ApiContext } from "@/service/ApiProvider";
import { Input, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { UUID } from "node:crypto";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

interface SchedulingPageData {
	teachers: User[];
	subjectWorkPrograms: SubjectWorkProgram[];
	timeSlots: ClassTimeSlot[];
	classrooms: Classroom[];
	studyGroups: StudyGroupDto[];
}

const SchedulingPage: React.FC = () => {
	const apiContext = useContext(ApiContext);
	const navigate = useNavigate();
	const { handleSubmit, watch, setValue, control } =
		useForm<ScheduleClassDto>();
	const [scheduleData, setScheduleData] = useState<SchedulingPageData>({
		teachers: [],
		subjectWorkPrograms: [],
		timeSlots: [],
		classrooms: [],
		studyGroups: [],
	});

	const [selectedClass, setSelectedClass] = useState<PlannedClass>();

	const onSubmit = async (data: ScheduleClassDto) => {
		data.id = v4() as UUID;
		data.groupsId = data.groupsId ? data.groupsId : [];
		data.date = format(new Date(data.date), "yyyy-MM-dd");
		await apiContext.scheduleClass.createScheduleClass(data);
		navigate("/classes");
	};

	useEffect(() => {
		const fetchData = async () => {
			const teachers = await apiContext.user.getAllUsers();
			const subjectWorkPrograms =
				await apiContext.subjectWorkProgram.getAll();
			const timeSlots = await apiContext.classTimeSlots.getAll();
			const classrooms = await apiContext.classroom.getAll();
			const studyGroups = await apiContext.studyGroup.getAll();

			setScheduleData({
				teachers,
				subjectWorkPrograms,
				timeSlots,
				classrooms,
				studyGroups,
			});
		};

		fetchData();
	}, []);

	const setSelectedClassByIndex = (index: number) => {
		const foundClass = scheduleData.subjectWorkPrograms
			.find((s) => s.id === watch("subjectWorkProgramId"))
			?.classes.at(index - 1);
		if (foundClass) {
			setSelectedClass(foundClass);
			setValue("classType", foundClass?.classType);
			setValue("name", foundClass?.theme);
		}
	};

	return (
		<AppPage title="Формирование расписания">
			<form onSubmit={handleSubmit(onSubmit)}>
				<VStack gap={2} align="left" w="50%">
					<Field label="Дата занятия">
						<CustomDatePicker
							name={"date"}
							control={control}
							size="xs"
						/>
					</Field>
					<Field label="Преподаватель">
						<CustomMultipleSelectField
							size="xs"
							control={control}
							name={"teacherId"}
							options={scheduleData.teachers
								.filter(
									(user) => user.role === UserRole.Teacher,
								)
								.map((teacher) => ({
									value: teacher.id,
									label: teacher.fullName,
								}))}
						/>
					</Field>
					<Field label="РПД">
						<CustomMultipleSelectField
							size="xs"
							control={control}
							name={"subjectWorkProgramId"}
							options={scheduleData.subjectWorkPrograms.map(
								(workProgram) => ({
									value: workProgram.id,
									label: workProgram.subject.name,
								}),
							)}
						/>
					</Field>
					<Field label="Занятие из РПД">
						<Input
							size="xs"
							type="number"
							min={1}
							max={
								scheduleData.subjectWorkPrograms.find(
									(workProgram) =>
										workProgram.id ===
										watch("subjectWorkProgramId"),
								)?.classes.length || 1
							}
							onChange={(e) =>
								setSelectedClassByIndex(Number(e.target.value))
							}
							placeholder="Номер занятия из РПД..."
						/>
					</Field>
					<Field label="Временной слот">
						<CustomMultipleSelectField
							size="xs"
							control={control}
							name={"timeSlotId"}
							options={scheduleData.timeSlots.map((timeSlot) => ({
								value: timeSlot.id,
								label: timeSlot.name,
							}))}
						/>
					</Field>
					<Field label="Учебные группы">
						<CustomMultipleSelectField
							size="xs"
							control={control}
							name={"groupsId"}
							multiple
							options={scheduleData.studyGroups.map((group) => ({
								value: group.id,
								label: group.name,
							}))}
						/>
					</Field>
					<Field label="Аудитория">
						<CustomMultipleSelectField
							size="xs"
							control={control}
							name={"classroomId"}
							options={scheduleData.classrooms.map(
								(classroom) => ({
									value: classroom.id,
									label: classroom.designation,
								}),
							)}
						/>
					</Field>
					<Field label="Тип занятия">
						{
							ClassTypesListCollection.items.find(
								(p) => p.key === selectedClass?.classType,
							)?.label
						}
					</Field>
					<Field label="Тема занятия">{selectedClass?.theme}</Field>
					<Button type="submit">Добавить</Button>
				</VStack>
			</form>
		</AppPage>
	);
};

export default SchedulingPage;
