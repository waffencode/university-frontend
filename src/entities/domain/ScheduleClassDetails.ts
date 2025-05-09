import User from "@/entities/domain/User";

export enum AttendanceType {
	Present,
	Sick,
	Excused,
	Absent,
}

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
