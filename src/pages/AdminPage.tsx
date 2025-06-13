import AppPage from "@/components/AppPage";
import { Button } from "@/components/ui/button";
import {
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
	PaginationRoot,
} from "@/components/ui/pagination";
import { UserRoleNamesCollection } from "@/entities/domain/UserRole";
import { ApiContext } from "@/service/ApiProvider";
import { UserContext } from "@/service/UserProvider";
import { Card, Center, Heading, HStack, Table, Text, VStack } from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useCallback, useContext, useEffect } from "react";
import { LuBookmarkCheck, LuMail } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import VersionInfo from "../components/VersionInfo";
import RegistrationRequest from "../entities/domain/RegistrationRequest.ts";
import formatDate from "../service/FormatDate.ts";

const AdminPage: React.FC = () => {
	const api = useContext(ApiContext);
	const userContext = useContext(UserContext)!;
	const navigate = useNavigate();

	const [requests, setRequests] = React.useState<RegistrationRequest[]>([]);

	const loadRequests = useCallback(() => {
		if (!userContext || !userContext.user) {
			return;
		}

		api.registrationRequest.getPendingRegistrationRequests().then((response) => {
			setRequests(response);
		});
	}, [api.registrationRequest, userContext]);

	useEffect(() => {
		if (!userContext || !userContext.user) {
			navigate("/login");
			return;
		}

		loadRequests();
	}, [loadRequests, navigate, userContext]);

	function onAuthorizeButtonClick(requestId: UUID) {
		api.registrationRequest.acceptRegistrationRequest(requestId).then(() => {
			api.registrationRequest.getPendingRegistrationRequests().then((response) => {
				setRequests(response);
			});
		});
	}

	return (
		<>
			<AppPage title="Панель администратора">
				<VStack gap={2}>
					<VersionInfo />
					<Card.Root p={1} rounded="md" boxShadow="md" w="90%" mx="auto" size="sm">
						<Card.Header>
							<Heading>Запросы на регистрацию</Heading>
						</Card.Header>
						<Card.Body>
							{requests.length > 0 ? (
								<VStack gap={2}>
									<Table.Root stickyHeader>
										<Table.Header>
											<Table.Row>
												<Table.ColumnHeader>Пользователь</Table.ColumnHeader>
												<Table.ColumnHeader>Запрашиваемая роль</Table.ColumnHeader>
												<Table.ColumnHeader>Дата регистрации</Table.ColumnHeader>
												<Table.ColumnHeader>Действие</Table.ColumnHeader>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{requests &&
												requests.map((request) => (
													<Table.Row key={request.id}>
														<Table.Cell>
															<b>{request.user.fullName}</b>
															<br />
															<HStack alignItems="flex-end">
																<LuMail />
																{request.user.email}
															</HStack>
														</Table.Cell>
														<Table.Cell>
															{UserRoleNamesCollection.items[request.user.role].label}
														</Table.Cell>
														<Table.Cell>{formatDate(request.date)}</Table.Cell>
														<Table.Cell>
															<HStack gap={2}>
																<Button
																	onClick={() => onAuthorizeButtonClick(request.id)}
																>
																	Утвердить
																</Button>

																{/*TODO: Implement reject button */}
																<Button>Отклонить</Button>
															</HStack>
														</Table.Cell>
													</Table.Row>
												))}
										</Table.Body>
									</Table.Root>

									<PaginationRoot count={requests.length * 5} pageSize={5} page={1}>
										<HStack wrap="wrap">
											<PaginationPrevTrigger />
											<PaginationItems />
											<PaginationNextTrigger />
										</HStack>
									</PaginationRoot>
								</VStack>
							) : (
								<Center textAlign="center">
									<VStack gap={1}>
										<LuBookmarkCheck color="#c5c5c5" size="4rem" />
										<Text color="gray.400">
											<br />
											Нерассмотренных запросов на регистрацию нет
										</Text>
									</VStack>
								</Center>
							)}
						</Card.Body>
					</Card.Root>
				</VStack>
			</AppPage>
		</>
	);
};

export default AdminPage;
