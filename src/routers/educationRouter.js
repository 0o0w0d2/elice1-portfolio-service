import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { educationService } from '../services/educationService';
import asyncHandler from '../utils/asyncHandler';
import validateValue from '../utils/validateValue';

const educationRouter = Router();
// 다른 유저의 정보 얻는 부분 필요. req에 userId값 필요
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
// 학력 추가는 post 메소드, education = {UserId,schoolName:학교명,major:전공,graduationTypeCode:졸업상태}
educationRouter.post(
    '/education',
    login_required,
    asyncHandler(async (req, res, next)=>{
        const userId = req.currentUserId;
        const { schoolName, major, graduationTypeCode } = req.body;
        const education = { userId, schoolName, major, graduationTypeCode };
        
        validateValue(education);

        const addNewEducation = await educationService.addEducation({education});
        res.status(201).send(addNewEducation);
    })
);
// 변경은 patch 메소드, education = { _id:학력,schoolName:학교명,major:전공,graduationTypeCode:졸업상태}
educationRouter.patch(
    '/education',
    login_required,
    asyncHandler(async (req, res, next)=>{
        const userId = req.currentUserId;
        const { _id, schoolName, major, graduationTypeCode } = req.body;
        const education = { _id, schoolName, major, graduationTypeCode };
        
        validateValue(education);

        const editEducation = await educationService.editEducation({userId, education});
        if (editEducation.errorMessage){
            throw new Error(editEducation.errorMessage);
        };
        res.status(200).send(editEducation);
    })
);
// 삭제는 delete 메소드
educationRouter.delete(
    '/education/:_id',
    login_required,
    asyncHandler(async (req, res, next)=>{
        const userId = req.currentUserId;
        const { _id } = req.params;
        const deleteEducation = await educationService.removeEducation({ userId, _id });
        if (deleteEducation.errorMessage){
            throw new Error(deleteEducation.errorMessage);
        };
        res.status(200).send(deleteEducation);
    })
);

export { educationRouter };