import {UUID} from "node:crypto";

interface Classroom {
    id: UUID;
    designation: string;
}

export default Classroom;