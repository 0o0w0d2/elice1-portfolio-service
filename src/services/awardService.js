import { AwardModel } from '../db/schemas/award';

export const getAllAwardsForCurrentUser = async (currentUserId) => {
  return await AwardModel.find({ user: currentUserId });
};

export const createNewAwardForCurrentUser = async ({
  title,
  description,
  year,
  user,
}) => {
  const newAward = new AwardModel({
    title,
    description,
    year,
    user,
  });

  await newAward.save();
  return newAward;
};

export const updateAwardforCurrentUser = async (award, updateValue) => {
  award.title = updateValue.title;
  award.description = updateValue.description;
  award.year = updateValue.year;

  await award.save();
  return award;
};

export const deleteAwardForCurrentUser = async (award) => {
  await award.remove();
  return award;
};
