import ClassroomApi from "@/entities/api/ClassroomApi";
import ClassTimeSlotApi from "@/entities/api/ClassTimeSlotApi";
import ScheduleClassApi from "@/entities/api/ScheduleClassApi";
import StudyGroupApi from "@/entities/api/StudyGroupApi";
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
	scheduleClass: ScheduleClassApi;
	classTimeSlots: ClassTimeSlotApi;
	classroom: ClassroomApi;
	studyGroup: StudyGroupApi;
}

class Api {
	constructor() {
		this.user = new UserApi();
		this.message = new MessageApi();
		this.registrationRequest = new RegistrationRequestApi();
		this.subject = new SubjectApi();
		this.subjectWorkProgram = new SubjectWorkProgramApi();
		this.scheduleClass = new ScheduleClassApi();
		this.classTimeSlots = new ClassTimeSlotApi();
		this.classroom = new ClassroomApi();
		this.studyGroup = new StudyGroupApi();
	}
}

export default Api;
