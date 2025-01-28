import React, {useContext, useEffect, useState} from "react";
import HeaderBar from "../components/HeaderBar.tsx";
import {Card, Flex, Heading, Input, VStack} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar.tsx";
import {UserContext} from "../service/UserProvider.tsx";
import {Button} from "../components/ui/button.tsx";
import User from "../entities/domain/User.ts";
import {ApiContext} from "../service/ApiProvider.tsx";
import {useNavigate} from "react-router-dom";
import {Alert} from "../components/ui/alert.tsx";
import {UserRoleNamesCollection} from "../entities/domain/UserRole.ts";
import {toaster} from "../components/ui/toaster.tsx";

const SettingsPage: React.FC = () => {
    const apiContext = useContext(ApiContext)!;
    const userContext = useContext(UserContext)!;
    const navigate = useNavigate();

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
    }

    return (
        <>
            <HeaderBar />
            <Flex gap={10} marginY={2} grow={5} >
                <Sidebar />
                <Card.Root w="80%" shadow="md" border="0" rounded={3}  p={4}>
                    <Card.Header>
                        <Heading>Настройки</Heading>
                    </Card.Header>
                    <Card.Body>
                        <VStack alignItems="left" gap={3}>
                            <Heading size="sm">Профиль</Heading>
                            {(userContext.user !== null) &&
                                <>
                                    <Heading size="xs">Email</Heading>
                                    <Input defaultValue={userContext.user.email} onChange={(e) => userEdited.email = e.target.value} />

                                    <Heading size="xs">Роль</Heading>
                                    <Input value={UserRoleNamesCollection.at(userContext.user.role)?.label} readOnly={true} disabled/>

                                    <Heading size="xs">Логин</Heading>
                                    <Input defaultValue={userContext.user.username} onChange={(e) => userEdited.username = e.target.value} />

                                    <Heading size="xs">Полное имя</Heading>
                                    <Input defaultValue={userContext.user.fullName} onChange={(e) => userEdited.fullName = e.target.value} />
                                </>
                            }
                            <Button onClick={onSubmitButtonClicked}>
                                Обновить
                            </Button>
                        </VStack>
                    </Card.Body>
                </Card.Root>
            </Flex>
        </>
    )
}

export default SettingsPage;