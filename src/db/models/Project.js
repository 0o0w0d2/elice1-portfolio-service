import { ProjectModel } from '../schemas/project';

const findByUserId = async ({ userId }) => {
    const projectList = await ProjectModel.find({ userId });

    return projectList;
}

const findByProjectId = async ({ _id }) => {
    const findProject = await ProjectModel.findById(_id);

    return findProject;
}

const createProject = async ({ project }) => {
    const newProject = await ProjectModel.create(project);

    return newProject;
}

const updateProject = async ({ _id, newValues }) => {
    const updatedProject = await ProjectModel.findOneAndUpdate(
        { _id },
        newValues,
        {new: true}
    );

    return updatedProject;
}

const deleteProject = async ({ _id}) => {
    const deletedProject = await ProjectModel.findOneAndDelete({ _id });

    return deletedProject;
}

export default { findByUserId, findByProjectId, createProject, updateProject, deleteProject };