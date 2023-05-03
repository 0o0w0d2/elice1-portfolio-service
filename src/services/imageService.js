import { Image } from '../db';
import { checkPermissionInImage } from '../utils/validate';

class imageService {
    static async getImage({ userId, dataId }) {
        let gotImage = {};
        if(dataId === 'profile'){
            gotImage = await Image.findByUserId({ userId, dataId });
        }else{
            gotImage = await Image.findByDataId({ _id:dataId });
        }
        return gotImage;
    }
  
    static async addImage({ imageInfo }) {
        const newImage = await Image.add({ imageInfo });
        return newImage;
    }
  
    static async changeImage({ imageInfo }) {
        const { userId, dataId } = imageInfo;
        const _id = dataId;
    
        const errorMessage = await checkPermissionInImage(_id, userId);
        if (errorMessage) return errorMessage;
    
        const changedImage = await Image.change({ imageInfo });
        return changedImage;
    }
  
    static async removeImage({ userId, dataId }) {
        const _id = dataId
        const errorMessage = await checkPermissionInImage(_id, userId);
        if (errorMessage) return errorMessage;
    
        const removedImage = await Image.remove({ userId, dataId });
        return removedImage;
    }
  }
  
  export { imageService };