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

    async getById(id: UUID): Promise<Subject> {
        const response = await axios.get(this.serverUrl + "/Subject/" + id.toString(), {withCredentials: true});
        return response.data;
    }

    async updateSubject(subject: Subject): Promise<void> {
        await axios.put(this.serverUrl + "/Subject/" + subject.id.toString(), subject, {withCredentials: true});
    }

    async createSubject(subject: Subject): Promise<void> {
        return await axios.post(this.serverUrl + "/Subject/", subject, { withCredentials: true });
    }

    async deleteSubject(id: UUID): Promise<void> {
        return await axios.delete(this.serverUrl + "/Subject/" + id.toString(), { withCredentials: true });
    }
}

export default SubjectApi;