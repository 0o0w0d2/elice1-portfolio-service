import Project from '../db/models/Project';


// id를 통해 프로젝트 전체 조회
const getProjectById = (userId) => {
    
    return Project.findProjectById(userId);
}

// projectId를 통해 프로젝트 조회
const getProjectByProjectId = (_id) => {
    
    return Project.findProjectByProjectId(_id)
}


// 프로젝트 생성
const addProject = async ({ userId, title, startDate, endDate, description }) => {

    const newProject = await Project.createProject({
        userId,
        title, 
        startDate, 
        endDate, 
        description,
    });

    return newProject;

}


// 프로젝트 수정
const editProject = async ({ _id, updateValues }) => {

    const { title, startDate, endDate, description } = updateValues;

    const editValues = {
        title,
        startDate,
        endDate,
        description,
    }

    return Project.updateProject( { _id, editValues } )
}


// 프로젝트 삭제
const delProject = async (_id) => {
    

    return Project.deleteProject(_id)
};

export default { getProjectById, getProjectByProjectId, addProject, editProject, delProject };
