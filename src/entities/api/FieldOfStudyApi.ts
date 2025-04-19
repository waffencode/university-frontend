import FieldOfStudy from "@/entities/domain/FieldOfStudy";
import axios from "axios";
import { UUID } from "node:crypto";
import config from "../../config.json";

class FieldOfStudyApi {
	serverUrl = config.serverUrl;

	async getAll(): Promise<FieldOfStudy[]> {
		return (
			await axios.get(this.serverUrl + "/FieldOfStudy", {
				withCredentials: true,
			})
		).data;
	}

	async getById(id: UUID): Promise<FieldOfStudy> {
		return (
			await axios.get(this.serverUrl + "/FieldOfStudy/" + id.toString(), {
				withCredentials: true,
			})
		).data;
	}
}

export default FieldOfStudyApi;
