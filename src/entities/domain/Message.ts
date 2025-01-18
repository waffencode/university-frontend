import {UUID} from "node:crypto";
import User from "./User.ts";

interface Message {
    id: UUID;
    topic: string;
    text: string;
    date: Date;
    isImportant: boolean;
    sender: User;
    receivers: User[];
    receiversStudyGroup: UUID[];
}

export default Message;