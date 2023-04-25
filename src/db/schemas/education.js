import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';
// 학력 스키마 작성
// 유저 ID (or 유저ref하는 방법? 별로인듯)
// 학교명,전공 문자열 타입, 필수값
// 졸업타입코드는 숫자로, 필수값
// 1: 재학중 2: 학사졸업(기본값) 3: 석사졸업 4: 박사졸업
// 학위, 졸업구분으로 나누는 것이 좋을듯.
const EducationSchema = new Schema({
    _id:{
        type:String,
        required:true,
        default:()=>nanoid(),
    },
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
        type:Number,
        required:true,
        default:2,
    },
});

const EducationModel = model('Education', EducationSchema);

export { EducationModel };