import {UUID} from "node:crypto";
import axios from "axios";
import config from '../../config.json';
import User from "../domain/User";
import RegistrationRequest from "../domain/RegistrationRequest";

class RegistrationRequestApi {
    // TODO: Potential config inconsistency.
    serverUrl = config.serverUrl || '';

    async acceptRegistrationRequest(requestId: UUID): Promise<void> {
        // TODO: Add error handling and data checks.
        await axios.get(this.serverUrl + "/User/authorize" + requestId.toString(), {withCredentials: true});
    }

    async getPendingRegistrationRequests(): Promise<RegistrationRequest[]> {
        const response = await axios.get(this.serverUrl + "/User/pendingRequests", {withCredentials: true});
        return response.data as RegistrationRequest[];
    }
}

export default RegistrationRequestApi;