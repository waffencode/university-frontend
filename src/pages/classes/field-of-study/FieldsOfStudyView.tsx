import { Button } from "@/components/ui/button";
import FieldOfStudy, {
	FormOfStudyListCollection,
} from "@/entities/domain/FieldOfStudy";
import { ApiContext } from "@/service/ApiProvider";
import { HStack, Table } from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useContext, useEffect, useState } from "react";
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
			<Table.Root size="sm">
				<Table.Header>
					<Table.Row>
						<Table.Cell>Код</Table.Cell>
						<Table.Cell>Наименование</Table.Cell>
						<Table.Cell>Форма обучения</Table.Cell>
						<Table.Cell>Профиль</Table.Cell>
						<Table.Cell>Действия</Table.Cell>
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
								<HStack gap={2}>
									<Button
										onClick={() =>
											handleEditClick(field.id)
										}
										size="xs"
									>
										Редактировать
									</Button>
									<Button
										onClick={() =>
											handleDeleteClick(field.id)
										}
										size="xs"
									>
										Удалить
									</Button>
								</HStack>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</>
	);
};

export default FieldsOfStudyView;
