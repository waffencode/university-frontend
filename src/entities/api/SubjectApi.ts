import config from "../../config.json";
import {UUID} from "node:crypto";
import Subject from "../domain/Subject.ts";
import axios from "axios";

class SubjectApi {
    serverUrl = config.serverUrl || '';

    async getSubjects(): Promise<Subject[]> {
        const response = await axios.get(this.serverUrl + "/Subject/", {withCredentials: true});
        let subjects: Subject[] = [];
        response.data.forEach((element: Subject) => subjects.push({
            id: element.id,
            name: element.name
        }));

        return subjects;
    }

    async createSubject(subject: Subject): Promise<void> {
        return await axios.post(this.serverUrl + "/Subject/", subject, { withCredentials: true });
    }
}

export default SubjectApi;