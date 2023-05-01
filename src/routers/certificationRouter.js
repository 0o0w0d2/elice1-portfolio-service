import { Router } from require("express");
import { login_required } from '../middlewares/login_required'
import certificationService from '../services/certificationService'
import asyncHandler from '../utils/asyncHandler'
import { validateValue } from '../utils/validate'

const certificationRouter = Router();

//Read
certificationRouter.get(
  '/certification/:userId',
  login_required,
  asyncHandler (async (req, res) => {
  const userId = req.params.userId;
  const allcertifications = await certificationService.getAllCertification({ userId });
  
  if (allcertifications.errorMessage) {
    throw new Error(allcertifications.errorMessage);
  }

  res.status(200).send(allcertifications);
})
);

//Create
certificationrouter.post(
  '/certification',
  login_required,
  asyncHandler(async (req, res) => {
  const userId = req.currentUserId;
  const { certificationName, certificationNumber, issuanceDate, issuingAuthority } = req.body;
  const certification = { userId, certificationName, certificationNumber, issuanceDate, issuanceDate };
  issuingAuthority;

  validateValue(certification)

  const addNewCertification = await certificationService.addCertification({ certification })

  res.status(201).send(addNewCertification);
})
);

//Update
certificationRouter.put(
  '/certification/:_id', 
  login_required,
  asyncHandler (async (req, res) => {
  const userId = req.currentUserId;
  const _id = req.params._id;
  const { certificationName, certificationNumber, issuanceDate, issuingAuthority } = req.body;

  const newValues = { certificationName, certificationNumber, issuanceDate, issuingAuthority };

  validateValue(newValues)

  const editCertification = await certificationService.editCertification({
_id,
newValues,
userId, 
});

if (editCertification.errorMessage) {
  throw new Error(editCertification.errorMessage);
}

  res.status(200).send(editCertification);
})
);

certificationRouter.delete(
  '/certification/:_id',
  login_required,
  asyncHandler(async (req, res) => {
    const userId = req.currentUserId;
    const _id = req.params._id;

    const deleteCertification = await certificationService.removeCertification({ _id, userId });

    if (deleteCertification.errorMessage) {
      throw new Error(deleteCertification.errorMessage);
    }

    res.status(200).send(deleteCertification);
  })
);

export { certificationRouter };
