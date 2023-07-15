import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { ApiError } from '../error/ApiError';
import { jwtHelpers } from '../helpers/jwtHelpers';
import config from '../config';
import { Cow } from '../app/modules/cow/cow.model';

const authSeller =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifiedToken(
        token,
        config.jwt.secret as Secret
      );

      const realSeller = await Cow.findOne({
        seller: verifiedUser?.id,
      });

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden User');
      }

      if (
        requiredRoles.includes('seller') &&
        (!realSeller || realSeller.seller.toString() !== verifiedUser?.id)
      ) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You are not authorized seller'
        );
      }

      req.user = verifiedUser;
      next();
    } catch (error) {
      next(error);
    }
  };

export default authSeller;
