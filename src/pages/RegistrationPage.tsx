import React from 'react';
import HeaderBar from "../components/HeaderBar";
import {
    Box,
    Button,
    Card,
    Center,
    createListCollection, Heading, HStack, Image,
    Input,
    Stack,
    VStack
} from "@chakra-ui/react";
import { Field } from "../components/ui/field"
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText
} from "../components/ui/select.tsx";
import {PasswordInput} from "../components/ui/password-input.tsx";

const RegistrationPage: React.FC = () => {
    const roles = createListCollection({
        items: [
            { label: "Студент", value: "student" },
            { label: "Преподаватель", value: "teacher" },
            { label: "Методист", value: "manager" },
            { label: "Администратор", value: "administrator" },
        ],
    })

    return (
        <>
            <HeaderBar/>
            <Center>
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
                                <Card.Title>
                                    Регистрация
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <HStack gap={30}>
                                    <VStack gap={2} w="60%">
                                        <Field label="Email">
                                            <Input placeholder="me@example.com" />
                                        </Field>
                                        <Field label="Логин">
                                            <Input placeholder="me@example.com" />
                                        </Field>
                                        <Field>
                                            <SelectRoot collection={roles} colorPalette="red">
                                                <SelectLabel>Роль пользователя</SelectLabel>
                                                <SelectTrigger>
                                                    <SelectValueText placeholder="Выберите роль" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    { roles.items.map((role) => (
                                                        <SelectItem item={role} key={role.value} _hover={{ bg: "#f5f5f5"}}>
                                                            {role.label}
                                                        </SelectItem>
                                                    ))
                                                    }
                                                </SelectContent>
                                            </SelectRoot>
                                        </Field>
                                        <Field label="Пароль">
                                            <PasswordInput />
                                        </Field>
                                        <Field label="Повторите пароль">
                                            <PasswordInput />
                                        </Field>
                                        <HStack>
                                            <Button variant="subtle">Назад</Button>
                                            <Button>Зарегистрироваться</Button>
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
};

export default RegistrationPage;