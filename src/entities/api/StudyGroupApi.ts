import config from "@/config.json";
import { StudyGroupDto } from "@/entities/domain/StudyGroup";
import axios from "axios";

class StudyGroupApi {
	serverUrl = config.serverUrl || "";

	async getAll(): Promise<StudyGroupDto[]> {
		const response = await axios.get(this.serverUrl + "/StudyGroup", {
			withCredentials: true,
		});
		return response.data;
	}

	async createStudyGroup(studyGroup: StudyGroupDto): Promise<void> {
		await axios.post(this.serverUrl + "/StudyGroup", studyGroup, {
			withCredentials: true,
		});
	}
}

export default StudyGroupApi;
