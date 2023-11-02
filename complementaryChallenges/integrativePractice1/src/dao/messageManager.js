import MessageModel from "../models/messageModel.js";
import { Exception } from "../utilities.js";

export default class MessagesManager{
    static getMessages (query = {}) {
        return MessageModel.find(query)
    }

    static async createMessage (data) {
        const { user, message } = data;
        try {
            const newMessage = new MessageModel({ user, message });
            const sendMessage = await newMessage.save();
            console.log('Mensaje enviado');
            return sendMessage
        } catch (error) {
            throw new Exception(`Error en servidor: ${error.message}`, 500);
        }
    }
}