import React from "react";
import SubjectWorkProgramForm from "@/pages/classes/subject-work-program/SubjectWorkProgramForm";
import AppPage from "@/components/AppPage";

const CreateSubjectWorkProgramPage: React.FC = () => {
	return (
		<AppPage title="Добавить рабочую программу дисциплины">
			<SubjectWorkProgramForm />
		</AppPage>
	);
};

export default CreateSubjectWorkProgramPage;
