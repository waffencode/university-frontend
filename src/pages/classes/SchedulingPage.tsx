import AppPage from "@/components/AppPage";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import Classroom from "@/entities/domain/Classroom";
import ClassTimeSlot from "@/entities/domain/ClassTimeSlot";
import {
	ClassTypesListCollection,
	ScheduleClassDto,
} from "@/entities/domain/ScheduleClass";
import {
	PlannedClass,
	SubjectWorkProgram,
} from "@/entities/domain/SubjectWorkProgram";
import User from "@/entities/domain/User";
import { ApiContext } from "@/service/ApiProvider";
import { Input, VStack } from "@chakra-ui/react";
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
}

const SchedulingPage: React.FC = () => {
	const apiContext = useContext(ApiContext);
	const navigate = useNavigate();
	const { register, handleSubmit, watch, setValue } =
		useForm<ScheduleClassDto>();
	const [scheduleData, setScheduleData] = useState<SchedulingPageData>({
		teachers: [],
		subjectWorkPrograms: [],
		timeSlots: [],
		classrooms: [],
	});

	const [selectedClass, setSelectedClass] = useState<PlannedClass>();

	const onSubmit = async (data: ScheduleClassDto) => {
		data.id = v4() as UUID;
		data.groupsId = data.groupsId ? data.groupsId : [];

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

			setScheduleData({
				teachers,
				subjectWorkPrograms,
				timeSlots,
				classrooms,
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
				<VStack gap={4} align="left">
					<Field label="Дата занятия">
						<Input
							type="date"
							required
							placeholder="Дата занятия"
							{...register("date")}
						/>
					</Field>
					<Field label="Преподаватель">
						<select
							required
							{...register("teacherId")}
							defaultValue=""
						>
							<option value="" disabled hidden>
								Выберите значение
							</option>
							{scheduleData.teachers.map((teacher) => {
								return (
									<option value={teacher.id}>
										{teacher.fullName}
									</option>
								);
							})}
						</select>
					</Field>
					<Field label="РПД">
						<select
							required
							{...register("subjectWorkProgramId")}
							defaultValue=""
						>
							<option value="" disabled hidden>
								Выберите значение
							</option>
							{scheduleData.subjectWorkPrograms.map(
								(workProgram) => {
									return (
										<option value={workProgram.id}>
											{workProgram.subject.name}
										</option>
									);
								},
							)}
						</select>
					</Field>
					<Field label="Номер занятия из РПД">
						<pre>
							{JSON.stringify(
								scheduleData.subjectWorkPrograms.find(
									(s) =>
										s.id === watch("subjectWorkProgramId"),
								),
								null,
								"\t",
							)}
						</pre>
						<Input
							type="number"
							min={1}
							max={
								scheduleData.subjectWorkPrograms.find(
									(s) =>
										s.id === watch("subjectWorkProgramId"),
								)?.classes.length || 1
							}
							onChange={(e) =>
								setSelectedClassByIndex(Number(e.target.value))
							}
							placeholder="Номер занятия из РПД..."
						/>
					</Field>
					<Field label="Временной слот">
						<select
							required
							{...register("timeSlotId")}
							defaultValue=""
						>
							<option value="" disabled hidden>
								Выберите значение
							</option>
							{scheduleData.timeSlots.map((timeSlot) => {
								return (
									<option value={timeSlot.id}>
										{timeSlot.name}
									</option>
								);
							})}
						</select>
					</Field>
					<Field label="Аудитория">
						<select
							required
							{...register("classroomId")}
							defaultValue=""
						>
							<option value="" disabled hidden>
								Выберите значение
							</option>
							{scheduleData.classrooms &&
								scheduleData.classrooms.map((classroom) => {
									return (
										<option value={classroom.id}>
											{classroom.designation}
										</option>
									);
								})}
						</select>
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
