import React from 'react';
import HeaderBar from "../components/HeaderBar";
import {Box, Card, CardHeader, Center, Heading, Stack} from "@chakra-ui/react";
import VersionInfo from "../components/VersionInfo";

const AdminPage: React.FC = () => {
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
                                <Heading size='s'>Панель администратора</Heading>
                            </CardHeader>
                        </Card>
                        <VersionInfo/>
                    </Stack>
                </Box>
            </Center>
        </body>
    );
};

export default AdminPage;