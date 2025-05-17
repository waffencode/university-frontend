import config from "@/config.json";
import { ScheduleClassDto } from "@/entities/domain/ScheduleClass";
import { ScheduleClassDetailsDto } from "@/entities/domain/ScheduleClassDetails";
import { StudyGroupDto } from "@/entities/domain/StudyGroup";
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
		await axios.post(this.serverUrl + "/ScheduleClass", entity, {
			withCredentials: true,
		});
	}

	async updateClassJournal(id: UUID, entity: ScheduleClassDetailsDto) {
		await axios.post(
			this.serverUrl + "/ScheduleClass/" + id.toString() + "/journal",
			entity,
			{
				withCredentials: true,
			},
		);
	}

	async getStudyGroupsForClass(id: UUID): Promise<StudyGroupDto[]> {
		return (
			await axios.get(
				this.serverUrl + "/ScheduleClass/" + id.toString() + "/groups",
				{ withCredentials: true },
			)
		).data;
	}

	async getScheduleClassDetails(id: UUID): Promise<ScheduleClassDetailsDto> {
		return (
			await axios.get(
				this.serverUrl + "/ScheduleClass/" + id.toString() + "/details",
				{ withCredentials: true },
			)
		).data;
	}
}

export default ScheduleClassApi;
