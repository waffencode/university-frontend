import AppPage from "@/components/AppPage";
import Classroom from "@/entities/domain/Classroom";
import ClassroomForm from "@/pages/university/ClassroomForm";
import { ApiContext } from "@/service/ApiProvider";
import { Box, Heading, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

const UniversityPage: React.FC = () => {
	const apiContext = useContext(ApiContext);

	const [classrooms, setClassrooms] = useState<Classroom[]>([]);

	useEffect(() => {
		const loadClassrooms = async () => {
			const result = await apiContext.classroom.getAll();
			setClassrooms(result);
		};

		loadClassrooms();
	}, []);

	return (
		<AppPage title="Университет">
			<Heading>Аудиторный фонд</Heading>
			<ClassroomForm />

			<Heading mt={2} mb={2} size="xs">
				Список аудиторий:
			</Heading>
			<VStack gap={4} align="flex-start">
				{classrooms.map((classroom) => (
					<Box
						shadow="sm"
						p={2}
						borderRadius="md"
						minW={150}
						textAlign="center"
						key={classroom.id}
					>
						{classroom.designation}
					</Box>
				))}
			</VStack>
		</AppPage>
	);
};

export default UniversityPage;
