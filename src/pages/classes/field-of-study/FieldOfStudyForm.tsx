import CustomSelectField from "@/components/CustomSelectField";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import FieldOfStudy, {
	FormOfStudy,
	FormOfStudyListCollection,
} from "@/entities/domain/FieldOfStudy";
import { ApiContext } from "@/service/ApiProvider";
import { Input, VStack } from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

interface IFieldOfStudyFormProps {
	prefillData?: FieldOfStudy;
}

const FieldOfStudyForm: React.FC<IFieldOfStudyFormProps> = ({
	prefillData,
}: IFieldOfStudyFormProps) => {
	const { control, register, handleSubmit, reset } = useForm<FieldOfStudy>({
		defaultValues: {
			id: prefillData?.id || (v4() as UUID),
			name: prefillData?.name || "",
			specialization: prefillData?.specialization || "",
			code: prefillData?.code || "",
			formOfStudy: prefillData?.formOfStudy || FormOfStudy.FullTime,
		},
	});
	const apiContext = useContext(ApiContext);
	const navigate = useNavigate();

	const onSubmit = async (data: FieldOfStudy) => {
		// Because the CustomSelectField returns the string as a field value.
		data.formOfStudy = Number(data.formOfStudy);

		if (prefillData) {
			await apiContext.fieldOfStudy.update(data);
		} else {
			await apiContext.fieldOfStudy.create(data);
		}

		toaster.create({
			type: "success",
			title: "Данные успешно сохранены!",
		});

		navigate("/classes");
	};

	useEffect(() => {
		// Reset cached form data when prefillData is loaded.
		if (prefillData?.id) {
			reset(prefillData);
		}
	}, [prefillData]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<VStack gap={2} align="left" w="50%">
				<Field label="Код">
					<Input {...register("code")} />
				</Field>
				<Field label="Название направления">
					<Input {...register("name")} />
				</Field>
				<Field label="Профиль (направленность)">
					<Input {...register("specialization")} />
				</Field>
				<Field label="Форма обучения">
					<CustomSelectField
						control={control}
						name={"formOfStudy"}
						options={FormOfStudyListCollection.items.map((i) => ({
							label: i.label,
							value: i.value.toString(),
						}))}
						defaultValue={prefillData?.formOfStudy}
					/>
				</Field>
				<Button type="submit">
					{prefillData ? "Сохранить" : "Добавить"}
				</Button>
			</VStack>
		</form>
	);
};

export default FieldOfStudyForm;
