import { ConfigContext } from "@/components/ConfigProvider";
import HeaderBar from "@/components/headerbar/HeaderBar";
import { PasswordInput } from "@/components/ui/password-input";
import { ApiContext } from "@/service/ApiProvider";
import { UserContext } from "@/service/UserProvider";
import { Alert, Button, Card, Center, HStack, Input, Link, Spinner, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import CryptoJS from "crypto-js";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
			<Center h="60vh" px="10" maxW={isMobile ? "100%" : "40%"} w="100%" mx="auto">
				<Card.Root p={1} rounded="md" boxShadow="md" w="90%" size="sm">
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
