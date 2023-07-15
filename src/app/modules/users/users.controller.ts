import httpStatus from 'http-status';
import AsyncErrorHandler from '../../../shared/AsyncErrorHandler';
import { UserService } from './users.service';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import config from '../../../config';
import { ApiError } from '../../../error/ApiError';

// my profile
const getMyProfile = AsyncErrorHandler(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await UserService.getMyProfile(user?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  });
});

// my profile update
const updateMyProfile = AsyncErrorHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    const data = req.body;

    const result = await UserService.updateMyProfile(user?.id, data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User's information retrieved successfully",
      data: result,
    });
  }
);

// get all users
const getAllUsers = AsyncErrorHandler(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all users successfully',
    data: result,
  });
});

// get single user
const getSingleUser = AsyncErrorHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'find single user successfully',
    data: result,
  });
});

// update user

const updateUser = AsyncErrorHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await UserService.updateUser(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update user successfully',
    data: result,
  });
});

// delete user
const deleteUser = AsyncErrorHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user delete successfully',
    data: result,
  });
});

export const UsersCtrl = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
