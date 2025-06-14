import axios from "axios";
import { UUID } from "node:crypto";
import config from "../../config.json";
import User from "../domain/User";

class UserApi {
	// TODO: Potential config inconsistency.
	serverUrl = config.serverUrl || "";

	async getUser(userId: UUID): Promise<User> {
		const response = await axios.get(this.serverUrl + "/User/" + userId.toString(), { withCredentials: true });
		return response.data as User;
	}

	async getProfile(): Promise<User> {
		return (
			await axios.get(this.serverUrl + "/User/profile", {
				withCredentials: true,
			})
		).data;
	}

	async getAllUsers(): Promise<User[]> {
		const response = await axios.get(this.serverUrl + "/User/", {
			withCredentials: true,
		});
		return response.data as User[];
	}

	async logout(): Promise<void> {
		return await axios.post(this.serverUrl + "/User/logout", {
			withCredentials: true,
		});
	}

	async updateUser(userEdited: User): Promise<void> {
		return await axios.put(this.serverUrl + "/User/" + userEdited.id.toString(), userEdited, {
			withCredentials: true,
		});
	}

	async register(user: User): Promise<void> {
		return await axios.post(this.serverUrl + "/User/register", user, {
			withCredentials: true,
		});
	}
}

export default UserApi;
