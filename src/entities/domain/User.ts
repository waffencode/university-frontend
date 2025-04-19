import { UUID } from "node:crypto";
import UserRole from "./UserRole";

interface User {
	id: UUID;
	passwordHash: string;
	username: string;
	fullName: string;
	email: string;
	role: UserRole;
	avatarUri: string;
}

export default User;
