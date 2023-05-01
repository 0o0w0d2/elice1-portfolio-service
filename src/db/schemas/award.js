import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const AwardSchema = new Schema(
  {
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
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AwardModel = model('Award', AwardSchema);

export { AwardModel };
