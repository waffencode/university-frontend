import { UserRoleNamesCollection } from "@/entities/domain/UserRole";
import { UserContext } from "@/service/UserProvider";
import {
	Box,
	Flex,
	HStack,
	IconButton,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { LuLogOut } from "react-icons/lu";
import "./Headerbar.css";

const HeaderBar: React.FC = () => {
	const context = useContext(UserContext)!;
	const { user } = context;

	return (
		<Box
			shadow="md"
			rounded={3}
			bg="white"
			marginX={2}
			className="header-container"
		>
			<Flex
				className="header-content"
				justify="space-between"
				align="center"
			>
				<HStack gap={4}>
					<Image
						src="/static/img/logo.png"
						alt="University Logo"
						className="header-logo"
					/>
					<Text className="header-title">University</Text>
				</HStack>

				{user !== null && (
					<HStack gap={3}>
						<VStack align="end" gap={1} className="user-info">
							<Text className="user-name">{user?.fullName}</Text>
							<Text className="user-email">{user?.email}</Text>
							<Text className="user-role">
								{UserRoleNamesCollection.at(user?.role)?.label}
							</Text>
						</VStack>
						<Image
							className="user-avatar"
							src="https://upload.wikimedia.org/wikipedia/ru/a/a9/Example.jpg"
							alt="User profile"
						/>
						<IconButton
							aria-label="Logout"
							className="logout-button"
							variant="ghost"
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
