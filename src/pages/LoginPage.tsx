import { ConfigContext } from "@/components/ConfigProvider";
import HeaderBar from "@/components/headerbar/HeaderBar";
import { PasswordInput } from "@/components/ui/password-input";
import { ApiContext } from "@/service/ApiProvider";
import { UserContext } from "@/service/UserProvider";
import {
	Alert,
	Box,
	Button,
	Card,
	Center,
	Flex,
	Heading,
	HStack,
	Input,
	Link,
	SimpleGrid,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import CryptoJS from "crypto-js";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

interface LoginFormData {
	email: string;
	password: string;
}

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const { handleSubmit, register } = useForm<LoginFormData>();
	const { serverUrl } = useContext(ConfigContext);
	const userContext = useContext(UserContext);
	const apiContext = useContext(ApiContext);
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	const [response, setResponse] = React.useState<string>("");
	const [isError, setIsError] = React.useState<boolean>(false);
	const [isLoginPending, setIsLoginPending] = React.useState<boolean>(false);

	const handleLogin = (data: LoginFormData) => {
		setIsLoginPending(true);

		axios
			.get(serverUrl + "/User/login", {
				params: { email: data.email, passwordHash: CryptoJS.SHA256(data.password).toString(CryptoJS.enc.Hex) },
				withCredentials: true,
			})
			.then(async () => {
				setIsError(false);
				userContext?.setUser(await apiContext.user.getProfile());
				navigate("/dashboard");
			})
			.catch((error) => {
				setIsError(true);
				if (axios.isAxiosError(error) && error.response?.status === 404) {
					setResponse("Неверный логин или пароль. Проверьте правильность введенных данных.");
				} else {
					console.error(error);
					setResponse(error.toString());
				}
			})
			.finally(() => setIsLoginPending(false));
	};

	useEffect(() => {
		if (userContext?.user) {
			navigate("/dashboard");
		}
	});

	return (
		<>
			<HeaderBar />
			<Center mt={15} gap={2} h="60vh" px="10" maxW={isMobile ? "100%" : "90%"} w="100%" mx="auto">
				{import.meta.env.VITE_DEMO_MODE_BANNER == "true" && (
					<Box
						p={6}
						mt={15}
						w="40%"
						borderRadius="xl"
						bgGradient="linear(to-r, blue.50, purple.50)"
						borderWidth="1px"
						borderColor="gray.100"
						className="demo-advertisement-container"
					>
						<Flex direction="column" gap={3}>
							<Heading as="h2" size="lg" color="blue.800" fontWeight="semibold" letterSpacing="tight">
								Это демонстрационный клиент системы Университет!
							</Heading>

							<Text fontSize="md" color="gray.600">
								Оцените все возможности платформы с тестовыми учетными записями:
							</Text>

							<SimpleGrid columns={{ base: 1, md: 2 }} gap={2} mt={2} color="black">
								<Box
									bg="white"
									p={4}
									borderRadius="lg"
									shadow="sm"
									borderLeft="4px solid"
									borderColor="blue.400"
								>
									<Text fontWeight="medium" color="blue.700" mb={2}>
										Администратор
									</Text>
									<Text fontSize="sm">
										<b>Логин:</b> admin@example.com
									</Text>
									<Text fontSize="sm">
										<b>Пароль:</b> admin
									</Text>
								</Box>

								<Box
									bg="white"
									p={4}
									borderRadius="lg"
									shadow="sm"
									borderLeft="4px solid"
									borderColor="purple.400"
								>
									<Text fontWeight="medium" color="purple.700" mb={2}>
										Студент
									</Text>
									<Text fontSize="sm">
										<b>Логин:</b> student@example.com
									</Text>
									<Text fontSize="sm">
										<b>Пароль:</b> student
									</Text>
								</Box>

								<Box
									bg="white"
									p={4}
									borderRadius="lg"
									shadow="sm"
									borderLeft="4px solid"
									borderColor="teal.400"
								>
									<Text fontWeight="medium" color="teal.700" mb={2}>
										Методист
									</Text>
									<Text fontSize="sm">
										<b>Логин:</b> manager@example.com
									</Text>
									<Text fontSize="sm">
										<b>Пароль:</b> manager
									</Text>
								</Box>

								<Box
									bg="white"
									p={4}
									borderRadius="lg"
									shadow="sm"
									borderLeft="4px solid"
									borderColor="orange.400"
								>
									<Text fontWeight="medium" color="orange.700" mb={2}>
										Преподаватель
									</Text>
									<Text fontSize="sm">
										<b>Логин:</b> teacher@example.com
									</Text>
									<Text fontSize="sm">
										<b>Пароль:</b> teacher
									</Text>
								</Box>
							</SimpleGrid>

							<Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
								После входа вы сможете протестировать функционал, соответствующий роли пользователя.
							</Text>
						</Flex>
					</Box>
				)}

				<Card.Root p={1} rounded="md" boxShadow="md" w="30%" size="sm">
					<Card.Header>
						<Card.Title>Авторизация</Card.Title>
					</Card.Header>
					<Card.Body alignItems="center">
						{isError && (
							<Alert.Root status="error" my={2}>
								<Alert.Indicator />
								<Alert.Content>
									<Alert.Title>Ошибка!</Alert.Title>
									<Alert.Description>{response}</Alert.Description>
								</Alert.Content>
							</Alert.Root>
						)}
						<form onSubmit={handleSubmit(handleLogin)}>
							<VStack gap={2} align="stretch">
								<Input {...register("email")} required placeholder="Логин" />
								<PasswordInput {...register("password")} required placeholder="Пароль" />
								<Text fontSize="sm" textAlign="right">
									<Link>Забыли пароль?..</Link>
								</Text>
								<HStack my={2}>
									<Button type="submit" disabled={isLoginPending}>
										{isLoginPending && <Spinner size="sm" />}
										Войти
									</Button>
									<Button variant="subtle" onClick={() => navigate("/register")}>
										Регистрация
									</Button>
								</HStack>
							</VStack>
						</form>
					</Card.Body>
				</Card.Root>
			</Center>
		</>
	);
};

export default LoginPage;
