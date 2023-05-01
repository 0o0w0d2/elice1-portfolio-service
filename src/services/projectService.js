import Project from '../db/models/Project';
import { checkPermissionInProject } from '../utils/validate';

const getAllProject = async ({ userId }) => {
  const projectList = await Project.findByUserId({ userId });

  return projectList;
};

const addProject = async ({ project }) => {
  const newProject = await Project.createProject({ project });

  return newProject;
};

const editProject = async ({ _id, newValues, userId }) => {
  // 권한 검사 : 로그인 유저와 DB주인 비교
  const errorMessage = await checkPermissionInProject(_id, userId);
  if (errorMessage) return errorMessage;

  const editedProject = await Project.updateProject({ _id, newValues });

  return editedProject;
};

const removeProject = async ({ _id, userId }) => {

  const errorMessage = await checkPermissionInProject(_id, userId);
  if (errorMessage) return errorMessage;

  const removedProject = await Project.deleteProject({ _id });

  return removedProject;
};

export default { getAllProject, addProject, editProject, removeProject };
