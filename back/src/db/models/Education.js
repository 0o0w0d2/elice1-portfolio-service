import { EducationModel } from '../schemas/education';

class Education {
  static async findByUserId({ userId }) {
    // ID로 학력 조회
    const educationList = await EducationModel.find({ userId });
    return educationList;
  }

  static async findByDataId({ _id }) {
    // ID로 학력 조회
    const educationList = await EducationModel.findById({ _id });
    return educationList;
  }

  static async add({ education }) {
    // education은 {userId,학교명,전공,졸업상태}
    const newEducation = await EducationModel.create(education);
    return newEducation;
  }

  static async edit({ education }) {
    // 여기 education은 _id 포함
    const { _id, schoolName, major, graduationTypeCode } = education;
    const editEducation = await EducationModel.findOneAndUpdate(
      { _id },
      { schoolName, major, graduationTypeCode },
      { new: true }
    );
    return editEducation;
  }

  static async remove({ _id }) {
    // 삭제는 _id 와 userId값을 받아와 삭제
    const removeEducation = await EducationModel.findOneAndDelete({ _id });
    return removeEducation;
  }
}

export { Education };
