import { Router } from 'express';
// To integrate middlewares
import { login_required } from '../middlewares/login_required';
import { validate_user_award } from '../middlewares/validate_user_resource';
import {
  createNewAward,
  deleteAward,
  getAllAwards,
  updateAward,
} from '../services/awardService';

const awardRouter = Router();

awardRouter.get(
  // based on the fact that the current user is already authenticated
  '/awards', //and endpoints only needs to return the awards that belongs to the current user.
  login_required,
  getAllAwards
);

awardRouter.post('/awards', login_required, createNewAward);

awardRouter.put(
  '/awards/:id',
  login_required,
  validate_user_award,
  updateAward
);

awardRouter.delete(
  '/awards/:id',
  login_required,
  validate_user_award,
  deleteAward
);

export default awardRouter;
