import {UUID} from "node:crypto";
import User from "./User";

export enum ClassType {
    Lecture,
    Lab,
    Seminar,
    Exam,
}

interface ScheduleClass {
    id: UUID;
    name: string;
    professor: User;
    startTime: Date;
    endTime: Date;
    classType: ClassType;
}

export default ScheduleClass;