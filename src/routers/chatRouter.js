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
    console.log(senderId, receiverId, message, roomId);
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
    console.log('GET roomId:', roomId);
    const chat = await ChatModel.findOne({ roomId });
    console.log(chat);
    if (!chat) {
      return res.status(404).json({ message: 'Chat room not found' });
    }
    return res.status(200).json({ messages: chat.messages });
  })
);

chatRouter.get(
  '/chat/:roomId/:userId',
  login_required,
  asyncHandler(async (req, res) => {
    const { roomId, userId } = req.params;
    console.log('GET roomId:', roomId);
    const chat = await ChatModel.findOne({
      roomId,
      $or: [{ senderId: userId }, { receiverId: userId }],
    });
    console.log(chat);
    if (!chat) {
      return res.status(404).json({ message: 'Chat room not found' });
    }
    return res.status(200).json({ messages: chat.messages });
  })
);

chatRouter.get(
  '/chat/user/:userId',
  login_required,
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    console.log('GET chats for user:', userId);
    const chatRooms = await ChatModel.find({
      messages: {
        $elemMatch: {
          $or: [{ senderId: userId }, { receiverId: userId }],
        },
      },
    });
    console.log(chatRooms);
    if (!chatRooms || chatRooms.length === 0) {
      return res
        .status(404)
        .json({ message: 'No chats found for the specified user' });
    }
    return res.status(200).json({ chatRooms });
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
