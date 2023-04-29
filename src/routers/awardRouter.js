import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { validate_user_award } from '../middlewares/validate_user_resource';
import {
  createNewAward,
  deleteAward,
  getAllAwards,
  updateAward,
} from '../services/awardService';

const awardRouter = Router();

awardRouter.get('/awards/:userId', login_required, getAllAwards);

awardRouter.post('/awards', login_required, createNewAward);

awardRouter.patch(
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
