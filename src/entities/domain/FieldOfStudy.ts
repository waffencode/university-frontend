import { createListCollection } from "@chakra-ui/react";
import { UUID } from "node:crypto";

export enum FormOfStudy {
	FullTime,
	PartTime,
	DistanceLearning,
}

export const FormOfStudyListCollection = createListCollection({
	items: [
		{
			key: FormOfStudy.FullTime,
			label: "Очная",
			value: FormOfStudy.FullTime,
		},
		{
			key: FormOfStudy.PartTime,
			label: "Очно-заочная",
			value: FormOfStudy.PartTime,
		},
		{
			key: FormOfStudy.DistanceLearning,
			label: "Заочная",
			value: FormOfStudy.DistanceLearning,
		},
	],
});

interface FieldOfStudy {
	id: UUID;
	code: string;
	name: string;
	specialization: string;
	formOfStudy: FormOfStudy;
}

export default FieldOfStudy;
