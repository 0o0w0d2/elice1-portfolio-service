import { ImageModel } from '../schemas/image';

class Image {
  static async findByUserId({ userId, dataId }) {
    // 유저ID로 사진 조회
    const profileImage = await ImageModel.findOne({ userId, dataId });
    return profileImage;
  }

  static async findByDataId({ _id }) {
    // dataId로 사진 조회
    const dataImage = await ImageModel.findOne({ dataId:_id });
    return dataImage;
  }

  static async add({ imageInfo }) {
    const newImage = await ImageModel.create(imageInfo);
    return newImage;
  }

  static async change({ imageInfo }) {
    const { userId, dataId, image } = imageInfo;
    const changeImage = await ImageModel.findOneAndUpdate(
      { userId, dataId },
      { image },
      { new: true }
    );
    return changeImage;
  }

  static async remove({ userId, dataId }) {
    const removeImage = await ImageModel.findOneAndDelete({ userId, dataId });
    return removeImage;
  }
}

export { Image };
