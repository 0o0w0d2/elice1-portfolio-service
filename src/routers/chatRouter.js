import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import asyncHandler from '../utils/asyncHandler';

// remove later
import { ChatModel } from '../db/schemas/chat';

const chatRouter = Router();

chatRouter.post(
  '/chat',
  login_required,
  asyncHandler(async (req, res) => {
    const { senderId, receiverId, message } = req.body;
    const chat = new ChatModel({
      senderId,
      receiverId,
      message,
    });

    await chat.save();
    res.status(201).json({ chat });
  })
);

chatRouter.get(
  '/chat/:senderId/:receiverId',
  login_required,
  asyncHandler(async (req, res) => {
    const { senderId, receiverId } = req.params;
    const message = await ChatModel.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ message });
  })
);

chatRouter.delete(
  '/chat/:id',
  login_required,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await ChatModel.findOneAndDelete({ id });
    res.status(204).json({ message: 'The Chat is successfully closed.' });
  })
);

export { chatRouter };
