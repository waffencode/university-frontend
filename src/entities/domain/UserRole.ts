import { createListCollection } from "@chakra-ui/react";

enum UserRole {
	Unauthorized,
	Student,
	Teacher,
	Manager,
	Admin,
}

export default UserRole;

export const UserRoleNamesCollection = createListCollection({
	items: [
		{ key: UserRole.Unauthorized, label: "Неавторизованный", value: UserRole.Unauthorized },
		{ key: UserRole.Student, label: "Студент", value: UserRole.Student },
		{ key: UserRole.Teacher, label: "Преподаватель", value: UserRole.Teacher },
		{ key: UserRole.Manager, label: "Методист", value: UserRole.Manager },
		{ key: UserRole.Admin, label: "Администратор", value: UserRole.Admin },
	],
});
