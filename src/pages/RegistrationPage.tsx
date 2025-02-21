import React from 'react';
import {
    Box,
    Button, Card,
    Center,
    createListCollection,
    Heading,
    HStack,
    Image,
    Input,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {Field} from "../components/ui/field"
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText
} from "../components/ui/select.tsx";
import {PasswordInput, PasswordStrengthMeter} from "../components/ui/password-input.tsx";
import {useNavigate} from "react-router-dom";
import {Checkbox} from "../components/ui/checkbox.tsx";
import AppPage from "../components/AppPage.tsx";
import {UserContext} from "../service/UserProvider.tsx";
import User from "../entities/domain/User.ts";
import UserRole from "../entities/domain/UserRole.ts";
import {v4} from "uuid";
import {UUID} from "node:crypto";
import HeaderBar from "../components/HeaderBar.tsx";

const dummyUser: User = {
    id: v4() as UUID,
    passwordHash: "",
    username: "",
    fullName: "",
    email: "",
    role: UserRole.Unauthorized
};

const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const userContext = React.useContext(UserContext)!;

    // Password strength meter.
    const zxcvbn = require('zxcvbn');

    const [newUser, setNewUser] = React.useState<User>(dummyUser);
    const [password, setPassword] = React.useState<string>("");

    const roles = createListCollection({
        items: [
            { label: "Студент", value: UserRole.Student },
            { label: "Преподаватель", value: UserRole.Teacher },
            { label: "Методист", value: UserRole.Manager },
            { label: "Администратор", value: UserRole.Admin },
        ],
    })

    function handleRegistration() {
        userContext.setUser(newUser);
        navigate("/register/confirm");
    }

    // Do not use <AppPage> here.
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
                                    Регистрация
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <HStack gap={30}>
                                    <VStack gap={1} w="60%">
                                        <Field label="Email">
                                            <Input placeholder="me@example.com" />
                                        </Field>
                                        <Field label="Логин">
                                            <Input placeholder="i.i.ivanov" />
                                        </Field>
                                        <Field label="ФИО">
                                            <Input placeholder="Иванов Иван Иванович" />
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
                                            <Text textStyle="xs" color="fg.muted">
                                                Ваша роль будет проверена и утверждена администратором системы.
                                            </Text>
                                        </Field>
                                        <Field label="Пароль">
                                            <Stack maxW="100%">
                                                <PasswordInput onChange={(e) => setPassword(e.target.value)}/>
                                                <PasswordStrengthMeter value={ zxcvbn(password).score }/>
                                            </Stack>
                                        </Field>
                                        <Field label="Повторите пароль">
                                            <Stack maxW="100%">
                                                <PasswordInput />
                                            </Stack>
                                        </Field>
                                        <Checkbox marginY={3} alignItems="flex-start">
                                            <Box lineHeight="1">Даю согласие на сбор, обработку и хранение персональных данных</Box>

                                            <Box color="fg.muted" fontWeight="normal">В соответствии с №152-ФЗ «О персональных данных»</Box>
                                        </Checkbox>
                                        <HStack>
                                            <Button variant="subtle" onClick={() => navigate(-1)}>Назад</Button>
                                            <Button onClick={ () => handleRegistration() }>Зарегистрироваться</Button>
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