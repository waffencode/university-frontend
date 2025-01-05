import {createListCollection} from "@chakra-ui/react";

enum UserRole {
    Unauthorized,
    Student,
    Teacher,
    Manager,
    Admin
}

export default UserRole;

export const UserRoleNamesCollection = createListCollection({
    items: [
        { key: UserRole.Unauthorized, label: "Неавторизованный", value: "unauthorized" },
        { key: UserRole.Student, label: "Студент", value: "student" },
        { key: UserRole.Teacher, label: "Преподаватель", value: "teacher" },
        { key: UserRole.Manager, label: "Методист", value: "manager" },
        { key: UserRole.Admin, label: "Администратор", value: "administrator" },
    ],
})