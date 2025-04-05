import UserApi from './UserApi';
import MessageApi from "./MessageApi.ts";
import RegistrationRequestApi from "./RegistrationRequestApi.ts";
import SubjectApi from "./SubjectApi.ts";

interface Api {
    user: UserApi;
    message: MessageApi;
    registrationRequest: RegistrationRequestApi;
    subject: SubjectApi;
}

class Api {
    constructor() {
        this.user = new UserApi();
        this.message = new MessageApi();
        this.registrationRequest = new RegistrationRequestApi();
        this.subject = new SubjectApi();
    }
}

export default Api;
