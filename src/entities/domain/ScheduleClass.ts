import Classroom from "@/entities/domain/Classroom";
import ClassTimeSlot from "@/entities/domain/ClassTimeSlot";
import StudyGroup from "@/entities/domain/StudyGroup";
import { SubjectWorkProgram } from "@/entities/domain/SubjectWorkProgram";
import { createListCollection } from "@chakra-ui/react";
import { UUID } from "node:crypto";
import User from "./User";

export enum ClassType {
	Lecture,
	Lab,
	Seminar,
	Exam,
}

export const ClassTypesListCollection = createListCollection({
	items: [
		{ key: ClassType.Lecture, label: "Лекция", value: "0" },
		{ key: ClassType.Lab, label: "Лабораторная работа", value: "1" },
		{ key: ClassType.Seminar, label: "Практическая работа", value: "2" },
		{ key: ClassType.Exam, label: "Экзамен", value: "3" },
	],
});

export interface ScheduleClassDto {
	id: UUID;
	name: string;
	teacherId: UUID;
	date: string;
	timeSlotId: UUID;
	classroomId: UUID;
	subjectWorkProgramId: UUID;
	classType: ClassType;
	groupsId: UUID[];
}

interface ScheduleClass {
	id: UUID;
	name: string;
	teacher: User;
	date: Date;
	timeSlot: ClassTimeSlot;
	classroom: Classroom;
	subjectWorkProgram: SubjectWorkProgram;
	classType: ClassType;
	groups: StudyGroup[];
}

export default ScheduleClass;
