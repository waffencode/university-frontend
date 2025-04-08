import { SubjectWorkProgram } from "@/entities/domain/SubjectWorkProgram.ts";
import axios from "axios";
import { UUID } from "node:crypto";
import config from "../../config.json";

class SubjectWorkProgramApi {
	serverUrl = config.serverUrl || "";

	async getAll(): Promise<SubjectWorkProgram[]> {
		const response = await axios.get(
			this.serverUrl + "/SubjectWorkProgram/",
			{ withCredentials: true },
		);
		let subjects: SubjectWorkProgram[] = [];
		response.data.forEach((element: SubjectWorkProgram) =>
			subjects.push({ ...element }),
		);
		return subjects;
	}

	async getById(id: UUID): Promise<SubjectWorkProgram> {
		return (
			await axios.get(
				this.serverUrl + "/SubjectWorkProgram/" + id.toString(),
				{ withCredentials: true },
			)
		).data;
	}

	async create(entity: SubjectWorkProgram): Promise<void> {
		await axios
			.post(this.serverUrl + "/SubjectWorkProgram/", entity, {
				withCredentials: true,
			})
			.catch(console.error);
	}

	async delete(id: UUID) {
		await axios
			.delete(this.serverUrl + "/SubjectWorkProgram/" + id.toString(), {
				withCredentials: true,
			})
			.catch(console.error);
	}

	async update(entity: SubjectWorkProgram): Promise<void> {
		await axios
			.put(
				this.serverUrl + "/SubjectWorkProgram/" + entity.id.toString(),
				entity,
				{
					withCredentials: true,
				},
			)
			.catch(console.error);
	}
}

export default SubjectWorkProgramApi;
