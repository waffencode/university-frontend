import AppPage from "@/components/AppPage";
import FieldOfStudy from "@/entities/domain/FieldOfStudy";
import FieldOfStudyForm from "@/pages/classes/field-of-study/FieldOfStudyForm";
import { ApiContext } from "@/service/ApiProvider";
import { UUID } from "node:crypto";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditFieldOfStudyPage: React.FC = () => {
	const id: UUID | null = (useParams().fieldOfStudyId as UUID) || null;
	const apiContext = useContext(ApiContext);
	const [prefillData, setPrefillData] = React.useState<FieldOfStudy | null>(
		null,
	);

	useEffect(() => {
		const loadData = async () => {
			if (id) {
				const response = await apiContext.fieldOfStudy.getById(id);
				setPrefillData(response);
			} else {
				return;
			}
		};

		if (id) {
			loadData();
		}
	}, []);

	return (
		<AppPage title="Направление подготовки">
			{id && prefillData ? (
				<FieldOfStudyForm prefillData={prefillData} />
			) : (
				<FieldOfStudyForm />
			)}
		</AppPage>
	);
};

export default EditFieldOfStudyPage;
