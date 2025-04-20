import AppPage from "@/components/AppPage";
import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
import { UserRoleNamesCollection } from "@/entities/domain/UserRole";
import { ApiContext } from "@/service/ApiProvider";
import { UserContext } from "@/service/UserProvider";
import { Box, Heading, HStack, Input, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { LuInfo } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import User from "../entities/domain/User.ts";

const SettingsPage: React.FC = () => {
	const apiContext = useContext(ApiContext)!;
	const userContext = useContext(UserContext)!;
	const navigate = useNavigate();
	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);

	const [userEdited] = useState<User>(userContext.user!);

	const onSubmitButtonClicked = async () => {
		await apiContext.user.updateUser(userEdited).then(() => {
			userContext.setUser(userEdited);

			// TODO: Replace with HeaderBar re-rendering.
			navigate("/settings");
			toaster.create({
				title: "Данные успешно обновлены",
				type: "success",
			});
		});
	};

	return (
		<>
			<AppPage title="Настройки">
				<VStack
					alignItems="left"
					gap={3}
					width={isMobile ? "100%" : "40%"}
				>
					<Heading size="sm">Профиль</Heading>
					{userContext.user !== null && (
						<VStack gap={2} align="left">
							<Heading size="xs">Email</Heading>
							<Input
								defaultValue={userContext.user.email}
								onChange={(e) =>
									(userEdited.email = e.target.value)
								}
							/>

							<Heading size="xs">Роль</Heading>
							<Input
								value={
									UserRoleNamesCollection.at(
										userContext.user.role,
									)?.label
								}
								readOnly={true}
								disabled
							/>
							<Box
								color="fg.muted"
								fontSize={"xs"}
								fontWeight="normal"
							>
								<HStack>
									<LuInfo />
									Для изменения вашей роли обратитесь к
									администратору сервиса.
								</HStack>
							</Box>

							<Heading size="xs">Логин</Heading>
							<Input
								defaultValue={userContext.user.username}
								onChange={(e) =>
									(userEdited.username = e.target.value)
								}
							/>

							<Heading size="xs">Полное имя</Heading>
							<Input
								defaultValue={userContext.user.fullName}
								onChange={(e) =>
									(userEdited.fullName = e.target.value)
								}
							/>

							<Heading size="xs">Аватар</Heading>
							<Input
								type="url"
								defaultValue={userContext.user.avatarUri}
								onChange={(e) =>
									(userEdited.avatarUri = e.target.value)
								}
							/>
						</VStack>
					)}
					<Button onClick={onSubmitButtonClicked}>Обновить</Button>
				</VStack>
			</AppPage>
		</>
	);
};

export default SettingsPage;
