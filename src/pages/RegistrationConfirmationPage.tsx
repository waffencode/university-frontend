import HeaderBar from "@/components/headerbar/HeaderBar.tsx";
import { Box, Button, Card, Center, Heading, HStack, Image, PinInput, Stack, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../service/ApiProvider.tsx";
import { UserContext } from "../service/UserProvider.tsx";

const RegistrationConfirmationPage: React.FC = () => {
	const navigate = useNavigate();
	const api = useContext(ApiContext);

	const [otp, setOtp] = React.useState(["", "", "", ""]);

	const userContext = useContext(UserContext)!;

	function handleSubmit() {
		if (!userContext.user) {
			// TODO: Handle error.
			return;
		}

		api.user.register(userContext.user).then((r) => {
			userContext.setUser(null);
			navigate("/login");
		});
		// TODO: Add auth cookie.
	}

	// Do not use <AppPage> here.
	return (
		<>
			<HeaderBar />
			<Center>
				<Box p="5" maxW="100%" w="90%">
					<Stack>
						<Card.Root p={1} rounded="md" boxShadow="md" w="90%" mx="auto" size="sm">
							<Card.Header>
								<Card.Title>Подтверждение регистрации</Card.Title>
							</Card.Header>
							<Card.Body>
								<HStack gap={30}>
									<VStack gap={5} w="60%">
										<Text textStyle="sm" textAlign="center">
											На электронную почту, указанную при регистрации, отправлен 4-значный
											одноразовый код подтверждения. <br />
											<br />
											Для завершения регистрации введите код в поле ниже.
										</Text>
										<PinInput.Root otp value={otp} onValueChange={(e: any) => setOtp(e.value)}>
											<PinInput.HiddenInput />
											<PinInput.Control>
												<PinInput.Input index={0} />
												<PinInput.Input index={1} />
												<PinInput.Input index={2} />
												<PinInput.Input index={3} />
											</PinInput.Control>
										</PinInput.Root>
										<HStack>
											<Button variant="subtle" onClick={() => navigate(-1)}>
												Назад
											</Button>
											<Button onClick={() => handleSubmit()}>Подтвердить</Button>
										</HStack>
									</VStack>
									<Center w="50%">
										<VStack gap={3}>
											<Image height="150px" src="/static/img/logo.png" />
											<VStack marginY={10}>
												<Heading>University</Heading>
												Open-source платформа для университета
											</VStack>
										</VStack>
									</Center>
								</HStack>
							</Card.Body>
						</Card.Root>
					</Stack>
				</Box>
			</Center>
		</>
	);
};

export default RegistrationConfirmationPage;
