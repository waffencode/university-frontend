import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const DemoModeBanner: React.FC = () => {
	return (
		<Box
			p={6}
			mt={15}
			borderRadius="xl"
			bgGradient="linear(to-r, blue.50, purple.50)"
			borderWidth="1px"
			borderColor="gray.100"
			className="demo-advertisement-container"
		>
			<Flex direction="column" gap={3}>
				<Heading as="h2" size="lg" color="blue.800" fontWeight="semibold" letterSpacing="tight">
					Это демонстрационный клиент системы Университет!
				</Heading>

				<Text fontSize="md" color="gray.600">
					Оцените все возможности платформы с тестовыми учетными записями:
				</Text>

				<SimpleGrid columns={{ base: 1, md: 2 }} gap={2} mt={2} color="black">
					<Box bg="white" p={4} borderRadius="lg" shadow="sm" borderLeft="4px solid" borderColor="blue.400">
						<Text fontWeight="medium" color="blue.700" mb={2}>
							Администратор
						</Text>
						<Text fontSize="sm">
							<b>Логин:</b> admin@example.com
						</Text>
						<Text fontSize="sm">
							<b>Пароль:</b> admin
						</Text>
					</Box>

					<Box bg="white" p={4} borderRadius="lg" shadow="sm" borderLeft="4px solid" borderColor="purple.400">
						<Text fontWeight="medium" color="purple.700" mb={2}>
							Студент
						</Text>
						<Text fontSize="sm">
							<b>Логин:</b> student@example.com
						</Text>
						<Text fontSize="sm">
							<b>Пароль:</b> student
						</Text>
					</Box>

					<Box bg="white" p={4} borderRadius="lg" shadow="sm" borderLeft="4px solid" borderColor="teal.400">
						<Text fontWeight="medium" color="teal.700" mb={2}>
							Методист
						</Text>
						<Text fontSize="sm">
							<b>Логин:</b> manager@example.com
						</Text>
						<Text fontSize="sm">
							<b>Пароль:</b> manager
						</Text>
					</Box>

					<Box bg="white" p={4} borderRadius="lg" shadow="sm" borderLeft="4px solid" borderColor="orange.400">
						<Text fontWeight="medium" color="orange.700" mb={2}>
							Преподаватель
						</Text>
						<Text fontSize="sm">
							<b>Логин:</b> teacher@example.com
						</Text>
						<Text fontSize="sm">
							<b>Пароль:</b> teacher
						</Text>
					</Box>
				</SimpleGrid>

				<Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
					После входа вы сможете протестировать функционал, соответствующий роли пользователя.
				</Text>
			</Flex>
		</Box>
	);
};

export default DemoModeBanner;
