import msgModel from "../../models/messages.schema.js";

export default class messagesManagerDB {
    getMessages = async () => {
        try {
          return await msgModel.find().lean();
        } catch (error) {
          return error;
        }
      }
    
  
    createMessage = async (message) => {
      if (message.user.trim() === '' || message.message.trim() === '') {
          // Evitar crear mensajes vacíos
          return null;
      }
  
      try {
          return await msgModel.create(message);
      } catch (error) {
          return error;
      }
  }
  
  deleteAllMessages = async () => {
    try {
        console.log("Deleting all messages...");
        const result = await msgModel.deleteMany({});
        console.log("Messages deleted:", result);
        return result;
    } catch (error) {
        console.error("Error deleting messages:", error);
        return error;
    }
}

  }