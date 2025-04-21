import AppPage from "@/components/AppPage";
import { Button } from "@/components/ui/button";
import ScheduleClass from "@/entities/domain/ScheduleClass";
import { ApiContext } from "@/service/ApiProvider";
import { UUID } from "node:crypto";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ClassPage = () => {
	const scheduleClassId = useParams().scheduleClassId as UUID;
	const navigate = useNavigate();
	const apiContext = useContext(ApiContext);

	const [scheduleClass, setScheduleClass] = useState<ScheduleClass>();

	useEffect(() => {
		const loadData = async () => {
			const response =
				await apiContext.scheduleClass.getScheduleClassById(
					scheduleClassId,
				);

			const studyGroups = Promise.all(
				(await apiContext.studyGroup.getAll())
					.filter((s) => response.groupsId.includes(s.id))
					.map(async (s) => ({
						id: s.id,
						name: s.name,
						students: (await apiContext.user.getAllUsers()).filter(
							(u) => s.studentsIdList.includes(u.id),
						),
						fieldOfStudy: await apiContext.fieldOfStudy.getById(
							s.fieldOfStudyId,
						),
					})),
			);

			const entity = {
				id: response.id,
				name: response.name,
				teacher: await apiContext.user.getUser(response.teacherId),
				date: new Date(response.date),
				timeSlot: await apiContext.classTimeSlots.getById(
					response.timeSlotId,
				),
				classroom: await apiContext.classroom.getById(
					response.classroomId,
				),
				subjectWorkProgram: await apiContext.subjectWorkProgram.getById(
					response.subjectWorkProgramId,
				),
				classType: response.classType,
				groups: await studyGroups,
			};

			setScheduleClass(entity);
		};

		loadData();
	}, []);

	return (
		<AppPage title="Журнал занятия">
			<>
				<pre
					style={{
						whiteSpace: "pre-wrap",
						wordWrap: "break-word",
						background: "white",
						padding: "1rem",
						borderRadius: "4px",
						marginTop: "1rem",
					}}
				>
					{JSON.stringify(scheduleClass, null, 2)}
				</pre>
				<Button variant="surface" onClick={() => navigate("/schedule")}>
					Назад
				</Button>
			</>
		</AppPage>
	);
};

export default ClassPage;
