import React, {useContext, useEffect} from 'react';
import HeaderBar from "../components/HeaderBar";
import {Card, Flex, Heading, VStack} from "@chakra-ui/react";
import VersionInfo from "../components/VersionInfo";
import Sidebar from "../components/Sidebar.tsx";
import {ApiContext} from "../service/ApiProvider.tsx";
import RegistrationRequest from "../entities/domain/RegistrationRequest.ts";
import {Button} from "../components/ui/button.tsx";
import {UserContext} from "../service/UserProvider.tsx";
import {useNavigate} from "react-router-dom";

const AdminPage: React.FC = () => {
    const api = useContext(ApiContext);
    const userContext = useContext(UserContext)!;
    const navigate = useNavigate();

    const [requests, setRequests] = React.useState<RegistrationRequest[]>([]);

    useEffect(() => {
        if (!userContext || !userContext.user)
        {
            navigate("/login");
        }

        api.registrationRequest.getPendingRegistrationRequests().then((response) => {
            setRequests(response);
        })
    }, [navigate, userContext]);

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
                                    { requests &&
                                        requests.map(request => {
                                            return (<div>
                                                {request.id}
                                                <Button>Утвердить</Button>
                                            </div>)
                                    })}
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