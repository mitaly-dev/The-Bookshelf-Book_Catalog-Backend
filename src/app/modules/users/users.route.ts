import express from 'express';
import { UsersCtrl } from './users.controller';
import auth from '../../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../../middlewares/validateRequest';
import { UserValidation } from './users.validation';

const router = express.Router();
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  UsersCtrl.getMyProfile
);
router.patch(
  '/my-profile',
  validateRequest(UserValidation.updateMyProfileZodSchema),
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  UsersCtrl.updateMyProfile
);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UsersCtrl.updateUser);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UsersCtrl.getAllUsers);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UsersCtrl.getSingleUser);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UsersCtrl.deleteUser);

export const UserRoute = router;
