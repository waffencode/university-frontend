import FieldsOfStudyView from "@/pages/classes/field-of-study/FieldsOfStudyView";
import { Button, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppPage from "../../components/AppPage";
import SubjectWorkProgramsView from "./subject-work-program/SubjectWorkProgramsView";
import SubjectsView from "./subject/SubjectsView";

const ClassesPage: React.FC = () => {
	const navigate = useNavigate();
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	return (
		<AppPage title="Занятия">
			<VStack gap={4} align={"left"} w={isMobile ? "100%" : "70%"}>
				<Heading size={"lg"}>Формирование расписания</Heading>
				<HStack gap={4}>
					<Button onClick={() => navigate("./scheduling")}>Перейти...</Button>
				</HStack>
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
