import UserRole from "./UserRole";
import {UUID} from "node:crypto";

interface User {
    id: UUID;
    username: string;
    email: string;
    role: UserRole;
}

export default User;