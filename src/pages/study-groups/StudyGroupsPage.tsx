import AppPage from "@/components/AppPage";
import { StudyGroupDto } from "@/entities/domain/StudyGroup";
import StudyGroupForm from "@/pages/study-groups/StudyGroupForm";
import { ApiContext } from "@/service/ApiProvider";
import { Button, Flex, Heading, Spinner, Table } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { LuPencil, LuTrash } from "react-icons/lu";

const StudyGroupsPage: React.FC = () => {
	const apiContext = useContext(ApiContext);
	const [data, setData] = useState<StudyGroupDto[]>([]);

	useEffect(() => {
		const loadData = async () => {
			const response = await apiContext.studyGroup.getAll();
			setData(response);
		};

		loadData();
	}, []);

	return (
		<AppPage title="Учебные группы">
			<Heading>Список групп</Heading>
			{data.length === 0 ? (
				<Spinner />
			) : (
				<>
					<Table.Root size="sm">
						<Table.Header>
							<Table.ColumnHeader>Название</Table.ColumnHeader>
							<Table.ColumnHeader>Численность</Table.ColumnHeader>
							<Table.ColumnHeader>Действия</Table.ColumnHeader>
						</Table.Header>
						<Table.Body>
							{data
								.sort((a, b) => a.name.localeCompare(b.name))
								.map((group) => (
									<Table.Row key={group.id}>
										<Table.Cell>{group.name}</Table.Cell>
										<Table.Cell>
											{group.studentsIdList.length} чел.
										</Table.Cell>
										<Table.Cell>
											<Flex
												gap={2}
												align="end"
												justify="flex-start"
											>
												<Button
													size="xs"
													variant="surface"
												>
													{/*TODO: Implement*/}
													<LuPencil /> Редактировать
												</Button>
												<Button
													size="xs"
													colorPalette="red"
													variant="subtle"
												>
													{/*TODO: Implement*/}
													<LuTrash /> Удалить
												</Button>
											</Flex>
										</Table.Cell>
									</Table.Row>
								))}
						</Table.Body>
					</Table.Root>
				</>
			)}
			<Heading mt={10}>Добавить группу</Heading>
			<StudyGroupForm />
		</AppPage>
	);
};

export default StudyGroupsPage;
