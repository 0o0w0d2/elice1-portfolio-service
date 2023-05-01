// import { AwardModel } from '../schemas/award';
// import { EducationModel } from '../schemas/education';

const createModelController = (Model) => ({
  async create({ data }) {
    return Model.create(data);
  },

  async findById({ id }) {
    return Model.findOne({ id });
  },

  async findByUserId({ userId }) {
    return Model.find({ userId });
  },

  async update({ id, fieldToUpdate, newValue }) {
    const filter = { id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedModel = await Model.findOneAndUpdate(filter, update, option);
    return updatedModel;
  },

  async deleteById({ id }) {
    const deleteResult = await Model.deleteOne({ id });
    return deleteResult.deletedCount === 1;
  },
});

const AwardController = createModelController(AwardModel);
const EducatoinController = createModelController(EducationModel);

// export { AwardController, EducatoinController };
