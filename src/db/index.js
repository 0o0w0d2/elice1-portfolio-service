import mongoose from 'mongoose';
import { User } from './models/User';
import { Education } from './models/Education';
import Project from './models/Project';
import { Award } from './models/Award';
import Certification from './models/Certification';
import { Comment } from './models/Comment';

const DB_URL =
  process.env.MONGODB_URL ||
  'MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.';
mongoose.connect(DB_URL);
const db = mongoose.connection;

// check for test.
db.once('open', async () => {
  await console.log('Successfully connected to MongoDB server');
});

db.on('connected', () =>
  console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL)
);
db.on('error', (error) =>
  console.error('MongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error)
);

export { User, Education, Project, Award, Certification, Comment };
