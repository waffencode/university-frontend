import Subject from "@/entities/domain/Subject";
import { ApiContext } from "@/service/ApiProvider";
import { Button, Field, HStack, Input, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

interface SubjectFormData {
	name: string;
}

interface SubjectFormProps {
	subject?: Subject;
}

const SubjectForm: React.FC<SubjectFormProps> = (props: SubjectFormProps) => {
	const { register, handleSubmit } = useForm<SubjectFormData>();
	const navigate = useNavigate();
	const subject = props.subject;
	const apiContext = useContext(ApiContext);
	const isEditMode = !!subject;

	const onSubmit = async (data: SubjectFormData) => {
		const newSubject = convertFormDataToSubject(data);

		if (subject) {
			await apiContext.subject.updateSubject(newSubject);
		} else {
			await apiContext.subject.createSubject(newSubject);
		}

		navigate("/classes");
	};

	const convertFormDataToSubject = (formData: SubjectFormData): Subject => {
		return {
			id: subject?.id || v4(),
			name: formData.name,
		} as Subject;
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<VStack gap={8} align="left" width="40%">
					<Field.Root>
						<Field.Label>Наименование дисциплины</Field.Label>
						<Input
							id="name"
							{...register("name")}
							defaultValue={subject?.name}
							placeholder="Название дисциплины"
							type="text"
							maxLength={50}
						/>
					</Field.Root>
					<HStack gap={2}>
						<Button variant="surface" onClick={() => navigate("/classes")}>
							Назад
						</Button>
						<Button type="submit">{isEditMode ? "Сохранить" : "Добавить"}</Button>
					</HStack>
				</VStack>
			</form>
		</>
	);
};

export default SubjectForm;
