import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid'; // babel 사용시 최신 버전의 nanoid는 require 미지원으로 3.3.6 버전 사용

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      default:()=>nanoid(),
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: '설명이 아직 없습니다. 추가해 주세요.',
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model('User', UserSchema);

export { UserModel };
