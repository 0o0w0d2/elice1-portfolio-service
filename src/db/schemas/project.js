import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
    userId: {      // 유저에 대한 고유값 
        type: String,
        required: true,
    },               
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
}, {
    timestamps: true,
});

const ProjectModel = model('Project', ProjectSchema);

export { ProjectModel };
