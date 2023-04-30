import { Education } from '../db';
import { checkPermissionInEducation } from '../utils/validate';

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

        const errorMessage = await checkPermissionInEducation(_id,userId);
        if(errorMessage) return errorMessage;

        const editedEducation = await Education.edit({education});
        return editedEducation;
    }

    static async removeEducation({ _id, userId }){
        
        const errorMessage = await checkPermissionInEducation(_id,userId);
        if(errorMessage) return errorMessage;

        const removedEducation = await Education.remove({ _id });
        return removedEducation;
    }

};

export { educationService };