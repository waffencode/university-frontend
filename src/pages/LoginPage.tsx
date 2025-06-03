import HeaderBar from "@/components/headerbar/HeaderBar";
import {
	Box,
	Button,
	Card,
	Center,
	HStack,
	Input,
	Link,
	Spinner,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import CryptoJS from "crypto-js";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConfigContext } from "../components/ConfigProvider";
import { Alert } from "../components/ui/alert.tsx";
import { PasswordInput } from "../components/ui/password-input.tsx";
import { ApiContext } from "../service/ApiProvider.tsx";
import { UserContext } from "../service/UserProvider.tsx";

const LoginPage: React.FC = () => {
	const navigate = useNavigate();

	const [email, setEmail] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");
	const [response, setResponse] = React.useState<string>("");
	const [isError, setIsError] = React.useState<boolean>(false);

	const [isLoginPending, setIsLoginPending] = React.useState<boolean>(false);

	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);

	const { serverUrl } = useContext(ConfigContext);
	const userContext = useContext(UserContext);
	const apiContext = useContext(ApiContext);

	function handleLogin() {
		setIsLoginPending(true);

		const hashedPassword = CryptoJS.SHA256(password).toString(
			CryptoJS.enc.Hex,
		);

		axios
			.get(serverUrl + "/User/login", {
				params: { email: email, passwordHash: hashedPassword },
				withCredentials: true,
			})
			.then(async () => {
				setIsError(false);
				setResponse("Success!");
				userContext?.setUser(await apiContext.user.getProfile());
				setIsLoginPending(false);
				navigate("/dashboard");
			})
			.catch((error) => {
				setIsLoginPending(false);
				setIsError(true);
				console.error(error);
				setResponse(error.toString());
			});
	}

	function redirectToRegistrationPage() {
		navigate("/register");
	}

	useEffect(() => {
		if (userContext?.user) {
			navigate("/dashboard");
		}
	});

	return (
		<>
			<HeaderBar />
			<Center h="60vh">
				<Box p="10" maxW="100%" w={isMobile ? "100%" : "40%"}>
					<Stack>
						<Card.Root
							p={1}
							rounded="md"
							boxShadow="md"
							w="90%"
							mx="auto"
							size="sm"
						>
							<Card.Header>
								<Card.Title>Авторизация</Card.Title>
							</Card.Header>
							<Card.Body>
								{isError && (
									<Alert
										status="error"
										marginY={2}
										title="Ошибка!"
									>
										{response}
									</Alert>
								)}
								<Center>
									<VStack gap={2}>
										<Input
											onChange={(e) =>
												setEmail(e.target.value)
											}
											value={email}
											placeholder="Логин"
										/>
										<PasswordInput
											onChange={(e) =>
												setPassword(e.target.value)
											}
											value={password}
											placeholder="Пароль"
										/>
										<Box textAlign="right" w={"100%"}>
											<Text fontSize="sm">
												<Link>Забыли пароль?..</Link>
											</Text>
										</Box>
										<HStack marginY={2}>
											<Button onClick={handleLogin}>
												{isLoginPending && (
													<Spinner size="sm" />
												)}
												Войти
											</Button>
											<Button
												variant="subtle"
												onClick={() =>
													redirectToRegistrationPage()
												}
											>
												Регистрация
											</Button>
										</HStack>
									</VStack>
								</Center>
							</Card.Body>
						</Card.Root>
					</Stack>
				</Box>
			</Center>
		</>
	);
};

export default LoginPage;
