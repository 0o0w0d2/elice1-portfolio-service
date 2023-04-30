import { Schema, model } from 'mongoose';
// 학력 스키마 작성
// 학교명,전공,졸업타입코드 문자열 타입, 필수값
// 재학중, 학사졸업, 석사졸업, 박사졸업
const EducationSchema = new Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        schoolName:{
            type:String,
            required:true,
        },
        major:{
            type:String,
            required:true,
        },
        graduationTypeCode:{
            type:String,
            required:true,
        },
    },
    {
        timestamps: true,
    }
);

const EducationModel = model('Education', EducationSchema);

export { EducationModel };