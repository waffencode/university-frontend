import Subject from "@/entities/domain/Subject";
import { ApiContext } from "@/service/ApiProvider.tsx";
import { Button, HStack, Table } from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubjectsView: React.FC = () => {
	const apiContext = useContext(ApiContext);
	const navigate = useNavigate();

	const [data, setData] = useState<Subject[]>([]);

	const handleAddSubject = () => {
		navigate("/classes/subjects/create");
	};

	const handleDeleteClick = async (id: UUID) => {
		await apiContext.subject.deleteSubject(id);
		setData(data.filter((entity) => entity.id !== id));
	};

	useEffect(() => {
		const fetchSubjects = async () => {
			try {
				const response = await apiContext.subject.getSubjects();
				setData(response);
			} catch (error) {
				console.error("Error fetching subjects:", error);
			}
		};

		fetchSubjects().catch(console.error);
	}, []);

	const handleEditClick = (id: UUID) => {
		navigate(`/classes/subjects/edit/${id.toString()}`);
	};

	return (
		<>
			<HStack gap={4}>
				<Button onClick={handleAddSubject}>Добавить...</Button>
			</HStack>

			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Cell>ID</Table.Cell>
						<Table.Cell>Наименование</Table.Cell>
						<Table.Cell>Действия</Table.Cell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{data.length > 0 ? (
						data.map((subject) => (
							<Table.Row key={subject.id}>
								<Table.Cell>{subject.id}</Table.Cell>
								<Table.Cell>{subject.name}</Table.Cell>
								<Table.Cell>
									<HStack gap={2}>
										<Button
											onClick={() =>
												handleEditClick(subject.id)
											}
										>
											Редактировать
										</Button>
										<Button
											onClick={() =>
												handleDeleteClick(subject.id)
											}
										>
											Удалить
										</Button>
									</HStack>
								</Table.Cell>
							</Table.Row>
						))
					) : (
						<Table.Row>
							<Table.Cell colSpan={3} textAlign="center">
								Список дисциплин пуст
							</Table.Cell>
						</Table.Row>
					)}
				</Table.Body>
			</Table.Root>
		</>
	);
};

export default SubjectsView;
