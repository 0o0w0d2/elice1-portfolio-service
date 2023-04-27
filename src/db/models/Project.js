import { ProjectModel } from '../schemas/project';


// 프로젝트 생성
const createProject = async ({ userId, title, startDate, endDate, description, projectId }) => {
    const createdNewProject = await ProjectModel.create({
        userId,
        title,
        startDate, 
        endDate, 
        description, 
        projectId,
    });
    return createdNewProject;
};

// id에 맞는 프로젝트 전체 조회
const findProjectById = async ( userId ) => {
    return await ProjectModel.find({ userId });
};

// projectId를 통해 프로젝트 조회
const findProjectByProjectId = async (projectId) => {
    return await ProjectModel.findOne({ projectId: projectId });
};

// projectId를 통해 프로젝트 수정             
const updateProject = async ({ projectId, updateValues }) => {

    const updatedProject = await ProjectModel.findOneAndUpdate({ projectId }, 
        { updateValues });  
    return updatedProject;
};

// projectId를 통해 프로젝트 삭제
const deleteProject = async (projectId) => {

    const deletedProject = await ProjectModel.findOneAndDelete({ projectId });
           
    return deletedProject;
};

export default { createProject, findProjectById, findProjectByProjectId, updateProject, deleteProject };