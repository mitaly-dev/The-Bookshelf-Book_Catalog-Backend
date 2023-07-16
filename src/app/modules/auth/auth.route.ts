import express, { Router } from 'express';
import { AuthCtrl } from './auth.controller';

const router = express.Router();

router.post('/create-user', AuthCtrl.signup);
router.post('/login-user', AuthCtrl.signup);

export const AuthRoute = router;
