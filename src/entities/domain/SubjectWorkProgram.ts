import {UUID} from "node:crypto";
import Subject from "./Subject";
import {ClassType} from "./ScheduleClass";

interface SubjectWorkProgram {
    id: UUID;
    subject: Subject;
    classes: PlannedClass[];
}

interface PlannedClass {
    id: UUID;
    theme: string;
    hours: number;
    classType: ClassType;
    subjectWorkProgram: SubjectWorkProgram;
}

export {SubjectWorkProgram, PlannedClass}