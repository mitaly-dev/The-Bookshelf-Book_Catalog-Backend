import AsyncErrorHandler from '../../../shared/AsyncErrorHandler';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import config from '../../../config';

// login users
const loginUser = AsyncErrorHandler(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, ...others } = result;

  const refreshToken_options = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, refreshToken_options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: others,
  });
});

// refresh token
const refreshToken = AsyncErrorHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  const refreshToken_options = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, refreshToken_options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'new access token create successfully',
    data: result,
  });
});

const signup = AsyncErrorHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AuthService.signup(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user create successfull',
    data: result,
  });
});

// login users service

export const AuthCtrl = {
  signup,
  loginUser,
  refreshToken,
};
