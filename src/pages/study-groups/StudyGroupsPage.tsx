import AppPage from "@/components/AppPage";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import FieldOfStudy from "@/entities/domain/FieldOfStudy";
import { StudyGroupDto } from "@/entities/domain/StudyGroup";
import User from "@/entities/domain/User";
import UserRole from "@/entities/domain/UserRole";
import CustomMultipleSelectField from "@/pages/classes/scheduling/CustomMultipleSelectField";
import { ApiContext } from "@/service/ApiProvider";
import { Input, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const StudyGroupsPage: React.FC = () => {
	const { register, control, handleSubmit } = useForm<StudyGroupDto>();
	const apiContext = useContext(ApiContext);
	const [fieldsOfStudy, setFieldsOfStudy] = useState<FieldOfStudy[]>([]);
	const [students, setStudents] = useState<User[]>([]);

	useEffect(() => {
		const loadData = async () => {
			setFieldsOfStudy(await apiContext.fieldOfStudy.getAll());

			const result = (await apiContext.user.getAllUsers()).filter(
				(u) => u.role === UserRole.Student,
			);
			setStudents(result);
		};

		loadData();
	}, []);

	const onSubmit = async (data: StudyGroupDto) => {
		await apiContext.studyGroup.createStudyGroup(data);
	};

	return (
		<AppPage title="Учебные группы">
			<form onSubmit={handleSubmit(onSubmit)}>
				<VStack gap={2} align="left" w="50%">
					<Field label="Название">
						<Input {...register("name")} />
					</Field>
					<Field label="Направление подготовки">
						<CustomMultipleSelectField
							control={control}
							name={"fieldOfStudyId"}
							options={fieldsOfStudy.map((f) => ({
								label: `${f.code} ${f.name}`,
								value: f.id,
							}))}
						/>
					</Field>
					<Field label="Студенты">
						<CustomMultipleSelectField
							control={control}
							name={"studentsIdList"}
							options={students.map((s) => ({
								label: s.fullName,
								value: s.id,
							}))}
							multiple
						/>
					</Field>
					<Button type="submit">Создать</Button>
				</VStack>
			</form>
		</AppPage>
	);
};

export default StudyGroupsPage;
