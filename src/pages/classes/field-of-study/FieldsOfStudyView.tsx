import { Button } from "@/components/ui/button";
import FieldOfStudy, {
	FormOfStudyListCollection,
} from "@/entities/domain/FieldOfStudy";
import { ApiContext } from "@/service/ApiProvider";
import { Flex, HStack, Table } from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useContext, useEffect, useState } from "react";
import { LuPencil, LuTrash } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const FieldsOfStudyView: React.FC = () => {
	const navigate = useNavigate();
	const apiContext = useContext(ApiContext);
	const [fieldsOfStudy, setFieldsOfStudy] = useState<FieldOfStudy[]>([]);

	useEffect(() => {
		const loadData = async () => {
			const data = await apiContext.fieldOfStudy.getAll();
			setFieldsOfStudy(data);
		};

		loadData();
	}, []);

	const handleEditClick = (id: UUID) => {
		navigate("./fields-of-study/edit/" + id.toString());
	};

	const handleDeleteClick = async (id: UUID) => {
		await apiContext.fieldOfStudy.delete(id);
	};

	return (
		<>
			<HStack gap={4}>
				<Button onClick={() => navigate("./fields-of-study/create")}>
					Добавить...
				</Button>
			</HStack>
			<Table.ScrollArea>
				<Table.Root size="sm" showColumnBorder interactive>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>Код</Table.ColumnHeader>
							<Table.ColumnHeader>
								Наименование
							</Table.ColumnHeader>
							<Table.ColumnHeader>
								Форма обучения
							</Table.ColumnHeader>
							<Table.ColumnHeader>Профиль</Table.ColumnHeader>
							<Table.ColumnHeader textAlign="end">
								Действия
							</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{fieldsOfStudy.map((field) => (
							<Table.Row key={field.id}>
								<Table.Cell>{field.code}</Table.Cell>
								<Table.Cell>{field.name}</Table.Cell>
								<Table.Cell>
									{
										FormOfStudyListCollection.items[
											field.formOfStudy
										].label
									}
								</Table.Cell>
								<Table.Cell>{field.specialization}</Table.Cell>
								<Table.Cell>
									<Flex
										gap={2}
										align="end"
										justify="flex-end"
									>
										<Button
											onClick={() =>
												handleEditClick(field.id)
											}
											size="xs"
											variant="surface"
										>
											<LuPencil /> Редактировать
										</Button>
										<Button
											onClick={() =>
												handleDeleteClick(field.id)
											}
											size="xs"
											colorPalette="red"
											variant="subtle"
										>
											<LuTrash /> Удалить
										</Button>
									</Flex>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</Table.ScrollArea>
		</>
	);
};

export default FieldsOfStudyView;
