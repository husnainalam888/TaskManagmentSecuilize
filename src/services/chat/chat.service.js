import { Conversation, Message, User, ConversationParticipant } from '../../models/index.js';

class ChatService {
  static async createConversation(participantIds) {
    try {
      const newConversation = await Conversation.create({});
      await Promise.all(
        participantIds.map(async (userId) => {
          await ConversationParticipant.create({
            conversationId: newConversation.id,
            userId: userId,
          });
        })
      );
      return newConversation;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating conversation');
    }
  }

  static async getUserConversations(userId) {
    try {
      const conversations = await Conversation.findAll({
        include: [
          {
            model: User,
            as: 'participants',
            where: { id: userId },
            through: { attributes: [] },
          },
        ],
      });
      return conversations;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching user conversations');
    }
  }

  static async addMessageToConversation(conversationId, content, senderId, receiverId) {
    try {
      const newMessage = await Message.create({
        content,
        conversationId,
        senderId,
        receiverId
      });
      return newMessage;
    } catch (error) {
      console.error(error);
      throw new Error('Error adding message to conversation');
    }
  }

  static async getConversationMessages(conversationId) {
    try {
      const messages = await Message.findAll({
        where: { conversationId },
        include: [
          {
            model: User,
            as: 'sender',
            attributes: ['id', 'username'],
          },
          {
            model: User,
            as: 'receiver',
            attributes: ['id', 'username'],
          },
        ],
      });
      return messages;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching conversation messages');
    }
  }
}

export const createConversation = ChatService.createConversation.bind(ChatService);
export const getUserConversations = ChatService.getUserConversations.bind(ChatService);
export const addMessageToConversation = ChatService.addMessageToConversation.bind(ChatService);
export const getConversationMessages = ChatService.getConversationMessages.bind(ChatService);