import { UUID } from "node:crypto";
import FieldOfStudy from "./FieldOfStudy";
import User from "./User";

export interface StudyGroupDto {
	id: UUID;
	name: string;
	studentsIdList: string[];
	fieldOfStudyId: UUID;
}

interface StudyGroup {
	id: UUID;
	name: string;
	students: User[];
	fieldOfStudy: FieldOfStudy;
}

export default StudyGroup;
