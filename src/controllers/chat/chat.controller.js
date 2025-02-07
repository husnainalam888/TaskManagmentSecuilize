import {
  createConversation,
  getUserConversations,
  addMessageToConversation,
  getConversationMessages,
} from "../../services/chat/chat.service.js";

export const createConversationController = async (req, res) => {
  try {
    const { participantIds } = req.body;
    const newConversation = await createConversation(participantIds);
    res.status(201).json(newConversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating conversation" });
  }
};

export const getUserConversationsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await getUserConversations(userId);
    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user conversations" });
  }
};

export const addMessageToConversationController = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { content, receiverId } = req.body;
    const senderId = req.user.id;
    const newMessage = await addMessageToConversation(
      conversationId,
      content,
      senderId,
      receiverId
    );
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding message to conversation" });
  }
};

export const getConversationMessagesController = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await getConversationMessages(conversationId);
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching conversation messages" });
  }
};