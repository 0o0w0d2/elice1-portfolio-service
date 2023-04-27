import { AwardModel } from '../schemas/award';

export const getAllAwardsForCurrentUser = async (currentUserId) => {
  return await AwardModel.find({ user: currentUserId });
};

// export const createNewAwardForCurrentUser = async ({
//   title,
//   description,
//   year,
//   user,
// }) => {
//   const newAward = new AwardModel({
//     title,
//     description,
//     year,
//     user,
//   });

//   await newAward.save();
//   return newAward;
// };
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

  const savedAward = await newAward.save();
  return savedAward.toObject(); // Return the full award object after saving it to the database
};

// export const updateAwardforCurrentUser = async (award, updateValue) => {
//   award.title = updateValue.title;
//   award.description = updateValue.description;
//   award.year = updateValue.year;

//   await award.save();
//   return award;
// };
export const updateAwardforCurrentUser = async (
  awardId,
  userId,
  updateValue
) => {
  const resource = await AwardModel.findOne({ id: awardId, user: userId });

  if (!resource) {
    throw new Error('Award not found for user.');
  }

  resource.title = updateValue.title;
  resource.description = updateValue.description;
  resource.year = updateValue.year;

  await resource.save();
  return resource;
};

// export const deleteAwardForCurrentUser = async (award) => {
//   await award.remove();
//   return award;
// };
export const deleteAwardForCurrentUser = async (awardId, userId) => {
  const resource = await AwardModel.findOne({ id: awardId, user: userId });

  if (!resource) {
    throw new Error('Award not found for user.');
  }

  await resource.remove();
  return resource;
};
