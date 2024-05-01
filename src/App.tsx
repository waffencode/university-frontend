import React from 'react';
import './App.css';
import VersionInfo from "./components/VersionInfo";
import {Box, Card, CardHeader, Center, ChakraProvider, extendTheme, Heading, Stack} from '@chakra-ui/react'
import HeaderBar from "./components/HeaderBar";

const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                color: 'default',
                bg: '#F5F5F5',
            },
        }),
    },
});

export default function App() {
    return (
        <ChakraProvider theme={theme}>
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
                                    <Heading size='s'>Admin Dashboard</Heading>
                                </CardHeader>
                            </Card>
                            <VersionInfo/>
                        </Stack>
                    </Box>
                </Center>
            </body>
        </ChakraProvider>
    )
}
