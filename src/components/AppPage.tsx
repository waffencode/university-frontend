import { ConfigContext } from "@/components/ConfigProvider";
import HeaderBar from "@/components/headerbar/HeaderBar";
import { UserContext } from "@/service/UserProvider";
import { Card, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

interface AppPageProps {
	title?: string;
	children: React.ReactNode;
}

const AppPage: React.FC<AppPageProps> = ({ title, children }) => {
	const userContext = useContext(UserContext)!;
	const { serverUrl } = useContext(ConfigContext);
	const navigate = useNavigate();

	useEffect(() => {
		// Perform API request to check cookies.
		const checkCookie = () => {
			axios
				.get(serverUrl + "/User/check", {
					withCredentials: true,
				})
				.then((response) => {
					const valid = response.data;
					if (!valid) {
						userContext.setUser(null);
						navigate("/");
					}
				})
				.catch(() => {
					userContext.setUser(null);
					navigate("/");
				});
		};

		if (!userContext.user || !userContext.user.id) {
			navigate("/");
		}

		checkCookie();
	}, []);

	return (
		<>
			<HeaderBar />
			<Flex gap={2} grow={5} p={2}>
				<Sidebar />
				<Card.Root w="100%" shadow="md" border="0" rounded={3}>
					{title && (
						<Card.Header>
							<Heading>{title}</Heading>
						</Card.Header>
					)}
					<Card.Body>{children}</Card.Body>
				</Card.Root>
			</Flex>
		</>
	);
};

export default AppPage;
