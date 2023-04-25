import { Router } from 'express';
import { AwardModel } from '../db/schemas/award';
import { login_required } from '../middlewares/login_required';
import asyncHandler from '../utils/asyncHandler';

const awardRouter = Router();

awardRouter.get(
  '/awards',
  asyncHandler(async (req, res) => {
    const awards = await AwardModel.find({});
    res.send(awards);
  })
);

awardRouter.post(
  '/awards',
  login_required,
  asyncHandler(async (req, res) => {
    const { title, description, year } = req.body;
    const user_id = req.currentUserId;

    const newAward = new AwardModel({
      title,
      description,
      year,
      user: user_id,
    });

    await newAward.save();
    res.status(201).send('Ok');
  })
);

awardRouter.patch(
  '/awards/:id',
  login_required,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, year } = req.body;
    const user_id = req.currentUserId;

    const award = await AwardModel.findOneAndUpdate(
      { id },
      { title, description }
    );
    res.status(201).send('Updated');
  })
);

awardRouter.delete(
  '/awards/:id',
  login_required,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await AwardModel.findOneAndDelete({ id });
    res.status(201).send('Deleted');
  })
);

export default awardRouter;
