import { ColorModeButton } from "@/components/ui/color-mode";
import { UserRoleNamesCollection } from "@/entities/domain/UserRole";
import { ApiContext } from "@/service/ApiProvider";
import { UserContext } from "@/service/UserProvider";
import { Box, Flex, HStack, IconButton, Image, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { LuLogOut } from "react-icons/lu";
import "./Headerbar.css";
import { useNavigate } from "react-router-dom";

const HeaderBar: React.FC = () => {
	const context = useContext(UserContext)!;
	const apiContext = useContext(ApiContext);
	const navigate = useNavigate();
	const { user } = context;

	const [, , removeCookies] = useCookies(["token"]);

	const onLogoutButtonClick = () => {
		apiContext.user
			.logout()
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				removeCookies("token");
				context?.setUser(null);
				localStorage.removeItem("user");
				navigate("/");
			});
	};

	return (
		<Box bg={"var(--chakra-colors-bg-panel)"} shadow="md" rounded={3} marginX={2} className="header-container">
			<Flex className="header-content" justify="space-between" align="center">
				<HStack gap={4}>
					<Image src="/static/img/logo.png" alt="University Logo" className="header-logo" />
					<Text className="header-title">University</Text>
				</HStack>

				{user !== null && (
					<HStack gap={3}>
						<ColorModeButton />

						<VStack align="end" gap={1} className="user-info">
							<Text className="user-name">{user?.fullName}</Text>
							<Text className="user-email">{user?.email}</Text>
							<Text className="user-role">{UserRoleNamesCollection.at(user?.role)?.label}</Text>
						</VStack>
						<Image className="user-avatar" src={user.avatarUri} />
						<IconButton
							aria-label="Logout"
							className="logout-button"
							variant="ghost"
							onClick={onLogoutButtonClick}
						>
							<LuLogOut />
						</IconButton>
					</HStack>
				)}
			</Flex>
		</Box>
	);
};

export default HeaderBar;
