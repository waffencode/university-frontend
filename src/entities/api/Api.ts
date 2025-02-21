import UserApi from './UserApi';
import MessageApi from "./MessageApi.ts";
import RegistrationRequestApi from "./RegistrationRequestApi.ts";

interface Api {
    user: UserApi;
    message: MessageApi;
    registrationRequest: RegistrationRequestApi;
}

class Api {
    constructor() {
        this.user = new UserApi();
        this.message = new MessageApi();
        this.registrationRequest = new RegistrationRequestApi();
    }
}

export default Api;
