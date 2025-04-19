import { UUID } from "node:crypto";

interface ClassTimeSlot {
	id: UUID;
	name: string;
	ordinal: number;
	startTime: Date;
	endTime: Date;
}

export default ClassTimeSlot;
