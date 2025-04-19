import axios from "axios";
import { UUID } from "node:crypto";
import config from "../../config.json";
import User from "../domain/User";

class UserApi {
	// TODO: Potential config inconsistency.
	serverUrl = config.serverUrl || "";

	async getUser(userId: UUID): Promise<User> {
		// TODO: Add error handling and data checks.
		const response = await axios.get(
			this.serverUrl + "/User/" + userId.toString(),
			{ withCredentials: true },
		);
		return {
			id: response.data.id,
			passwordHash: response.data.passwordHash,
			username: response.data.username,
			fullName: response.data.fullName,
			email: response.data.email,
			role: response.data.role,
			avatarUri: response.data.avatarUri,
		};
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
		return await axios.put(
			this.serverUrl + "/User/" + userEdited.id.toString(),
			userEdited,
			{ withCredentials: true },
		);
	}

	async register(user: User): Promise<void> {
		return await axios.post(this.serverUrl + "/User/register", user, {
			withCredentials: true,
		});
	}
}

export default UserApi;
