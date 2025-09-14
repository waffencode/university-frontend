import HeaderBar from "@/components/headerbar/HeaderBar";
import DemoModeBanner from "@/pages/DemoModeBanner";
import LoginForm from "@/pages/login/LoginForm";
import { UserContext } from "@/service/UserProvider";
import { Box, Center, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@/pages/login/LoginPage.css";

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const userContext = useContext(UserContext);
	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
		window.innerWidth < 768;

	useEffect(() => {
		if (userContext?.user) {
			navigate("/dashboard");
		}
	});

	return (
		<>
			<HeaderBar />
			{isMobile ? (
				<VStack mt={3} gap={2} h="60vh" px="10" maxW="100%" w="100%" mx="auto">
					{import.meta.env.VITE_DEMO_MODE_BANNER == "true" && <DemoModeBanner />}

					<Box py={10}>
						<LoginForm />
					</Box>
				</VStack>
			) : (
				<Center mt={15} gap={2} h="60vh" px="10" maxW="90%" w="100%" mx="auto">
					{import.meta.env.VITE_DEMO_MODE_BANNER == "true" && <DemoModeBanner />}

					<LoginForm />
				</Center>
			)}
		</>
	);
};

export default LoginPage;
