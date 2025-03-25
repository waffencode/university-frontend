import {UUID} from "node:crypto";

interface ClassTimeSlot {
    id: UUID;
    name: string;
    startTime: Date;
    endTime: Date;
}

export default ClassTimeSlot;