import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { projectService } from '../services/projectService';
import asyncHandler from '../utils/asyncHandler';

const projectRouter = Router();

projectRouter.get(
    '/project',
    login_required,
    asyncHandler( async (req, res, next)=>{
        const userId = req.currentUserId;
        const projectList = await projectService.getProject({userId});
        
        if (projectList.errorMessage){
            throw new Error(projectList.errorMessage);
        };
        
        res.status(200).send(projectList);
    })
);

projectRouter.post(
    '/project',
    login_required,
    asyncHandler(async (req, res, next)=>{
        
        const userId = req.currentUserId;
        const { title, description, startDate, endDate } = req.body;
        const project = { userId, title, description, startDate, endDate };
        
        const addNewProject = await projectService.addProject({project});
        
        res.status(201).send(addNewProject);
    })
);

projectRouter.patch(
    '/project:_id',
    login_required,
    asyncHandler(async (req, res, next)=>{
        const userId = req.currentUserId;
        const { _id, title, description, startDate, endDate } = req.body;
        const project = { userId, _id, title, description, startDate, endDate };
        
        const editProject = await projectService.editProject({project});
        
        if (editProject.errorMessage){
            throw new Error(editProject.errorMessage);
        };
        
        res.status(200).send(editProject);
    })
);

projectRouter.delete(
    '/project/:_id',
    login_required,
    asyncHandler(async (req, res, next)=>{
        const userId = req.currentUserId;
        const { _id } = req.params;
        
        const deleteProject = await projectService.removeProject({ userId, _id });
        
        if (deleteProjecterrorMessage){
            throw new Error(deleteProject.errorMessage);
        };
        
        res.status(200).send(deleteProject);
    })
);



export { projectRouter };
