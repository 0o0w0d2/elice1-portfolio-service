import { Router } from 'express';
import { login_required } from 'express';
import projectService from '../services/projectService';
import asyncHandler from '../utils/asyncHandler';


const projectRouter = Router();

// userId 기반 전체 조회
projectRouter.get('/', login_required, asyncHandler(async (req, res) => {
    
    const userId = req.currentUserId;

    const projectList = await projectService.getProjectById(userId);
    res.status(200).json(projectList);

}));


// // projectId 기반 조회
// projectRouter.get('/:projectId', login_required, asyncHandler(async (req, res) => {
    
//     const projectId = req.params.projectId;

    //projectService.getProjectByProjectId

   
// }));




// 프로젝트 생성
projectRouter.post('/', login_required, asyncHandler(async (req, res) => {
        
    // 스키마로 설정한 required: true인 값들에 대해서 확인
    if (!title || !startDate || !endDate) {
        throw new Error("필수 정보를 입력해주세요.")
    }

    const { title, startDate, endDate, description } = req.body;
    

    const newProject = await projectService.addProject({
        userId: req.currentUserId,
        title,
        startDate,
        endDate,
        description,
        projectId,
    })

    res.status(200).json(newProject);
   
}));


// 프로젝트 수정
projectRouter.patch('/:projectId', login_required, asyncHandler(async (req, res) => {
    const projectId = req.params.projectId;
    
    const project = projectService.getProjectByProjectId(projectId);

    if (req.currentUserId !== project.userId) {
        throw new Error("권한이 없습니다.")
    }

    const { title, startDate, endDate, description } = req.body;
    
    const updateValues = { title, startDate, endDate, description };
    

    const updatedProject = await projectService.editProject({projectId, updateValues})
    res.status(200).json(updatedProject);

    
}));


//프로젝트 삭제
projectRouter.delete('/:projectId', login_required, asyncHandler(async (req, res) => {
    
    const projectId = req.params.projectId;
    const userId = currentUserId;
    const project = projectService.getProjectByProjectId(projectId);

    if (userId !== project.userId) { 
        throw new Error("권한이 없습니다.")
    }

    const deletedProject = await projectService.delProject(projectId);
    res.status(200).json(deletedProject);
}));

export default projectRouter;