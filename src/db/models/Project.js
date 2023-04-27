import { ProjectModel } from '../schemas/project';

class Project {
    static async findByUserId({userId}){

        const projectList = await ProjectModel.find({userId});
        
        return projectList;
    }

    static async add({project}){
        const newProject = await  ProjectModel.create(project);
        
        return newProject;
    }


    static async edit({project}){
   
        const { userId, _id, schoolName, major, graduationTypeCode } = project;
        const editProject = await ProjectModel.findOneAndUpdate({ _id, userId }, { title, decription, startDate, endDate }, { new : true });
       
        return editProject;
    }

    static async remove({ _id, userId }){
   
        const removeProject = await ProjectModel.findOneAndDelete({ _id, userId });
        
        return removeProject;
    }
}

export { Project };
