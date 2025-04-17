import { Button } from "@/components/ui/button";
import { HStack, Table } from "@chakra-ui/react";
import React from "react";

const FieldsOfStudyView: React.FC = () => {
	return (
		<>
			<Button>Добавить...</Button>
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
					<Table.Row>
						<Table.Cell>09.03.04</Table.Cell>
						<Table.Cell>Программная инженерия</Table.Cell>
						<Table.Cell>Очная</Table.Cell>
						<Table.Cell>
							Разработка программного обеспечения
							инфокоммуникационных сетей и систем
						</Table.Cell>
						<Table.Cell>
							<HStack gap={2}>
								<Button size="2xs">Редактировать</Button>
								<Button size="2xs">Удалить</Button>
							</HStack>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</>
	);
};

export default FieldsOfStudyView;
