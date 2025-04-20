import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { ClassType } from "@/entities/domain/ScheduleClass";
import Subject from "@/entities/domain/Subject";
import { SubjectWorkProgram } from "@/entities/domain/SubjectWorkProgram";
import { ApiContext } from "@/service/ApiProvider";
import {
	createListCollection,
	Heading,
	HStack,
	Input,
	ListCollection,
	Portal,
	Select,
	Table,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { UUID } from "node:crypto";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

interface PlannedClassData {
	theme?: string;
	hours?: number;
	classType: string[];
}

interface SubjectWorkProgramFormData {
	subject?: UUID[];
	classes?: PlannedClassData[];
}

interface SubjectWorkProgramFormProps {
	subjectWorkProgram?: SubjectWorkProgram;
}

const classTypes = createListCollection({
	items: [
		{ label: "Лекция", value: "0" },
		{ label: "Лабораторная работа", value: "1" },
		{ label: "Практическая работа", value: "2" },
		{ label: "Экзамен", value: "3" },
	],
});

const SubjectWorkProgramForm: React.FC<SubjectWorkProgramFormProps> = (
	props: SubjectWorkProgramFormProps,
) => {
	const prefillSubjectWorkProgram = props?.subjectWorkProgram;
	const isEditMode: boolean = !!props.subjectWorkProgram;
	const { register, handleSubmit, control } =
		useForm<SubjectWorkProgramFormData>({
			defaultValues: isEditMode
				? {
						subject: [prefillSubjectWorkProgram?.subject.id],
						classes: prefillSubjectWorkProgram?.classes.map(
							(c) => ({
								theme: c.theme,
								hours: c.hours,
								classType: [Number(c.classType).toString()],
							}),
						),
					}
				: {},
		});
	const navigate = useNavigate();
	const apiContext = useContext(ApiContext);
	const [subjects, setSubjects] = useState<ListCollection>(
		createListCollection({ items: [{ label: "", value: v4() as UUID }] }),
	);
	const addNewClass = () => {
		append({
			theme: "",
			hours: 0,
			classType: ["0"],
		} as PlannedClassData);
	};
	const { fields, append, remove } = useFieldArray({
		control,
		name: "classes",
	});

	const [fetchedSubjects, setFetchedSubjects] = useState<Subject[]>([]);

	const convertWorkProgramFormToEntity = (
		formData: SubjectWorkProgramFormData,
	): SubjectWorkProgram => {
		const workProgramId: UUID =
			prefillSubjectWorkProgram?.id || (v4() as UUID);
		const fetchedSubject = fetchedSubjects.find(
			(s) => s.id === formData.subject?.at(0),
		);

		return {
			id: workProgramId,
			subject: fetchedSubject || throwError("Subject is required"),
			classes: (formData.classes || []).map((classData) => ({
				id:
					prefillSubjectWorkProgram?.classes?.find(
						(c) => c.theme === classData.theme,
					)?.id || (v4() as UUID),
				theme: classData.theme || "",
				hours: classData.hours || 0,
				classType: Number(
					classData.classType?.[0] ||
						throwError("ClassType is required"),
				) as ClassType,
			})),
		};
	};

	function throwError(message: string): never {
		throw new Error(message);
	}

	const onSubmit = async (data: SubjectWorkProgramFormData) => {
		const entity = convertWorkProgramFormToEntity(data);
		if (isEditMode) {
			await apiContext.subjectWorkProgram.update(entity);
		} else {
			await apiContext.subjectWorkProgram.create(entity);
		}

		toaster.create({
			title: "Данные успешно сохранены",
			type: "success",
		});

		navigate(`/classes/subjectWorkPrograms/view/${entity.id.toString()}`);
	};

	useEffect(() => {
		const fetchSubjects = async () => {
			const subjectsArray = await apiContext.subject.getSubjects();
			setFetchedSubjects(subjectsArray);

			setSubjects(
				createListCollection({
					items: subjectsArray.map((subject) => ({
						label: subject.name,
						value: subject.id,
					})),
				}),
			);
		};

		fetchSubjects().catch(console.error);
	}, []);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<VStack gap={4} align="left">
					<Field label="Дисциплина">
						<Controller
							control={control}
							name="subject"
							render={({ field }) => (
								<Select.Root
									name={field.name}
									value={field.value}
									onValueChange={({ value }) =>
										field.onChange(value)
									}
									defaultValue={[
										prefillSubjectWorkProgram?.subject.id.toString() ||
											"",
									]}
									onInteractOutside={() => field.onBlur()}
									required
									collection={subjects}
								>
									<Select.HiddenSelect />
									<Select.Control>
										<Select.Trigger>
											<Select.ValueText placeholder="Выберите дисциплину" />
										</Select.Trigger>
										<Select.IndicatorGroup>
											<Select.Indicator />
										</Select.IndicatorGroup>
									</Select.Control>
									<Portal>
										<Select.Positioner>
											<Select.Content>
												{subjects.items.map((item) => (
													<Select.Item
														item={item}
														key={item.value}
													>
														{item.label}
													</Select.Item>
												))}
											</Select.Content>
										</Select.Positioner>
									</Portal>
								</Select.Root>
							)}
						/>
					</Field>
					<Heading>Тематический план</Heading>

					<HStack gap={4}>
						<Button
							type="button"
							onClick={addNewClass}
							style={{ marginTop: "16px" }}
						>
							<LuPlus /> Добавить занятие
						</Button>
					</HStack>

					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.ColumnHeader>№ п/п</Table.ColumnHeader>
								<Table.ColumnHeader>Тема</Table.ColumnHeader>
								<Table.ColumnHeader>Часы</Table.ColumnHeader>
								<Table.ColumnHeader>Тип</Table.ColumnHeader>
								<Table.ColumnHeader>
									Действия
								</Table.ColumnHeader>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{fields.map((field, index) => (
								<Table.Row key={field.id}>
									<Table.Cell>{index + 1}</Table.Cell>
									<Table.Cell>
										<Field>
											<Textarea
												autoresize
												{...register(
													`classes.${index}.theme`,
												)}
												placeholder="Введите тему"
											/>
										</Field>
									</Table.Cell>
									<Table.Cell>
										<Field>
											<Input
												type="number"
												min={1}
												max={216}
												{...register(
													`classes.${index}.hours`,
													{
														valueAsNumber: true,
													},
												)}
											/>
										</Field>
									</Table.Cell>
									<Table.Cell>
										<Controller
											name={`classes.${index}.classType`}
											control={control}
											render={({ field }) => (
												<Select.Root
													name={field.name}
													value={field.value}
													onValueChange={(value) => {
														field.onChange(
															value.value,
														);
													}}
													onInteractOutside={() =>
														field.onBlur()
													}
													collection={classTypes}
												>
													<Select.HiddenSelect />
													<Select.Control>
														<Select.Trigger>
															<Select.ValueText placeholder="Тип занятия..." />
														</Select.Trigger>
														<Select.IndicatorGroup>
															<Select.Indicator />
														</Select.IndicatorGroup>
													</Select.Control>
													<Portal>
														<Select.Positioner>
															<Select.Content>
																{classTypes.items.map(
																	(item) => (
																		<Select.Item
																			key={
																				item.value
																			}
																			item={
																				item
																			}
																		>
																			{
																				item.label
																			}
																		</Select.Item>
																	),
																)}
															</Select.Content>
														</Select.Positioner>
													</Portal>
												</Select.Root>
											)}
										/>
									</Table.Cell>
									<Table.Cell>
										<Button
											type="button"
											variant="surface"
											colorPalette="red"
											onClick={() => remove(index)}
										>
											Удалить
										</Button>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Root>

					<HStack gap={2}>
						<Button variant="surface" onClick={() => navigate(-1)}>
							Назад
						</Button>
						<Button type="submit">
							{isEditMode ? "Сохранить" : "Добавить"}
						</Button>
					</HStack>
				</VStack>
			</form>
		</>
	);
};

export default SubjectWorkProgramForm;
