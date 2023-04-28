import { Project } from '../db';

class projectService {
    static async getProject({ userId }){
        const projectList = await Project.findByUserId({userId});
        
        if(projectList.length < 1){
            const errorMessage = '프로젝트가 없습니다.';
            return { errorMessage };
        };
        
        return projectList;
    }

    static async addProject({ project }){
        const newProject = await Project.add({ project });
        
        return newProject;
    }

    static async editProject({ project }){
        const editedProject = await Project.edit({ project });
        
        if(!editedProject){
            const errorMessage = '권한이 없습니다.';
            return { errorMessage };
        };
        
        return editedProject;
    }

    static async removeProject({ _id, userId }){
        const removedProject = await Project.remove({ _id, userId });
        
        if(!removedProject ){
            const errorMessage = '권한이 없습니다.';
            return { errorMessage };
        };

        return removedProject;
    }

};

export { projectService };
