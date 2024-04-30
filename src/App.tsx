import React from 'react';
import './App.css';
import VersionInfo from "./components/VersionInfo";
import {Box, Card, CardHeader, Center, ChakraProvider, Heading, Stack} from '@chakra-ui/react'

export default function App() {
    return (
        <ChakraProvider>
            <Center h="60vh">
                <Box p="10" maxW="100%" w="90%" borderWidth="1px">
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
                                <Heading size='s'>Admin Dashboard</Heading>
                            </CardHeader>
                        </Card>
                        <VersionInfo />
                    </Stack>
                </Box>
            </Center>
        </ChakraProvider>
    )
}
