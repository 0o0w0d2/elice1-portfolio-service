import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const AwardSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: () => nanoid(),
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const AwardModel = model('Award', AwardSchema);

export { AwardModel };
