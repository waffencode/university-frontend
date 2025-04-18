import config from "@/config.json";
import StudyGroup from "@/entities/domain/StudyGroup";
import axios from "axios";

class StudyGroupApi {
	serverUrl = config.serverUrl || "";

	async getAll(): Promise<StudyGroup[]> {
		const response = await axios.get(this.serverUrl + "/StudyGroup", {
			withCredentials: true,
		});
		return response.data;
	}
}

export default StudyGroupApi;
