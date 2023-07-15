import express, { Router } from 'express';
import { AuthCtrl } from './auth.controller';
import validateRequest from '../../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthCtrl.loginUser
);
AuthCtrl.loginUser;
router.post('/signup', AuthCtrl.signup);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthCtrl.refreshToken
);
export const AuthRoute = router;
