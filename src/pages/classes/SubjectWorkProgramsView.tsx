import React from "react";
import {SubjectWorkProgram} from "../../entities/domain/SubjectWorkProgram";

const SubjectWorkProgramsView: React.FC = () => {
    const [subjectWorkPrograms, setSubjectWorkPrograms] = React.useState<SubjectWorkProgram[]>([]);

    return (
        <>
            {
                subjectWorkPrograms && subjectWorkPrograms.length === 0 && (
                    <div>Рабочие программы не найдены</div>
                )
            }
            { subjectWorkPrograms && subjectWorkPrograms.length > 0 ? (
                <div>Рабочие программы не найдены</div>
            ) : subjectWorkPrograms.map((subjectWorkProgram) => (
                <div key={subjectWorkProgram.id}>
                    <h2>{subjectWorkProgram.subject.name}</h2>
                </div>
            ))
            }
        </>
    );
}

export default SubjectWorkProgramsView;