import { Model } from 'mongoose';

export type IUser = {
  email: string;
  password: string;
  name: string;
};

export type UserModel = {
  isPasswordMatch(givenPass: string, password: string): Promise<boolean | null>;
} & Model<IUser>;
