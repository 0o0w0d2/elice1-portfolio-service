import { Project } from '../db';

class projectService {
    static async getProject({ userId }){
        const projectList = await Project.findByUserId({userId});
        
        return projectList;
    }

    static async addProject({ project }){
           
        const newProject = await Project.add({ project });

        return newProject;
    }

    static async editProject({ _id, newValues, userId }){

        const project = await Project.findByProjectId({ projectId: _id })  
        
        if (!project) {
            const errorMessage = '프로젝트를 찾을 수 없습니다.';
            return { errorMessage }
        };

        if (project.userId !== userId){
			const errorMessage = '권한이 없습니다.';
            return { errorMessage };
		};
        
        const editedProject = await Project.edit({ _id, newValues });
        
        return editedProject;
    }

    static async removeProject({ _id, userId }){
        
        const project = await Project.findByProjectId({ projectId: _id })       

        if (!project) {
            const errorMessage = '프로젝트를 찾을 수 없습니다.';
            return { errorMessage }
        }

        if (project.userId !== userId){
			const errorMessage = '권한이 없습니다.';
            return { errorMessage };
		}

        const removedProject = await Project.remove({ _id, userId });

        return removedProject;
    }

};

export { projectService };
