import UserApi from './UserApi';

interface Api {
    user: UserApi;
}

class Api {
    constructor() {
        this.user = new UserApi();
    }
}

export default Api;
