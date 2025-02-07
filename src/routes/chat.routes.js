import express from 'express';
import {
  createConversation,
  getUserConversations,
  addMessageToConversation,
  getConversationMessages,
} from '../controllers/chat/chat.controller.js';

const router = express.Router();

router.post('/conversations', createConversation);
router.get('/conversations', getUserConversations);
router.post('/conversations/:conversationId/messages', addMessageToConversation);
router.get('/conversations/:conversationId/messages', getConversationMessages);

export default router;