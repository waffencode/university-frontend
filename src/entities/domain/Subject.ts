import {UUID} from "node:crypto";

interface Subject {
    id: UUID;
    name: string;
}

export default Subject;