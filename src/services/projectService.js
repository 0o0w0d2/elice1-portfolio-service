import { Project } from '../db';


// id를 통해 프로젝트 전체 조회
export const getProjectById = (userId) => {
    
    return Project.findProjectById(userId);
}

// projectId를 통해 프로젝트 조회
export const getProjectByProjectId = (projectId) => {
    
    return Project.findProjectByProjectId(projectId)
}


// 프로젝트 생성
export const addProject = async ({ userId, title, startDate, endDate, description, projectId }) => {

    const newProject = await Project.createProject({
        userId,
        title, 
        startDate, 
        endDate, 
        description, 
        projectId
    });

    return newProject;

}


// 프로젝트 수정
export const editProject = async ({ projectId, updateValues }) => {

    const { title, startDate, endDate, description } = updateValues;

    const project = await Project.findProjectByProjectId(projectId);

    const editValues = {
        title,
        startDate,
        endDate,
        description,
    }

    return Project.updateProject( { projectId, editValues } )
}


// 프로젝트 삭제
export const delProject = async (projectId) => {
    
    const project = await Project.findProjectByProjectId(projectId);

    if (!project) {
        throw new Error("해당 프로젝트가 없습니다.")
    }

    if (project.userId !== userId ) {
        throw new Error("권한이 없습니다.")
    }

    return Project.deleteProject(projectId)
};