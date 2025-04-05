import {UUID} from "node:crypto";
import Subject from "./Subject";
import {ClassType} from "./ScheduleClass";

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
    subjectWorkProgram: SubjectWorkProgram;
}