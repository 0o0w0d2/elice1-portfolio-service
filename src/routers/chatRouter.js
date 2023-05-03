import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import asyncHandler from '../utils/asyncHandler';

import { ChatModel } from '../db/schemas/chat';

const chatRouter = Router();
chatRouter.post(
  '/chat',
  login_required,
  asyncHandler(async (req, res) => {
    const { senderId, receiverId, message, roomId } = req.body;

    const chat = await ChatModel.findOne({ roomId });
    if (!chat) {
      const newChat = new ChatModel({
        roomId,
        messages: [{ senderId, receiverId, message }],
      });
      await newChat.save();
      return res.status(201).json({ chat: newChat });
    } else {
      chat.messages.push({ senderId, receiverId, message });
      await chat.save();
      return res.status(201).json({ chat });
    }
  })
);

chatRouter.get(
  '/chat/:roomId',
  login_required,
  asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const chat = await ChatModel.findOne({ roomId });
    if (!chat) {
      return res.status(404).json({ message: 'Chat room not found' });
    }
    return res.status(200).json({ messages: chat.messages });
  })
);

chatRouter.delete(
  '/chat/:roomId',
  login_required,
  asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    await ChatModel.deleteOne({ roomId });
    res.status(204).json({ message: 'The Chat is successfully closed.' });
  })
);

export { chatRouter };
