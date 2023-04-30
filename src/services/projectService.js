import Project from '../db/models/Project';

const getAllProject = async ({ userId }) => {
    const projectList = await Project.findByUserId({userId});

    return projectList;
}

const addProject = async ({ project }) => {
    const newProject = await Project.createProject({ project });

    return newProject;
}

const editProject = async ({ _id, newValues, userId }) => {
    
    const project = await Project.findByProjectId({ _id });

    if (!project) {
        const errorMessage = '프로젝트를 찾을 수 없습니다.';
        return { errorMessage };
    }

    if (project.userId !== userId){
        const errorMessage = '권한이 없습니다.';
        return { errorMessage };
    }

    const editedProject = await Project.updateProject({ _id, newValues })

    return editedProject;
}

const removeProject = async ({ _id, userId }) => {
    
    const project = await Project.findByProjectId({ _id }) ;      

    if (!project) {
        const errorMessage = '프로젝트를 찾을 수 없습니다.';
        return { errorMessage };
    };

    if (project.userId !== userId){
		const errorMessage = '권한이 없습니다.';
        return { errorMessage };
	};

    const removedProject = await Project.deleteProject({ _id })

    return removedProject;
}

export default { getAllProject, addProject, editProject, removeProject };