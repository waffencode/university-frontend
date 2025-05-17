import User from "@/entities/domain/User";
import { createListCollection } from "@chakra-ui/react";

export enum AttendanceType {
	Present,
	Sick,
	Excused,
	Absent,
}

export const AttendanceTypesListCollection = createListCollection({
	items: [
		{
			key: AttendanceType.Present,
			label: "Присутствует",
			value: "0",
		},
		{
			key: AttendanceType.Sick,
			label: "Болел(-а)",
			value: "1",
		},
		{
			key: AttendanceType.Excused,
			label: "Уважительная причина",
			value: "2",
		},
		{
			key: AttendanceType.Absent,
			label: "Отсутствовал(-а)",
			value: "3",
		},
	],
});

export interface StudentDetailsDto {
	id: string;
	studentId: string;
	attendance: AttendanceType;
	grade?: number;
}

export interface ScheduleClassDetailsDto {
	id: string;
	studentDetailsDtoList: StudentDetailsDto[];
}

export interface StudentDetails {
	id: string;
	student: User;
	attendance: AttendanceType;
	grade?: number;
}

interface ScheduleClassDetails {
	id: string;
	studentDetailsList: StudentDetails[];
}

export default ScheduleClassDetails;
