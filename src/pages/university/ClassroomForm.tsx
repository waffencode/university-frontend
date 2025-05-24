import Classroom from "@/entities/domain/Classroom";
import { ApiContext } from "@/service/ApiProvider";
import { Box, Button, Field, Input } from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";

const ClassroomForm: React.FC = () => {
	const apiContext = useContext(ApiContext);
	const { register, handleSubmit } = useForm<Classroom>({
		defaultValues: { id: v4() as UUID, designation: "" },
	});

	const onSubmit = async (data: Classroom) => {
		await apiContext.classroom.create(data);
	};

	return (
		<Box as="form" onSubmit={handleSubmit(onSubmit)}>
			<Field.Root>
				<Field.Label>Название аудитории</Field.Label>
				<Input {...register("designation")} />
			</Field.Root>
			<Button type="submit" mt={4}>
				Создать аудиторию
			</Button>
		</Box>
	);
};

export default ClassroomForm;
