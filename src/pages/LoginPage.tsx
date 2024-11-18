import React, {useContext} from 'react';
import HeaderBar from "../components/HeaderBar";
import {Box, Button, Card, Center, Heading, Input, Stack, Text, VStack} from "@chakra-ui/react";
import axios from "axios";
import {ConfigContext} from "../components/ConfigProvider";
import CryptoJS from 'crypto-js';

const LoginPage: React.FC = () => {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [response, setResponse] = React.useState<string>("");
    const {serverUrl} = useContext(ConfigContext);

    function handleLogin() {
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

        axios.get(serverUrl + "/User/login", {params: {email: email, passwordHash: hashedPassword}})
            .then((response) => {
                setResponse("Success!");
            })
        .catch((error) => {
            setResponse(error.message);
        });
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
                                <Heading size='md'>Авторизация</Heading>
                            </Card.Header>
                            <Card.Body>
                                <VStack>
                                    <Input onChange={(e) => setEmail(e.target.value)} value={email}
                                           placeholder="Логин" width="60%"/>
                                    <Input onChange={(e) => setPassword(e.target.value)} value={password}
                                           placeholder="Пароль" width="60%"/>
                                    <Button onClick={handleLogin}>Войти</Button>
                                    <Text>{response}</Text>
                                </VStack>
                            </Card.Body>
                        </Card.Root>
                    </Stack>
                </Box>
            </Center>
        </>
    );
};

export default LoginPage;