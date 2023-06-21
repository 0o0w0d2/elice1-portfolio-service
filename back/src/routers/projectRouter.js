import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import projectService from '../services/projectService';
import asyncHandler from '../utils/asyncHandler';
import { validateValue } from '../utils/validate';

const projectRouter = Router();

projectRouter.get(
  '/project/:userId',
  login_required,
  asyncHandler(async (req, res, next) => {
    const userId = req.params.userId;
    const projectList = await projectService.getAllProject({ userId });

    if (projectList.errorMessage) {
      throw new Error(projectList.errorMessage);
    }

    res.status(200).send(projectList);
  })
);

projectRouter.post(
  '/project',
  login_required,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const { title, description, startDate, endDate } = req.body;
    const project = { userId, title, description, startDate, endDate };

    validateValue(project);

    const addNewProject = await projectService.addProject({ project });

    res.status(201).send(addNewProject);
  })
);

projectRouter.patch(
  '/project/:_id',
  login_required,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const _id = req.params._id;
    const { title, description, startDate, endDate } = req.body;

    const newValues = { title, description, startDate, endDate };

    validateValue(newValues);

    const editProject = await projectService.editProject({
      _id,
      newValues,
      userId,
    });

    if (editProject.errorMessage) {
      throw new Error(editProject.errorMessage);
    }

    res.status(200).send(editProject);
  })
);

projectRouter.delete(
  '/project/:_id',
  login_required,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const _id = req.params._id;

    const deleteProject = await projectService.removeProject({ _id, userId });

    if (deleteProject.errorMessage) {
      throw new Error(deleteProject.errorMessage);
    }

    res.status(200).send(deleteProject);
  })
);

export { projectRouter };
