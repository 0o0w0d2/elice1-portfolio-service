import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  messages: [MessageSchema],
});

const ChatModel = model('Chat', ChatSchema);

export { ChatModel };
