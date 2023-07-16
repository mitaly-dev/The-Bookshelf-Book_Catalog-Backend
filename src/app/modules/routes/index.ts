import express from 'express';
import { AuthRoute } from '../auth/auth.route';
import { UserRoute } from '../users/users.route';
import { BookRoute } from '../books/book.route';

const router = express.Router();

export const moduleRoute = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/book',
    route: BookRoute,
  },
];

moduleRoute.forEach(route => router.use(route.path, route.route));

export const routes = router;
