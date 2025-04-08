import { UUID } from "node:crypto";
import { ClassType } from "./ScheduleClass";
import Subject from "./Subject";

export interface SubjectWorkProgram {
	id: UUID;
	subject: Subject;
	classes: PlannedClass[];
}

export interface PlannedClass {
	id: UUID;
	theme: string;
	hours: number;
	classType: ClassType;
}
