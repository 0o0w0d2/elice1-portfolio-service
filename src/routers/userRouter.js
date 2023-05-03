import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { userAuthService } from '../services/userService';
import asyncHandler from '../utils/asyncHandler';

const userAuthRouter = Router();

userAuthRouter.post(
  '/user/register',
  asyncHandler(async function (req, res, next) {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  })
);

userAuthRouter.post(
  '/user/login',
  asyncHandler(async function (req, res, next) {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  })
);

userAuthRouter.get(
  '/userlist',
  login_required,
  asyncHandler(async function (req, res, next) {
    // 전체 사용자 목록을 얻음
    const users = await userAuthService.getUsers();
    res.status(200).send(users);
  })
);

userAuthRouter.get(
  '/user/current',
  login_required,
  asyncHandler(async function (req, res, next) {
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const userId = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
      userId,
    });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  })
);

userAuthRouter.put(
  '/users/:id',
  login_required,
  asyncHandler(async function (req, res, next) {
    // URI로부터 사용자 id를 추출함.
    const userId = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const name = req.body.name ?? null;
    const email = req.body.email ?? null;
    const password = req.body.password ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { name, email, password, description };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedUser = await userAuthService.setUser({ userId, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).json(updatedUser);
  })
);

userAuthRouter.get(
  '/users/:id',
  login_required,
  asyncHandler(async function (req, res, next) {
    const userId = req.params.id;
    const currentUserInfo = await userAuthService.getUserInfo({ userId });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  })
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get('/afterlogin', login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

userAuthRouter.delete(
  '/user/:id/withdraw',
  login_required,
  async (req, res, next) => {
    const userId = req.currentUserId;
    const { id } = req.params;
    console.log(userId, id);

    if (userId !== id) {
      res.status(403).json({
        message: '권한이 없습니다.',
      });
    }

    const { user, errorMessage } = await userAuthService.removeUser({
      userId,
    });

    if (errorMessage) {
      res.status(404).json({ message: errorMessage });
    } else {
      res.status(200).json({
        message: '탈퇴가 성공적으로 이루어졌습니다.',
      });
    }
  }
);

export { userAuthRouter };
