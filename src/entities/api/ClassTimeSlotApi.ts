import config from "@/config.json";
import ClassTimeSlot from "@/entities/domain/ClassTimeSlot";
import axios from "axios";

class ClassTimeSlotApi {
	serverUrl = config.serverUrl || '';

	async getAll(): Promise<ClassTimeSlot[]> {
		const response = await axios.get(this.serverUrl + "/ClassTimeSlot/", {withCredentials: true});
		return response.data;
	}
}

export default ClassTimeSlotApi;