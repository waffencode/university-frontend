import React, {useContext} from 'react';
import HeaderBar from "../components/HeaderBar";
import {Box, Button, Card, Center, Heading, HStack, Input, Stack, Text, VStack} from "@chakra-ui/react";
import axios from "axios";
import {ConfigContext} from "../components/ConfigProvider";
import CryptoJS from 'crypto-js';
import {PasswordInput} from "../components/ui/password-input.tsx";
import {Alert} from "../components/ui/alert.tsx";
import {Navigate, redirect, Route, Routes, useNavigate} from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage.tsx";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [response, setResponse] = React.useState<string>("");
    const [isError, setIsError] = React.useState<boolean>(false);
    const {serverUrl} = useContext(ConfigContext);

    function handleLogin() {
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

        axios.get(serverUrl + "/User/login", {params: {email: email, passwordHash: hashedPassword}})
            .then((response) => {
                setIsError(false);
                setResponse("Success!");
            })
        .catch((error) => {
            setIsError(true);
            setResponse(error.message);
        });
    }

    function redirectToRegistrationPage(event: React.MouseEvent) {
        event.preventDefault();
        navigate("/register");
    }

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
                                    <Alert status="error" marginY={2} title={response}>Неверный логин или пароль.</Alert>
                                }
                                {
                                    (response.toString().length > 0 && !isError) &&
                                    <Alert status="success" marginY={2} title={response}>Успешный вход!</Alert>
                                }
                                <Center>
                                    <VStack>
                                        <Input onChange={(e) => setEmail(e.target.value)} value={email}
                                               placeholder="Логин" />
                                        <PasswordInput onChange={(e) => setPassword(e.target.value)} value={password}
                                                       placeholder="Пароль" />
                                        <HStack>
                                            <Button onClick={handleLogin}>Войти</Button>
                                            <Button variant="subtle" onClick={(e) => redirectToRegistrationPage(e)}>Регистрация</Button>
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