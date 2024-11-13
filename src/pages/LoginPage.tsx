import React from 'react';
import HeaderBar from "../components/HeaderBar";
import {Box, Card, CardHeader, Center, Heading, Stack} from "@chakra-ui/react";

const LoginPage: React.FC = () => {
    return (
        <body className="">
            <HeaderBar/>
            <Center h="60vh">
                <Box p="10" maxW="100%" w="90%">
                    <Stack>
                        <Card
                            p={1}
                            rounded="md"
                            boxShadow="md"
                            w="90%"
                            mx="auto"
                            size="sm"
                        >
                            <CardHeader>
                                <Heading size='s'>Авторизация</Heading>
                            </CardHeader>
                        </Card>
                    </Stack>
                </Box>
            </Center>
        </body>
    );
};

export default LoginPage;