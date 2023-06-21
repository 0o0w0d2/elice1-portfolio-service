import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { AwardService } from '../services/awardService';
import asyncHandler from '../utils/asyncHandler';

const awardRouter = Router();
awardRouter.get(
  '/awards/:userId',
  login_required,
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const awardsForCurrentUser = await AwardService.getAllAwards(userId);
    res.status(200).json({
      message: `All awards for the user retrieved successfully.`,
      awards: awardsForCurrentUser,
    });
  })
);

awardRouter.post(
  '/awards',
  login_required,
  asyncHandler(async (req, res) => {
    const userId = req.currentUserId;
    const { title, description, year } = req.body;
    const newAward = await AwardService.createNewAward({
      title,
      description,
      year,
      userId,
    });

    res.status(201).json({
      message: `New Award Created Successfully.`,
      award: newAward,
    });
  })
);

awardRouter.patch(
  '/awards/:_id',
  login_required,
  asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const { title, description, year } = req.body;
    const updatedAward = await AwardService.updateAward({
      _id,
      userId: req.currentUserId,
      title,
      description,
      year,
    });

    res.status(201).json({
      message: `The Award is updated successfully.`,
      award: updatedAward,
    });
  })
);

awardRouter.delete(
  '/awards/:_id',
  login_required,
  asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const deletedAward = await AwardService.deleteAward(_id);
    res.status(204).json({
      message: `The Award is deleted successfully.`,
      award: deletedAward,
    });
  })
);

export { awardRouter };
