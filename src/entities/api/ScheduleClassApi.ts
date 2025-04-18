import config from "@/config.json";
import { ScheduleClassDto } from "@/entities/domain/ScheduleClass";
import axios from "axios";
import { UUID } from "node:crypto";

class ScheduleClassApi {
	serverUrl = config.serverUrl || "";

	async getScheduleClasses(): Promise<ScheduleClassDto[]> {
		const response = await axios.get(this.serverUrl + "/ScheduleClass", {
			withCredentials: true,
		});
		return response.data;
	}

	async getScheduleClassById(id: UUID): Promise<ScheduleClassDto> {
		const response = await axios.get(
			this.serverUrl + "/ScheduleClass/" + id.toString(),
			{
				withCredentials: true,
			},
		);
		return response.data;
	}

	async createScheduleClass(entity: ScheduleClassDto) {
		console.log("Passing: ", entity);
		await axios.post(this.serverUrl + "/ScheduleClass", entity, {
			withCredentials: true,
		});
	}
}

export default ScheduleClassApi;
