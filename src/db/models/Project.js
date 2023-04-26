import { ProjectModel } from '../schemas/project';


// 프로젝트 생성
export const createProject = async ({userId, title, startDate, endDate, description, url, projectId}) => {
    const createdNewProject = await ProjectModel.create({
        userId,
        title,
        startDate, 
        endDate, 
        description, 
        url, 
        projectId,
    });
    return createdNewProject;
}

// id에 맞는 프로젝트 전체 조회
export const findProjectById = async (id) => {
    return await ProjectModel.find({ id: id });
};

// projectId를 통해 프로젝트 조회
export const findProjectByProjectId = async (projectId) => {
    return await ProjectModel.findOne({ projectId: projectId });
};

// projectId를 통해 프로젝트 수정                만들 때랑은 다르게 여긴 객체 구조화 사용
export const updateProject = async ({ projectId, updateValues }) => {
    // 프로젝트아이디를 통해서 값을 찾아서 그 값을 변경
    // updateOne 사용
    const updatedProject = await ProjectModel.updateOne({ projectId }, 
        { $set: updateValues });   // mongodb 쿼리파라미터? 중 값을 바꾸기 위해서 $set: 뒤에 바꿀 값

    return updatedProject;
};

// projectId를 통해 프로젝트 삭제
export const deleteProject = async (projectId) => {
    // 프로젝트아이디를 통해서 값을 찾아서 그 값을 삭제
    // deleteOne 사용
    const deletedProject = await ProjectModel.deleteOne({ projectId });
    
    return deletedProject;
};


