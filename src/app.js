import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

import { userAuthRouter } from './routers/userRouter';
import { educationRouter } from './routers/educationRouter';
import { awardRouter } from './routers/awardRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { projectRouter } from './routers/projectRouter';
import { certificationRouter } from './routers/certificationRouter';
import { commentRouter } from './routers/commentRouter';
import { imageRouter } from './routers/imageRouter';

import { ChatModel } from './db/schemas/chat';
import { chatRouter } from './routers/chatRouter';

const app = express();

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
io.on('connection', (socket) => {
  console.log('사용자가 접속했습니다. ', socket.id);

  // 채팅방 들어가기
  socket.on('joinRoom', ({ senderId, receiverId }) => {
    const roomId = [senderId, receiverId].sort().join('-');
    console.log('roomid', roomId);
    socket.join(roomId);
  });

  // socket.on('chatMessage', async ({ senderId, receiverId, message }) => {
  //   const roomId = [senderId, receiverId].sort().join('-');
  //   const chat = new ChatModel({
  //     roomId,
  //     senderId,
  //     receiverId,
  //     message,
  //   });

  //   await chat.save();
  //   io.to(roomId).emit('newMessage', {
  //     senderId: senderId,
  //     receiverId: receiverId,
  //     message: message,
  //   });
  // });
  socket.on('chatMessage', async ({ senderId, receiverId, message }) => {
    const roomId = [senderId, receiverId].sort().join('-');
    const query = { roomId: roomId };
    const update = { $push: { messages: { senderId, receiverId, message } } };
    const options = { new: true, upsert: true };

    const chat = await ChatModel.findOneAndUpdate(query, update, options);
    io.to(roomId).emit('newMessage', {
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });
  });

  socket.on('disconnect', () => {
    console.log('사용자 접속이 해제되었습니다.', socket.id);
  });
});

// 기본 페이지
app.get('/', (req, res) => {
  res.send('안녕하세요, 레이서 프로젝트 API 입니다.');
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use([
  userAuthRouter,
  educationRouter,
  awardRouter,
  projectRouter,
  certificationRouter,
  commentRouter,
  imageRouter,
  chatRouter,
]);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { server, app };
