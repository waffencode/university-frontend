import SubjectWorkProgramApi from "@/entities/api/SubjectWorkProgramApi.ts";
import MessageApi from "./MessageApi.ts";
import RegistrationRequestApi from "./RegistrationRequestApi.ts";
import SubjectApi from "./SubjectApi.ts";
import UserApi from "./UserApi";

interface Api {
	user: UserApi;
	message: MessageApi;
	registrationRequest: RegistrationRequestApi;
	subject: SubjectApi;
	subjectWorkProgram: SubjectWorkProgramApi;
}

class Api {
	constructor() {
		this.user = new UserApi();
		this.message = new MessageApi();
		this.registrationRequest = new RegistrationRequestApi();
		this.subject = new SubjectApi();
		this.subjectWorkProgram = new SubjectWorkProgramApi();
	}
}

export default Api;
