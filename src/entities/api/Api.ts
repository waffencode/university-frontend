import UserApi from './UserApi';
import MessageApi from "./MessageApi.ts";

interface Api {
    user: UserApi;
    message: MessageApi;
}

class Api {
    constructor() {
        this.user = new UserApi();
        this.message = new MessageApi();
    }
}

export default Api;
