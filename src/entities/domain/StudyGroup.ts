import FieldOfStudy from "./FieldOfStudy";
import {UUID} from "node:crypto";
import User from "./User";

interface StudyGroup {
    id: UUID;
    name: string;
    students: User[];
    fieldOfStudy: FieldOfStudy;
}

export default StudyGroup;