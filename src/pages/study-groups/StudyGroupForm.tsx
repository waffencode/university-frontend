import CustomSelectField from "@/components/CustomSelectField";
import FieldOfStudy from "@/entities/domain/FieldOfStudy";
import { StudyGroupDto } from "@/entities/domain/StudyGroup";
import User from "@/entities/domain/User";
import UserRole from "@/entities/domain/UserRole";
import { ApiContext } from "@/service/ApiProvider";
import { Button, Field, Input, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const StudyGroupForm: React.FC = () => {
	const { register, control, handleSubmit } = useForm<StudyGroupDto>();
	const apiContext = useContext(ApiContext);
	const [fieldsOfStudy, setFieldsOfStudy] = useState<FieldOfStudy[]>([]);
	const [students, setStudents] = useState<User[]>([]);

	useEffect(() => {
		const loadData = async () => {
			setFieldsOfStudy(await apiContext.fieldOfStudy.getAll());

			const result = (await apiContext.user.getAllUsers()).filter((u) => u.role === UserRole.Student);
			setStudents(result);
		};

		loadData();
	}, []);

	const onSubmit = async (data: StudyGroupDto) => {
		await apiContext.studyGroup.createStudyGroup(data);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<VStack gap={2} align="left" w="50%">
					<Field.Root>
						<Field.Label>Название</Field.Label>
						<Input {...register("name")} />
					</Field.Root>
					<Field.Root>
						<Field.Label>Направление подготовки</Field.Label>
						<CustomSelectField
							control={control}
							name={"fieldOfStudyId"}
							options={fieldsOfStudy.map((f) => ({
								label: `${f.code} ${f.name}`,
								value: f.id,
							}))}
						/>
					</Field.Root>
					<Field.Root>
						<Field.Label>Студенты</Field.Label>
						<CustomSelectField
							control={control}
							name={"studentsIdList"}
							options={students.map((s) => ({
								label: s.fullName,
								value: s.id,
							}))}
							multiple
						/>
					</Field.Root>
					<Button type="submit">Создать</Button>
				</VStack>
			</form>
		</>
	);
};

export default StudyGroupForm;
