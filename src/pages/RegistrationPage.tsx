import CustomSelectField from "@/components/CustomSelectField";
import HeaderBar from "@/components/headerbar/HeaderBar.tsx";
import { PasswordInput, PasswordStrengthMeter } from "@/components/ui/password-input";
import { UserContext } from "@/service/UserProvider";
import {
	Box,
	Button,
	Card,
	Center,
	Checkbox,
	Field,
	Heading,
	HStack,
	Image,
	Input,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import CryptoJS from "crypto-js";
import { UUID } from "node:crypto";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
// Password strength meter.
import { zxcvbn } from "zxcvbn-typescript";
import User from "../entities/domain/User.ts";
import UserRole, { UserRoleNamesCollection } from "../entities/domain/UserRole.ts";

interface UserRegistrationProps {
	user: User;
	password: string;
	confirmedPassword: string;
	isAgree: boolean;
}

const RegistrationPage: React.FC = () => {
	const { register, handleSubmit, control, getValues, watch } = useForm<UserRegistrationProps>({
		defaultValues: {
			user: { id: v4() as UUID, role: UserRole.Unauthorized },
			password: "",
			confirmedPassword: "",
			isAgree: false,
		},
	});

	watch();

	const navigate = useNavigate();
	const userContext = React.useContext(UserContext)!;

	const handleRegistration = (data: UserRegistrationProps) => {
		try {
			if (data.password !== data.confirmedPassword || !data.isAgree) {
				// TODO: Show error.
				return;
			}

			data.user.passwordHash = CryptoJS.SHA256(data.password).toString(CryptoJS.enc.Hex);
			data.user.role = Number(getValues("user.role"));

			userContext.setUser(data.user);
		} catch (e) {
			// TODO: Show error.
			console.log(e);
			return;
		}
		navigate("/register/confirm");
	};

	// Do not use <AppPage> here.
	return (
		<>
			<HeaderBar />
			<Center>
				<Box p="5" maxW="100%" w="90%">
					<Stack>
						<Card.Root p={1} rounded="md" boxShadow="md" w="90%" mx="auto" size="sm">
							<Card.Header>
								<Card.Title>Регистрация</Card.Title>
							</Card.Header>
							<Card.Body>
								<HStack gap={30}>
									<VStack gap={1} w="60%" align="left">
										<form onSubmit={handleSubmit(handleRegistration)}>
											<Field.Root>
												<Field.Label>Email</Field.Label>
												<Input
													required
													placeholder="i.i.ivanov@example.com"
													{...register("user.email")}
												/>
											</Field.Root>
											<Field.Root>
												<Field.Label>Логин</Field.Label>
												<Input
													required
													placeholder="i.i.ivanov"
													{...register("user.username")}
												/>
											</Field.Root>
											<Field.Root>
												<Field.Label>ФИО</Field.Label>
												<Input
													required
													placeholder="Иванов Иван Иванович"
													{...register("user.fullName")}
												/>
											</Field.Root>
											<Field.Root>
												<Field.Label>Роль пользователя</Field.Label>
												<CustomSelectField
													control={control}
													name={"user.role"}
													options={UserRoleNamesCollection.items
														.slice(1, UserRoleNamesCollection.items.length)
														.map((i) => ({
															label: i.label,
															value: i.value.toString(),
														}))}
												/>
												<Text textStyle="xs" color="fg.muted">
													Ваша роль будет проверена и утверждена администратором системы.
												</Text>
											</Field.Root>
											<Field.Root>
												<Field.Label>Пароль</Field.Label>
												<Stack maxW="100%">
													<PasswordInput required {...register("password")} />
													<PasswordStrengthMeter
														value={zxcvbn(getValues("password")).score}
													/>
												</Stack>
											</Field.Root>
											<Field.Root>
												<Field.Label>Повторите пароль</Field.Label>
												<Stack maxW="100%">
													<PasswordInput required {...register("confirmedPassword")} />
												</Stack>
											</Field.Root>
											<Controller
												control={control}
												name="isAgree"
												render={({ field }) => (
													<Checkbox.Root
														required
														my={3}
														checked={field.value}
														onCheckedChange={({ checked }) => field.onChange(checked)}
													>
														<Checkbox.HiddenInput />
														<Checkbox.Control />
														<Checkbox.Label>
															<Box lineHeight="1">
																Даю согласие на сбор, обработку и хранение персональных
																данных
															</Box>
															<Box color="fg.muted" fontWeight="normal">
																В соответствии с №152-ФЗ «О персональных данных»
															</Box>
														</Checkbox.Label>
													</Checkbox.Root>
												)}
											/>
											<HStack>
												<Button variant="subtle" onClick={() => navigate(-1)}>
													Назад
												</Button>
												<Button type="submit">Зарегистрироваться</Button>
											</HStack>
										</form>
									</VStack>

									<Center w="50%">
										<VStack gap={3}>
											<Image borderRadius="10px" height="150px" src="/static/img/logo.png" />
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

export default RegistrationPage;
