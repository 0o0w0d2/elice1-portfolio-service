import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { educationService } from '../services/educationService';
import asyncHandler from '../utils/asyncHandler';

const educationRouter = Router();
// 기본적으로 유저 아이디 URI로 라우팅, 본인이든 다른 유저이든
// 변수명이 userId 인 이유는 각 education마다 id속성이 있기때문에 구분하기 위해
educationRouter.get(
    '/education/:userId',
    login_required,
    asyncHandler( async (req, res, next)=>{
        const { userId } = req.params;
        const educationList = await educationService.getEducation({userId});
        if (educationList.errorMessage){
            throw new Error(educationList.errorMessage);
        };
        res.status(200).send(educationList);
    })
);
// 학력 추가는 post 메소드로 /add 로 보냄. education = {UserId,학교명,전공,졸업상태}
educationRouter.post(
    '/education/:userId/add',
    login_required,
    asyncHandler(async (req, res, next)=>{
        const { userId } = req.params;
        if(userId != req.currentUserId){
            throw new Error('권한이 없습니다');
        };
        const { schoolName, major, graduationTypeCode } = req.body;
        const education = { userId, schoolName, major, graduationTypeCode };
        const addNewEducation = await educationService.addEducation({education});
        res.status(201).send(addNewEducation);
    })
);
// 변경은 put 메소드로 /edit 으로 education = { _id(학력),학교명,전공,졸업상태}
educationRouter.patch(
    '/education/:userId/edit',
    login_required,
    asyncHandler(async (req, res, next)=>{
        const { userId } = req.params;
        if(userId != req.currentUserId){
            throw new Error('권한이 없습니다');
        };
        const { _id, schoolName, major, graduationTypeCode } = req.body;
        const education = { _id, schoolName, major, graduationTypeCode };
        const editEducation = await educationService.editEducation({education});
        if (editEducation.errorMessage){
            throw new Error(editEducation.errorMessage);
        };
        res.status(200).send(editEducation);
    })
);
// 삭제는 delete 메소드로 /delete 로
educationRouter.delete(
    '/education/:userId/delete',
    login_required,
    asyncHandler(async (req, res, next)=>{
        const { userId } = req.params;
        if(userId != req.currentUserId){
            throw new Error('권한이 없습니다');
        };
        const { _id } = req.body;
        const deleteEducation = await educationService.removeEducation({_id});
        if (deleteEducation.errorMessage){
            throw new Error(deleteEducation.errorMessage);
        };
        res.status(200).send(deleteEducation);
    })
);



export { educationRouter };