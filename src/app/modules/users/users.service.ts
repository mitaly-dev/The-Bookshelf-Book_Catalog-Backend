import config from '../../../config';
import { ApiError } from '../../../error/ApiError';
import { IUser } from './users.interface';
import { User } from './users.model';
import bcrypt from 'bcrypt';

// my profile
const getMyProfile = async (id: string) => {
  const user = await User.findById(
    { _id: id },
    { name: 1, phoneNumber: 1, address: 1, _id: 0 }
  );
  return user;
};

// my profile update
const updateMyProfile = async (id: string, payload: Partial<IUser>) => {
  const user = await User.findById({ _id: id });
  if (!user) {
    throw new ApiError(404, 'user not found');
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>; // `name.fisrtName`
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (userData?.password) {
    updatedUserData.password = await bcrypt.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds)
    );
  }

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};

const getAllUsers = async () => {
  const result = await User.find({});
  if (!result) {
    throw new ApiError(404, 'get all users not found!');
  }
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await User.findById({ _id: id });
  if (!result) {
    throw new ApiError(404, 'get single user not found!');
  }
  return result;
};

const updateUser = async (id: string, payload: IUser) => {
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) {
    throw new ApiError(404, 'update user not found!');
  }
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete({ _id: id });
  if (!result) {
    throw new ApiError(404, 'delete user not found!');
  }
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
