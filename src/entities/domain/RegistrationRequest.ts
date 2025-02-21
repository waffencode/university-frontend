import User from "./User";
import UserRole from "./UserRole";
import {UUID} from "node:crypto";

enum RegistrationRequestStatus {
    Pending,
    Accepted,
    Rejected
}

interface RegistrationRequest {
    id: UUID;
    user: User;
    requestedRole: UserRole;
    currentRole: UserRole;
    date: Date;
    status: RegistrationRequestStatus;
}

export default RegistrationRequest;