import {UUID} from "node:crypto";

export enum FormOfStudy {
    FullTime,
    PartTime,
    DistanceLearning
}

interface FieldOfStudy {
    id: UUID;
    code: string;
    name: string;
    specialization: string;
    formOfStudy: FormOfStudy;
}

export default FieldOfStudy;