import ScheduleClass from "@/entities/domain/ScheduleClass";
import StudyGroup from "@/entities/domain/StudyGroup";
import { UUID } from "node:crypto";
import User from "./User.ts";

interface MessageDto {
	id: string;
	topic: string;
	text: string;
	date: string;
	isImportant: boolean;
	senderId: string;
	receiversIds: string[];
	receiversStudyGroupIds: string[];
	attachments: string[];
	relatedClassId?: string;
}

interface Message {
	id: UUID;
	topic: string;
	text: string;
	date: Date;
	isImportant: boolean;
	sender: User;
	receivers: User[];
	receiversStudyGroup: StudyGroup[];
	attachments: string[];
	relatedClass?: ScheduleClass;
}

export default Message;
