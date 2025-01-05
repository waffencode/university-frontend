import React from "react";
import HeaderBar from "../components/HeaderBar";
import {Box, Button, Card, Center, Heading, HStack, Image, Stack, Text, VStack} from "@chakra-ui/react";
import {PinInput} from "../components/ui/pin-input.tsx";
import {useNavigate} from "react-router-dom";

const RegistrationConfirmationPage: React.FC = () => {
    const navigate = useNavigate();

    const [otp, setOtp] = React.useState(["", "", "", ""])

    function handleSubmit() {
        // TODO: Add auth cookie.
        navigate('/dashboard');
    }

    return (
        <>
            <HeaderBar/>
            <Center>
                <Box p="5" maxW="100%" w="90%">
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
                                <Card.Title>
                                    Подтверждение регистрации
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <HStack gap={30}>
                                    <VStack gap={5} w="60%">
                                        <Text textStyle="sm" textAlign="center">На электронную почту, указанную при регистрации, отправлен
                                            4-значный одноразовый код подтверждения. <br/><br/>
                                            Для завершения регистрации введите код в поле ниже.</Text>
                                        <PinInput otp value={otp} onValueChange={(e) => setOtp(e.value)} />
                                        <HStack>
                                            <Button variant="subtle" onClick={() => navigate(-1)}>Назад</Button>
                                            <Button onClick={() => handleSubmit()}>Подтвердить</Button>
                                        </HStack>
                                    </VStack>
                                    <Center w="50%">
                                        <VStack gap={3}>
                                            <Image height="150px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Microsoft_.NET_logo.svg/684px-Microsoft_.NET_logo.svg.png" />
                                            <VStack marginY={10}>
                                                <Heading>University</Heading>
                                                Open-source платформа для университета
                                            </VStack>
                                        </VStack>
                                    </Center>
                                </HStack>
                            </Card.Body>
                        </Card.Root>
                    </Stack>
                </Box>
            </Center>
        </>
    );
}

export default RegistrationConfirmationPage;