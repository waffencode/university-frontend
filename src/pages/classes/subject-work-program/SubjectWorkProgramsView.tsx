import { Button } from "@/components/ui/button.tsx";
import { toaster } from "@/components/ui/toaster";
import { SubjectWorkProgram } from "@/entities/domain/SubjectWorkProgram.ts";
import { ApiContext } from "@/service/ApiProvider.tsx";
import { Flex, HStack, Table } from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useContext, useEffect } from "react";
import { LuEye, LuPencil, LuTrash } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const SubjectWorkProgramsView: React.FC = () => {
	const apiContext = useContext(ApiContext);
	const navigate = useNavigate();

	const [subjectWorkPrograms, setSubjectWorkPrograms] = React.useState<
		SubjectWorkProgram[]
	>([]);

	useEffect(() => {
		const fetchSubjectWorkPrograms = async () => {
			setSubjectWorkPrograms(
				await apiContext.subjectWorkProgram.getAll(),
			);
		};

		fetchSubjectWorkPrograms().catch(console.error);
	}, []);

	function handleAddClick() {
		navigate(`subjectWorkPrograms/create`);
	}

	function handleEditClick(id: UUID) {
		navigate(`subjectWorkPrograms/edit/${id.toString()}`);
	}

	async function handleDeleteClick(id: UUID) {
		await apiContext.subjectWorkProgram.delete(id);
		setSubjectWorkPrograms(subjectWorkPrograms.filter((s) => s.id !== id));

		toaster.create({
			type: "success",
			title: "РПД успешно удалена!",
		});
	}

	const handleViewClick = (id: UUID) => {
		navigate(`subjectWorkPrograms/view/${id.toString()}`);
	};
	return (
		<>
			<HStack gap={4}>
				<Button onClick={handleAddClick}>Добавить...</Button>
			</HStack>
			<Table.ScrollArea>
				<Table.Root size="sm" showColumnBorder interactive>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>Дисциплина</Table.ColumnHeader>
							<Table.ColumnHeader textAlign="end">
								Действия
							</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{subjectWorkPrograms &&
						subjectWorkPrograms.length > 0 ? (
							subjectWorkPrograms.map((subjectWorkProgram) => (
								<Table.Row key={subjectWorkProgram.id}>
									<Table.Cell>
										{subjectWorkProgram.subject.name}
									</Table.Cell>
									<Table.Cell>
										<Flex
											gap={2}
											align="end"
											justify="flex-end"
										>
											<Button
												size="xs"
												onClick={() =>
													handleViewClick(
														subjectWorkProgram.id,
													)
												}
												variant="surface"
											>
												<LuEye /> Просмотр
											</Button>
											<Button
												size="xs"
												onClick={() =>
													handleEditClick(
														subjectWorkProgram.id,
													)
												}
												variant="surface"
											>
												<LuPencil /> Редактировать
											</Button>
											<Button
												size="xs"
												onClick={() =>
													handleDeleteClick(
														subjectWorkProgram.id,
													)
												}
												colorPalette="red"
												variant="subtle"
											>
												<LuTrash /> Удалить
											</Button>
										</Flex>
									</Table.Cell>
								</Table.Row>
							))
						) : (
							<Table.Row>
								<Table.Cell colSpan={3} textAlign="center">
									Список РПД пуст
								</Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
				</Table.Root>
			</Table.ScrollArea>
		</>
	);
};

export default SubjectWorkProgramsView;
