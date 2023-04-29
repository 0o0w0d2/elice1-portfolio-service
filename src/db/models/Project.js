import { ProjectModel } from '../schemas/project';

class Project {
  static async findByUserId({ userId }) {
    const projectList = await ProjectModel.find({ userId });

    return projectList;
  }

  static async findByProjectId({ projectId }) {
		const findProject = await ProjectModel.findById(projectId);
    
		return findProject;
  }

  static async add({ project }) {
    const newProject = await ProjectModel.create(project);

    return newProject;
  }

  static async edit({ _id, newValues }) {
  
    const editProject = await ProjectModel.findOneAndUpdate(
      { _id },
      newValues,
      { new: true }
    );

    return editProject;
  }

  static async remove({ _id}) {
    const removeProject = await ProjectModel.findOneAndDelete({ _id });

    return removeProject;
  }
}

export { Project };
