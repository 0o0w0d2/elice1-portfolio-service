import { CertificationModel } from "../schemes/certification";

const findByUserId = async ({ userId }) => {
  const certificationList = await CertificationtModel.find({ userId });

  return certificationList;
};

const findByDataId = async ({ _id }) => {
  const findCertification = await CertificationModel.findById(_id);

  return findCertification;
};

const createCertification = async ({ certification }) => {
  const newCertification = await CertificationModel.create(certification);

  return newCertification;
};

const updateCertification = async ({ _id, newValues }) => {
  const updatedCertification = await CertificationModel.findOneAndUpdate(
    {
      _id,
    },
    newValues,
    {
      new: true,
    }
  );

  return updatedCertification;
};

const deleteCertification = async ({ _id }) => {
  const deleteCertification = await CertificationModel.findOneAndDelete({
    _id,
  });

  return deletedCertification;
};

export default {
  findByUserId,
  findByDataId,
  createCertification,
  updateCertification,
};
