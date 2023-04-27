import { ProjectModel } from '../schemas/project';


// 프로젝트 생성
const createProject = async ({ userId, title, startDate, endDate, description }) => {
    const createdNewProject = await ProjectModel.create({
        userId,
        title,
        startDate, 
        endDate, 
        description, 
    });
    return createdNewProject;
};

// id에 맞는 프로젝트 전체 조회
const findProjectById = async ( userId ) => {
    return await ProjectModel.find({ userId });
};

// projectId를 통해 프로젝트 조회
const findProjectByProjectId = async (_id) => {
    return await ProjectModel.findOne({ _id });
};

// projectId를 통해 프로젝트 수정             
const updateProject = async ({ _id, updateValues }) => {

    const updatedProject = await ProjectModel.findOneAndUpdate({ _id }, 
        { updateValues });  
    return updatedProject;
};

// projectId를 통해 프로젝트 삭제
const deleteProject = async (_id) => {

    const deletedProject = await ProjectModel.findOneAndDelete({ _id });
           
    return deletedProject;
};

export default { createProject, findProjectById, findProjectByProjectId, updateProject, deleteProject };
