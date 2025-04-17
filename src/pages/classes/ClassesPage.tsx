import { Button } from "@/components/ui/button";
import FieldsOfStudyView from "@/pages/classes/field-of-study/FieldsOfStudyView";
import { Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppPage from "../../components/AppPage";
import SubjectWorkProgramsView from "./subject-work-program/SubjectWorkProgramsView";
import SubjectsView from "./subject/SubjectsView";

const ClassesPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<AppPage title="Занятия">
			<VStack gap={4} align={"left"}>
				<Heading size={"lg"}>Формирование расписания</Heading>
				<Button onClick={() => navigate("./scheduling")}>
					Перейти...
				</Button>
				<Heading size={"lg"}>Рабочие программы дисциплин</Heading>
				<SubjectWorkProgramsView />
				<Heading size={"lg"}>Дисциплины</Heading>
				<SubjectsView />
				<Heading size={"lg"}>Направления подготовки</Heading>
				<FieldsOfStudyView />
			</VStack>
		</AppPage>
	);
};

export default ClassesPage;
