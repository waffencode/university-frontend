import Classroom from "@/entities/domain/Classroom";
import axios from "axios";
import config from "../../config.json";

class ClassroomApi {
	serverUrl = config.serverUrl;

	async getAll(): Promise<Classroom[]> {
		const response = await axios.get(this.serverUrl + "/Classroom/", {
			withCredentials: true,
		});
		return response.data;
	}
}

export default ClassroomApi;
