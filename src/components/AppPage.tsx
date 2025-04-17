import HeaderBar from "@/components/headerbar/HeaderBar";
import { UserContext } from "@/service/UserProvider";
import { Card, Flex, Heading } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

interface AppPageProps {
	title?: string;
	children: React.ReactNode;
}

const AppPage: React.FC<AppPageProps> = ({ title, children }) => {
	const { user } = useContext(UserContext)!;
	const navigate = useNavigate();

	useEffect(() => {
		if (!user || !user.id) {
			navigate("/");
		}
	});

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
