import Certification from "../db/models/Certification";
import { checkPermissionInCertification } from "../utils/validate";

const getAllCertification = async ({ userId }) => {
  const certification = await Certification.findByUserId({ userId });

  return certification;
};

const addCertification = async ({ certification }) => {
  const newCertification = await Certification.createCertification({
    certification,
  });

  return newCertification;
};

const editCertification = async ({ _id, newValues, userId }) => {
  const errorMessage = await checkPermissionInCertification(_id, userId);
  if (errorMessage) return errorMessage;

  const editedCertification = await Certification.updateCertification({
    _id,
    newValues,
  });

  return editedCertification;
};

const removeCertification = async ({ _id, userId }) => {
  const errorMessage = await checkPermissionInCertification(_id, userId);
  if (errorMessage) return errorMessage;

  const removeCertification = await Certification.deleteCertification({ _id });

  return removeCertification;
};

export default {
  getAllCertification,
  addCertification,
  editCertification,
  removeCertification,
};
