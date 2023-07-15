import express, { Router } from 'express';
import { AuthCtrl } from './auth.controller';
import validateRequest from '../../../middlewares/validateRequest';

const router = express.Router();

// router.post(
//   '/login',
//   validateRequest(AuthValidation.loginZodSchema),
//   AuthCtrl.loginUser
// );
router.post('/signup', AuthCtrl.signup);

export const AuthRoute = router;
