import { Education } from '../db';

class educationService {
    static async getEducation({userId}){
        const educationList = await Education.findByUserId({userId});
        if(!educationList.length){
            const errorMessage = '해당 사용자의 학력 사항이 없습니다.';
            return { errorMessage };
        };
        return educationList;
    }

    static async addEducation({education}){
        const newEducation = await Education.add({education});
        return newEducation;
    }

    static async editEducation({education}){
        const editedEducation = await Education.edit({education});
        if(!editedEducation){
            const errorMessage = '해당 학력 사항이 없습니다.';
            return { errorMessage };
        };
        return editedEducation;
    }

    static async removeEducation({_id}){
        const removedEducation = await Education.remove({_id});
        if(!removedEducation){
            const errorMessage = '해당 학력 사항이 없습니다.';
            return { errorMessage };
        };
        return removedEducation;
    }

};

export { educationService };