import { Router } from 'express';
import { AwardModel } from '../db/schemas/award';
import { login_required } from '../middlewares/login_required';
import { validate_user_award } from '../middlewares/validate_user_resource';
import asyncHandler from '../utils/asyncHandler';

const awardRouter = Router();

awardRouter.get(
  '/awards',
  login_required,
  asyncHandler(async (req, res) => {
    console.log(req.currentUserId);
    const awards = await AwardModel.find({
      user: req.currentUserId,
    });
    res.send(awards);
  })
);

awardRouter.post(
  '/awards',
  login_required,
  asyncHandler(async (req, res) => {
    const { title, description, year } = req.body;

    const newAward = new AwardModel({
      title,
      description,
      year,
      user: req.currentUserId,
    });

    await newAward.save();
    res.status(201).send('Ok');
  })
);

awardRouter.patch(
  '/awards/:id',
  login_required,
  validate_user_award,
  asyncHandler(async (req, res) => {
    // const { id } = req.params;
    const { title, description, year } = req.body;

    // test
    const award = req.resource;

    award.title = title;
    award.description = description;
    award.year = year;

    await award.save();
    res.status(201).send('Updated');
  })
);

awardRouter.delete(
  '/awards/:id',
  login_required,
  validate_user_award,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const award = await AwardModel.findOneAndDelete({
      id,
      user: req.currentUserId,
    });

    if (!award) res.status(404).send('Not Found');

    res.status(201).send('Deleted');
  })
);

export default awardRouter;
