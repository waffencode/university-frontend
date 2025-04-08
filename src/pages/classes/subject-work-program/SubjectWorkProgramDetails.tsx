import AppPage from "@/components/AppPage";
import { Button } from "@/components/ui/button";
import { ClassType } from "@/entities/domain/ScheduleClass";
import { SubjectWorkProgram } from "@/entities/domain/SubjectWorkProgram";
import { ApiContext } from "@/service/ApiProvider";
import {
	Badge,
	Box,
	Heading,
	HStack,
	Stack,
	Table,
	Text,
} from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SubjectWorkProgramDetails = () => {
	const subjectWorkProgramId = useParams().subjectWorkProgramId as UUID;
	const apiContext = useContext(ApiContext);
	const [workProgram, setWorkProgram] = useState<SubjectWorkProgram | null>(
		null,
	);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data =
					await apiContext.subjectWorkProgram.getById(
						subjectWorkProgramId,
					);
				setWorkProgram(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [subjectWorkProgramId, apiContext.subjectWorkProgram]);

	const getClassTypeBadge = (type: ClassType) => {
		const typeMappings = {
			[ClassType.Lecture]: {
				text: "Лекция",
				color: "blue",
			},
			[ClassType.Lab]: {
				text: "Лабораторная",
				color: "purple",
			},
			[ClassType.Seminar]: {
				text: "Семинар",
				color: "orange",
			},
			[ClassType.Exam]: {
				text: "Экзамен",
				color: "red",
			},
		};

		return (
			<Badge colorScheme={typeMappings[type].color} variant="subtle">
				{typeMappings[type].text}
			</Badge>
		);
	};

	return (
		<AppPage title={`Рабочая программа дисциплины`}>
			<Stack gap={6}>
				<Box>
					<Heading size="md" mb={2}>
						Основная информация
					</Heading>
					<Stack gap={3}>
						<Text>
							<strong>Дисциплина:</strong>{" "}
							{workProgram?.subject.name}
						</Text>
						<Text>
							<strong>Всего часов:</strong>{" "}
							{workProgram?.classes.reduce(
								(sum, cls) => sum + cls.hours,
								0,
							)}
						</Text>
					</Stack>
				</Box>

				<Box>
					<Heading size="md" mb={2}>
						План занятий
					</Heading>
					<Table.Root colorScheme="gray">
						<Table.Header>
							<Table.Row>
								<Table.ColumnHeader>№</Table.ColumnHeader>
								<Table.ColumnHeader>Тема</Table.ColumnHeader>
								<Table.ColumnHeader>
									Тип занятия
								</Table.ColumnHeader>
								<Table.ColumnHeader>Часы</Table.ColumnHeader>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{workProgram?.classes.map((cls, index) => (
								<Table.Row key={cls.id}>
									<Table.Cell>{index + 1}</Table.Cell>
									<Table.Cell>{cls.theme}</Table.Cell>
									<Table.Cell>
										{getClassTypeBadge(cls.classType)}
									</Table.Cell>
									<Table.Cell>{cls.hours}</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Root>
				</Box>
				<HStack gap={2}>
					<Button
						onClick={() =>
							navigate(
								`/classes/subjectWorkPrograms/edit/${workProgram?.id}`,
							)
						}
					>
						Редактировать
					</Button>
					<Button onClick={() => navigate(-1)}>Назад</Button>
				</HStack>
			</Stack>
		</AppPage>
	);
};

export default SubjectWorkProgramDetails;
