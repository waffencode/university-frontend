import axios from "axios";
import {Box, Button, Card, Center, HStack, Input, Stack, VStack} from "@chakra-ui/react";
import CryptoJS from 'crypto-js';
import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {UUID} from "node:crypto";
import {ConfigContext} from "../components/ConfigProvider";
import HeaderBar from "../components/HeaderBar";
import {Alert} from "../components/ui/alert.tsx";
import {PasswordInput} from "../components/ui/password-input.tsx";
import {UserContext} from "../service/UserProvider.tsx";
import {ApiContext} from "../service/ApiProvider.tsx";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [response, setResponse] = React.useState<string>("");
    const [isError, setIsError] = React.useState<boolean>(false);

    const {serverUrl} = useContext(ConfigContext);
    const userContext = useContext(UserContext);
    const apiContext = useContext(ApiContext);

    function handleLogin() {
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

        axios.get(serverUrl + "/User/login", {params: {email: email, passwordHash: hashedPassword}, withCredentials: true})
            .then(async (response) => {
                setIsError(false);
                setResponse("Success!");
                const id: UUID = response.data;
                userContext?.setUser(await apiContext.user.getUser(id));
                navigate("/dashboard");
            })
        .catch((error) => {
            setIsError(true);
            if (error.response) {
                setResponse(error.response.data);
            }
        });
    }

    function redirectToRegistrationPage() {
        navigate("/register");
    }

    useEffect(() => {
        if (userContext?.user) {
            navigate("/dashboard");
        }
    });

    return (
        <>
            <HeaderBar />
            <Center h="60vh">
                <Box p="10" maxW="100%" w="40%">
                    <Stack>
                        <Card.Root
                            p={1}
                            rounded="md"
                            boxShadow="md"
                            w="90%"
                            mx="auto"
                            size="sm">
                            <Card.Header>
                                <Card.Title>
                                    Авторизация
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {isError &&
                                    <Alert status="error" marginY={2} title="Ошибка!">{response}</Alert>
                                }
                                <Center>
                                    <VStack gap={2}>
                                        <Input onChange={(e) => setEmail(e.target.value)} value={email}
                                               placeholder="Логин" />
                                        <PasswordInput onChange={(e) => setPassword(e.target.value)} value={password}
                                                       placeholder="Пароль" />
                                        <HStack marginY={2}>
                                            <Button onClick={handleLogin}>Войти</Button>
                                            <Button variant="subtle" onClick={() => redirectToRegistrationPage()}>Регистрация</Button>
                                        </HStack>
                                    </VStack>
                                </Center>
                            </Card.Body>
                        </Card.Root>
                    </Stack>
                </Box>
            </Center>
        </>
    );
};

export default LoginPage;