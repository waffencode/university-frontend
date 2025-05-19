import axios from "axios";
import { UUID } from "node:crypto";
import config from "../../config.json";
import Message from "../domain/Message";

class MessageApi {
	serverUrl = config.serverUrl || "";

	async getMessages(userId: UUID): Promise<Message[]> {
		const response = await axios.get(
			this.serverUrl + "/Message/" + userId.toString(),
			{ withCredentials: true },
		);
		response.data.forEach(
			(element: Message) => (element.date = new Date(element.date)),
		);

		return response.data;
	}

	async sendMessage(message: Message): Promise<void> {
		return await axios.post(this.serverUrl + "/Message/", message, {
			withCredentials: true,
		});
	}
}

export default MessageApi;
