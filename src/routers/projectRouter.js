import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { projectService } from '../services/projectService';
import asyncHandler from '../utils/asyncHandler';

const projectRouter = Router();

projectRouter.get('/project/:userId', login_required, asyncHandler( async (req, res, next)=>{
        
        const userId = req.params.userId;
        const projectList = await projectService.getProject({userId});
        
        if (projectList.errorMessage){
            throw new Error(projectList.errorMessage);
        };
        
        res.status(200).send(projectList);
    })
);

projectRouter.post('/project', login_required, asyncHandler(async (req, res, next)=>{
        const userId = req.currentUserId;
        const { title, description, startDate, endDate } = req.body;
        const project = { userId, title, description, startDate, endDate };
        
        const addNewProject = await projectService.addProject({project});
        
        res.status(201).send(addNewProject);
    })
);

projectRouter.put('/project/:_id', login_required, asyncHandler(async (req, res, next)=>{
        const userId = req.currentUserId;
        const _id = req.params._id;
        const { title, description, startDate, endDate } = req.body;
        const project = { userId, _id, title, description, startDate, endDate };
        
        if (!title || !startDate || !endDate ) {
            throw new Error("프로젝트 제목이나 날짜가 입력되어 있는지 확인해주세요.")
        }


        const editProject = await projectService.editProject({project});
        
        if (editProject.errorMessage){
            throw new Error(editProject.errorMessage);
        };
        
        res.status(200).send(editProject);
    })
);

projectRouter.delete('/project/:_id', login_required, asyncHandler(async (req, res, next)=>{
        const userId = req.currentUserId;
        const _id = req.params._id;
        
        const deleteProject = await projectService.removeProject({ userId, _id });
        
        if (deleteProject.errorMessage){
            throw new Error(deleteProject.errorMessage);
        };
        
        res.status(200).send(deleteProject);
    })
);



export { projectRouter };
