import React, {useCallback, useContext, useEffect} from 'react';
import HeaderBar from "../components/HeaderBar";
import {Card, createListCollection, Flex, Heading, HStack, Table, VStack} from "@chakra-ui/react";
import VersionInfo from "../components/VersionInfo";
import Sidebar from "../components/Sidebar.tsx";
import {ApiContext} from "../service/ApiProvider.tsx";
import RegistrationRequest from "../entities/domain/RegistrationRequest.ts";
import {Button} from "../components/ui/button.tsx";
import {UserContext} from "../service/UserProvider.tsx";
import {useNavigate} from "react-router-dom";
import {UUID} from "node:crypto";
import {UserRoleNamesCollection} from "../entities/domain/UserRole.ts";
import formatDate from "../service/FormatDate.ts";
import {LuMail} from "react-icons/lu";
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot
} from "../components/ui/pagination.tsx";

const AdminPage: React.FC = () => {
    const api = useContext(ApiContext);
    const userContext = useContext(UserContext)!;
    const navigate = useNavigate();

    const [requests, setRequests] = React.useState<RegistrationRequest[]>([]);

    const loadRequests = useCallback(() => {
        if (!userContext || !userContext.user)
        {
            return;
        }

        api.registrationRequest.getPendingRegistrationRequests().then((response) => {
            setRequests(response);
        });
    }, [api.registrationRequest, userContext]);
    
    useEffect(() => {
        if (!userContext || !userContext.user)
        {
            navigate("/login");
            return;
        }

        loadRequests();
    }, [loadRequests, navigate, userContext]);

    function onAuthorizeButtonClick(requestId: UUID) {
        api.registrationRequest.acceptRegistrationRequest(requestId).then(() => {
            api.registrationRequest.getPendingRegistrationRequests().then((response) => {
                setRequests(response);
            })
        })
    }

    return (
        <>
            <HeaderBar />
            <Flex gap={10} marginY={2} grow={5} >
                <Sidebar />
                <Card.Root w="80%" shadow="md" border="0" rounded={3}  p={4}>
                    <Card.Header>
                        <Heading>Панель администратора</Heading>
                    </Card.Header>
                    <Card.Body>
                        <VStack gap={2}>
                        <VersionInfo/>
                        <Card.Root
                            p={1}
                            rounded="md"
                            boxShadow="md"
                            w="90%"
                            mx="auto"
                            size="sm">
                            <Card.Header>
                                <Heading>Запросы на регистрацию</Heading>
                            </Card.Header>
                            <Card.Body>
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
                                            { requests &&
                                                requests.map((request) => (
                                                    <Table.Row>
                                                        <Table.Cell><b>{request.user.fullName}</b><br />
                                                            <HStack alignItems="flex-end">
                                                                <LuMail />
                                                                {request.user.email}
                                                            </HStack>
                                                        </Table.Cell>
                                                        <Table.Cell>{UserRoleNamesCollection.items[request.user.role].label}</Table.Cell>
                                                        <Table.Cell>{formatDate(request.date)}</Table.Cell>
                                                        <Table.Cell>
                                                            <HStack gap={2}>
                                                                <Button onClick={() => onAuthorizeButtonClick(request.id)}>Утвердить</Button>

                                                                {/*TODO: Implement reject button */}
                                                                <Button>Отклонить</Button>
                                                            </HStack>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))
                                            }
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
                            </Card.Body>
                        </Card.Root>
                        </VStack>
                    </Card.Body>
                </Card.Root>
            </Flex>
        </>
    )
};

export default AdminPage;