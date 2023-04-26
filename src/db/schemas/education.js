import { Schema, model } from 'mongoose';
// 학력 스키마 작성
// 학교명,전공 문자열 타입, 필수값
// 졸업타입코드는 숫자로, 필수값
// 1: 재학중 2: 학사졸업(기본값) 3: 석사졸업 4: 박사졸업
// 학위, 졸업구분으로 나누는 것이 좋을듯.
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