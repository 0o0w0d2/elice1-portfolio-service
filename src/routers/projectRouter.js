import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import projectService from '../services/projectService';
import asyncHandler from '../utils/asyncHandler';


const projectRouter = Router();

// userId 기반 전체 조회
projectRouter.get('/project', login_required, asyncHandler(async (req, res) => {
    
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
projectRouter.post('/project', login_required, asyncHandler(async (req, res) => {
    
    const { title, startDate, endDate, description } = req.body;
    // 스키마로 설정한 required: true인 값들에 대해서 확인
    const userId = req.currentUserId


    if (!title || !startDate || !endDate) {
        throw new Error("필수 정보를 입력해주세요.")
    }

    const newProject = await projectService.addProject({
        userId,
        title,
        startDate,
        endDate,
        description,
    })

    res.status(201).json(newProject);
   
}));


// 프로젝트 수정
projectRouter.patch('/project/:_id', login_required, asyncHandler(async (req, res) => {
    const _id = req.params._id;
    const userId = req.currentUserId;
    const project = projectService.getProjectByProjectId(_id);

    if (userId !== project.userId) {
        throw new Error("권한이 없습니다.")
    }

    const { title, startDate, endDate, description } = req.body;
    
    const updateValues = { title, startDate, endDate, description };
    

    const updatedProject = await projectService.editProject({ _id, updateValues })
    res.status(200).json(updatedProject);

    
}));


//프로젝트 삭제
projectRouter.delete('/project/:_id', login_required, asyncHandler(async (req, res) => {
    
    const _id = req.params._id;
    const userId = req.currentUserId;
    const project = projectService.getProjectByProjectId(_id);

    if (userId !== project.userId) { 
        throw new Error("권한이 없습니다.")
    }

    const deletedProject = await projectService.delProject(_id);
    res.status(200).json(deletedProject);
}));

export default projectRouter;
