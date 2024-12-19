import React from 'react';
import HeaderBar from "../components/HeaderBar";
import {Box, Card, Center, Flex, Heading, Stack, Text} from "@chakra-ui/react";
import VersionInfo from "../components/VersionInfo";
import Sidebar from "../components/Sidebar.tsx";

const AdminPage: React.FC = () => {
    // return (
    //     <>
    //         <HeaderBar/>
    //         <Center h="60vh">
    //             <Box p="10" maxW="100%" w="90%">
    //                 <Stack>
    //                     <Card.Root
    //                         p={1}
    //                         rounded="md"
    //                         boxShadow="md"
    //                         w="90%"
    //                         mx="auto"
    //                         size="sm"
    //                     >
    //                         <Card.Header>
    //                             <Heading size='sm'>Панель администратора</Heading>
    //                         </Card.Header>
    //                         <Card.Body>
    //                             <VersionInfo/>
    //                         </Card.Body>
    //                     </Card.Root>
    //                 </Stack>
    //             </Box>
    //         </Center>
    //     </>
    // );

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
                        <VersionInfo/>
                    </Card.Body>
                </Card.Root>
            </Flex>
        </>
    )
};

export default AdminPage;