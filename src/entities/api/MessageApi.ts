import config from '../../config.json';
import {UUID} from "node:crypto";
import Message from "../domain/Message";
import axios from "axios";

class MessageApi {
    serverUrl = config.serverUrl || '';

    async getMessages(userId: UUID): Promise<Message[]> {
        const response = await axios.get(this.serverUrl + "/Message/" + userId.toString(), {withCredentials: true});
        let messages: Message[] = [];
        response.data.forEach((element: Message) => messages.push({
            id: element.id,
            topic: element.topic,
            text: element.text,
            date: element.date,
            isImportant: element.isImportant,
            sender: element.sender,
            receivers: element.receivers,
            receiversStudyGroup: element.receiversStudyGroup,
        }));

        return messages;
    }

    async sendMessage(message: Message): Promise<void> {
        return await axios.post(this.serverUrl + "/Message/", message, { withCredentials: true });
    }
}

export default MessageApi;