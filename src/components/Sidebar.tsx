import UserRole from "@/entities/domain/UserRole";
import { ApiContext } from "@/service/ApiProvider";
import { UserContext } from "@/service/UserProvider";
import { Box, IconButton, VStack } from "@chakra-ui/react";
import "./Sidebar.css";
import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import {
	LuAppWindow,
	LuBookMarked,
	LuCalendarClock,
	LuChevronsLeft,
	LuChevronsRight,
	LuHouse,
	LuLogOut,
	LuMessageCircle,
	LuSettings,
	LuUniversity,
	LuUsers,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import SidebarButton from "./SidebarButton.tsx";

const Sidebar: React.FC = () => {
	const apiContext = useContext(ApiContext);
	const userContext = useContext(UserContext);
	const navigate = useNavigate();
	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);
	const [isCollapsed, setIsCollapsed] = React.useState<boolean>(isMobile);

	const [, , removeCookies] = useCookies(["token"]);

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	const onHomeButtonClick = () => {
		navigate("/dashboard");
		if (isMobile) setIsCollapsed(true);
	};

	const onScheduleButtonClick = () => {
		navigate("/schedule");
		if (isMobile) setIsCollapsed(true);
	};

	const onLogoutButtonClick = () => {
		apiContext.user
			.logout()
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				removeCookies("token");
				userContext?.setUser(null);
				localStorage.removeItem("user");
				navigate("/");
			});
	};

	const onAdminPanelButtonClick = () => {
		navigate("/admin");
		if (isMobile) setIsCollapsed(true);
	};

	const onSettingsButtonClick = () => {
		navigate("/settings");
		if (isMobile) setIsCollapsed(true);
	};

	const onMessagesButtonClick = () => {
		navigate("/messages");
		if (isMobile) setIsCollapsed(true);
	};

	const onClassesButtonClick = () => {
		navigate("/classes");
		if (isMobile) setIsCollapsed(true);
	};

	const onStudyGroupsPageClick = () => {
		navigate("/studyGroups");
	};

	const onUniversityPageClick = () => {
		navigate("/university");
	};

	return (
		<Box
			bg={"var(--chakra-colors-bg-panel)"}
			shadow="md"
			rounded={3}
			p={2}
			className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
		>
			<VStack w="100%" minH="100vh" gap={1}>
				<VStack w="100%" gap={1}>
					{!isMobile && (
						<IconButton
							onClick={toggleSidebar}
							variant="ghost"
							w="100%"
							display="flex"
							justifyContent="center"
						>
							{isCollapsed ? (
								<LuChevronsRight />
							) : (
								<LuChevronsLeft />
							)}
						</IconButton>
					)}
					<SidebarButton
						onClick={onHomeButtonClick}
						icon={<LuHouse />}
						label="Главная"
						isCollapsed={isCollapsed}
					/>
					<SidebarButton
						onClick={onScheduleButtonClick}
						icon={<LuCalendarClock />}
						label="Расписание"
						isCollapsed={isCollapsed}
					/>
					{(userContext?.user?.role === UserRole.Manager ||
						userContext?.user?.role === UserRole.Teacher ||
						userContext?.user?.role === UserRole.Admin) && (
						<SidebarButton
							onClick={onClassesButtonClick}
							icon={<LuBookMarked />}
							label="Занятия"
							isCollapsed={isCollapsed}
						/>
					)}
					{(userContext?.user?.role === UserRole.Manager ||
						userContext?.user?.role === UserRole.Admin) && (
						<>
							<SidebarButton
								onClick={onStudyGroupsPageClick}
								icon={<LuUsers />}
								label="Учебные группы"
								isCollapsed={isCollapsed}
							/>
							<SidebarButton
								onClick={onUniversityPageClick}
								icon={<LuUniversity />}
								label="Университет"
								isCollapsed={isCollapsed}
							/>
						</>
					)}
					<SidebarButton
						onClick={onMessagesButtonClick}
						icon={<LuMessageCircle />}
						label="Сообщения"
						isCollapsed={isCollapsed}
					/>
					<SidebarButton
						onClick={onSettingsButtonClick}
						icon={<LuSettings />}
						label="Настройки"
						isCollapsed={isCollapsed}
					/>
					{userContext?.user?.role === UserRole.Admin && (
						<SidebarButton
							onClick={onAdminPanelButtonClick}
							icon={<LuAppWindow />}
							label="Админ-панель"
							isCollapsed={isCollapsed}
						/>
					)}

					<SidebarButton
						onClick={onLogoutButtonClick}
						icon={<LuLogOut />}
						label="Выход"
						isCollapsed={isCollapsed}
					/>
				</VStack>
			</VStack>
		</Box>
	);
};

export default Sidebar;
