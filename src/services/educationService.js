import { Education } from '../db';

class educationService {
    static async getEducation({userId}){
        const educationList = await Education.findByUserId({userId});
        return educationList;
    }

    static async addEducation({education}){
        const newEducation = await Education.add({education});
        return newEducation;
    }

    static async editEducation({ userId, education}){
        const { _id } = education;
        const editEducation = await Education.findById({_id});

        if(!editEducation){
            const errorMessage = '해당 학력 사항이 없습니다.';
            return { errorMessage };
        };
        if(editEducation.userId !== userId){
            const errorMessage = '권한이 없습니다.';
            return { errorMessage };
        };

        const editedEducation = await Education.edit({education});
        return editedEducation;
    }

    static async removeEducation({ _id, userId }){
        const removeEducation = await Education.findById({_id});

        if(!removeEducation){
            const errorMessage = '해당 학력 사항이 없습니다.';
            return { errorMessage };
        };
        if(removeEducation.userId !== userId){
            const errorMessage = '권한이 없습니다.';
            return { errorMessage };
        };

        const removedEducation = await Education.remove({ _id });
        return removedEducation;
    }

};

export { educationService };