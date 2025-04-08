import AppPage from "@/components/AppPage";
import { SubjectWorkProgram } from "@/entities/domain/SubjectWorkProgram";
import SubjectWorkProgramForm from "@/pages/classes/subject-work-program/SubjectWorkProgramForm";
import { ApiContext } from "@/service/ApiProvider";
import { UUID } from "node:crypto";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditSubjectWorkProgramPage: React.FC = () => {
	const id = useParams().subjectWorkProgramId as UUID;
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [subjectWorkProgram, setSubjectWorkProgram] =
		useState<SubjectWorkProgram>();
	const apiContext = useContext(ApiContext);

	useEffect(() => {
		const fetchData = async () => {
			const response = await apiContext.subjectWorkProgram.getById(id);
			setSubjectWorkProgram(response);
			setIsLoading(false);
		};

		fetchData();
	}, []);

	return (
		<AppPage title="Изменить рабочую программу дисциплины">
			{!isLoading && (
				<SubjectWorkProgramForm
					subjectWorkProgram={subjectWorkProgram}
				/>
			)}
		</AppPage>
	);
};

export default EditSubjectWorkProgramPage;
