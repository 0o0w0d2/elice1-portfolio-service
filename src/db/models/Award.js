import { AwardModel } from '../schemas/award';

const Award = {
  findByUserId: async (userId) => {
    try {
      const awards = await AwardModel.find({ userId });
      return awards;
    } catch (err) {
      throw new Error(
        `An Error occurs while retrieving awards: ${err.message}`
      );
    }
  },
  create: async (award) => {
    try {
      const newAward = new AwardModel(award);
      await newAward.save();
      return newAward.toObject();
    } catch (err) {
      throw new Error(`An Error occurs while creating new award`);
    }
  },
  update: async ({ _id, userId, ...updateAward }) => {
    try {
      const resource = await AwardModel.findOne({ _id, userId });
      Object.assign(resource, updateAward);

      await resource.save();
      return resource;
    } catch (err) {
      throw new Error(`An Error occurs while updating the award.`);
    }
  },
  delete: async (_id) => {
    try {
      const deletedAward = await AwardModel.findByIdAndDelete({ _id });
      return deletedAward;
    } catch (err) {
      throw new Error(`An Error occurs while deleting the award`);
    }
  },
};

export { Award };
