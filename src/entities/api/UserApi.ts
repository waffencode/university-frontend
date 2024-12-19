import {UUID} from "node:crypto";
import axios, {AxiosResponse} from "axios";
import config from '../../config.json';
import User from "../domain/User";

class UserApi {
    getUser(userId: UUID): Promise<User> {
        // TODO: Potential config inconsistency.
        const serverUrl = config.serverUrl || '';

        // TODO: Add error handling and data checks.
        return axios.get(serverUrl + "/User/" + userId.toString(), { withCredentials: true })
            .then((response: AxiosResponse<User>) => {
                let user: User = {
                    id: response.data.id,
                    username: response.data.username,
                    fullName: response.data.fullName,
                    email: response.data.email,
                    role: response.data.role,
                };

                return user;
            });
    }
}

export default UserApi;