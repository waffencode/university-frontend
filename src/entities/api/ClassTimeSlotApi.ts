import config from "@/config.json";
import ClassTimeSlot from "@/entities/domain/ClassTimeSlot";
import axios from "axios";
import { UUID } from "node:crypto";

class ClassTimeSlotApi {
	serverUrl = config.serverUrl || "";

	async getAll(): Promise<ClassTimeSlot[]> {
		const response = await axios.get(this.serverUrl + "/ClassTimeSlot/", {
			withCredentials: true,
		});
		let timeSlots: ClassTimeSlot[] = [];
		response.data.forEach((element: any) =>
			timeSlots.push({
				id: element.id,
				name: element.name,
				startTime: new Date(`2025-01-01T${element.startTime}Z`),
				endTime: new Date(`2025-01-01T${element.endTime}Z`),
			}),
		);
		return timeSlots;
	}

	async getById(id: UUID): Promise<ClassTimeSlot> {
		const response = await axios.get(
			this.serverUrl + "/ClassTimeSlot/" + id.toString(),
			{ withCredentials: true },
		);

		return {
			id: response.data.id,
			name: response.data.name,
			startTime: new Date(`1970-01-01T${response.data.startTime}Z`),
			endTime: new Date(`1970-01-01T${response.data.endTime}Z`),
		};
	}
}

export default ClassTimeSlotApi;
