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

	async create(entity: FieldOfStudy): Promise<void> {
		await axios.post(this.serverUrl + "/FieldOfStudy/", entity, {
			withCredentials: true,
		});
	}

	async update(entity: FieldOfStudy): Promise<void> {
		await axios.put(
			this.serverUrl + "/FieldOfStudy/" + entity.id.toString(),
			entity,
			{
				withCredentials: true,
			},
		);
	}

	async delete(id: UUID): Promise<void> {
		await axios.delete(this.serverUrl + "/FieldOfStudy/" + id.toString(), {
			withCredentials: true,
		});
	}
}

export default FieldOfStudyApi;
