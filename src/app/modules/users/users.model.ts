/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { Model, Schema } from 'mongoose';
import { userRole } from './users.constant';
import config from '../../../config';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './users.interface';

const UserSchema = new Schema<IUser, UserModel>(
  {
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean | null> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.pre('save', async function (next) {
  const user = this;
  this.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
export const User = mongoose.model<IUser, UserModel>('User', UserSchema);
