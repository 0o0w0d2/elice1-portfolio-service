import { Schema, model } from 'mongoose';

const CertificationSchema = new Schema(
  {
    userId: {
      // 유저에 대한 고유값
      type: String,
      required: true,
    },
    certificationName: {
      //자격증이름
      type: String,
      required: true,
    },
    certificationNumber: {
      //자격증번호
      type: String,
      required: true,
    },
    issuanceDate: Date, //취득날짜
    issuingAuthority: String, //발급기관
  },
  {
    timestamps: true,
  }
);

const CertificationModel = model('Certification', CertificationSchema);

export { CertificationModel };
