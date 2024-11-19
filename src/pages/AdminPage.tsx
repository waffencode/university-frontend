import React from 'react';
import HeaderBar from "../components/HeaderBar";
import {Box, Card, Center, Heading, Stack} from "@chakra-ui/react";
import VersionInfo from "../components/VersionInfo";

const AdminPage: React.FC = () => {
    return (
        <>
            <HeaderBar/>
            <Center h="60vh">
                <Box p="10" maxW="100%" w="90%">
                    <Stack>
                        <Card.Root
                            p={1}
                            rounded="md"
                            boxShadow="md"
                            w="90%"
                            mx="auto"
                            size="sm"
                        >
                            <Card.Header>
                                <Heading size='sm'>Панель администратора</Heading>
                            </Card.Header>
                        </Card.Root>
                        <Card.Body>
                            <VersionInfo/>
                        </Card.Body>
                    </Stack>
                </Box>
            </Center>
        </>
    );
};

export default AdminPage;