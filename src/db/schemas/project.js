import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
    id,            // shortId 대신 id값이라고 씀 nanoid를 통해서 만들어진 값
                // 이게 근데 유저를 나타내는 고유값이 되어야해서 모든 파일에서 다
                // 똑같아야 하는데 .. 흠 모르겠는걸 잘 이해가 안댐
    title: {       // 프로젝트 이름
        type: String,
        required: true,
    },
    startDate: {   // 시작일 
        type: String,
        required: true,
    },
    endDate: {      // 종료일
        type: String,
        required: true,
    },
    description: {  // 설명
        type: String,
        required: false,
        default: '프로젝트에 대한 내용을 입력해주세요'
    },
    projectId: {    // 이 프로젝트에 대한 고유값
        type: String,
        required: true,
    }
    
});

const ProjectModel = model('Project', ProjectSchema);

export { ProjectModel }