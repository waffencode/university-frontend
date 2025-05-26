import UserRole from "@/entities/domain/UserRole";
import { UserContext } from "@/service/UserProvider";
import {
	Box,
	Button,
	Center,
	Heading,
	Image,
	SimpleGrid,
	Text,
	VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppPage from "../../components/AppPage";
import "./DashboardPage.css";

const DashboardPage: React.FC = () => {
	const navigate = useNavigate();
	const userRole: UserRole = useContext(UserContext)!.user!.role;

	return (
		<AppPage>
			<Box className="landing-container">
				<Center>
					<VStack gap={3}>
						<Image className="logo" src="/static/img/logo.png" />
						<VStack marginY={3} className="header-section">
							<Heading className="main-heading">
								University
							</Heading>
							<Text className="subheading">
								Open-source платформа для университета
							</Text>
						</VStack>
					</VStack>
				</Center>

				<Box className="features-container">
					<Box className="feature-box">
						<Text className="feature-text">
							Информационная система "Университет" для студентов и
							преподавателей университета.
						</Text>
					</Box>
				</Box>

				<SimpleGrid
					columns={{ base: 1, md: 2, lg: 3 }}
					gap={6}
					className="navigation-grid"
				>
					<Box className="nav-card">
						<Heading size="md" className="nav-title">
							Расписание
						</Heading>
						<Text className="nav-description">
							Просмотр личного расписания занятий, экзаменов и
							мероприятий
						</Text>
						<Button
							className="nav-button"
							onClick={() => navigate("/schedule")}
						>
							Перейти
						</Button>
					</Box>

					{userRole !== UserRole.Student && (
						<Box className="nav-card">
							<Heading size="md" className="nav-title">
								Дисциплины
							</Heading>
							<Text className="nav-description">
								Доступ к материалам курсов, рабочим программам и
								заданиям
							</Text>
							<Button
								className="nav-button"
								onClick={() => navigate("/classes")}
							>
								Перейти
							</Button>
						</Box>
					)}

					<Box className="nav-card">
						<Heading size="md" className="nav-title">
							Сообщения
						</Heading>
						<Text className="nav-description">
							Общение с преподавателями и студентами, уведомления
							системы
						</Text>
						<Button
							className="nav-button"
							onClick={() => navigate("/messages")}
						>
							Перейти
						</Button>
					</Box>

					<Box className="nav-card">
						<Heading size="md" className="nav-title">
							Настройки
						</Heading>
						<Text className="nav-description">
							Управление профилем и настройками уведомлений
						</Text>
						<Button
							className="nav-button"
							onClick={() => navigate("/settings")}
						>
							Перейти
						</Button>
					</Box>

					{userRole === UserRole.Admin && (
						<Box className="nav-card">
							<Heading size="md" className="nav-title">
								Администрирование
							</Heading>
							<Text className="nav-description">
								Управление пользователями, курсами и системными
								настройками (для администраторов)
							</Text>
							<Button
								className="nav-button"
								onClick={() => navigate("/admin")}
							>
								Перейти
							</Button>
						</Box>
					)}

					{userRole !== UserRole.Student && (
						<Box className="nav-card">
							<Heading size="md" className="nav-title">
								Рабочие программы
							</Heading>
							<Text className="nav-description">
								Создание и редактирование рабочих программ
								дисциплин (для преподавателей)
							</Text>
							<Button
								className="nav-button"
								onClick={() => navigate("/classes")}
							>
								Перейти
							</Button>
						</Box>
					)}
				</SimpleGrid>
			</Box>
		</AppPage>
	);
};

export default DashboardPage;
