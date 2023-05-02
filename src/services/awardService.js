import { Award } from '../db';

const AwardService = {
  getAllAwards: async (userId) => {
    const allAwards = await Award.findByUserId(userId);
    if (allAwards.length < 1) {
      throw new Error(`The User has no award.`);
    }
    return allAwards;
  },
  createNewAward: async (award) => {
    console.log(award);
    const newAward = await Award.create(award);
    return newAward;
  },
  updateAward: async (award) => {
    const updateAward = await Award.update(award);
    return updateAward;
  },
  deleteAward: async (awardId) => {
    console.log('service', awardId);
    const deleteAward = await Award.delete(awardId);
    return deleteAward;
  },
};

export { AwardService };
