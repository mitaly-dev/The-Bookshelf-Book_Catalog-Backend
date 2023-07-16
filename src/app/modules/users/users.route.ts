import express from 'express';
import { UsersCtrl } from './users.controller';
import auth from '../../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UsersCtrl.getAllUsers);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UsersCtrl.getSingleUser);

export const UserRoute = router;
