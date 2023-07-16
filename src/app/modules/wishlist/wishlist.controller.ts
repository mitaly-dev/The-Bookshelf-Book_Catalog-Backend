import httpStatus from 'http-status';
import AsyncErrorHandler from '../../../shared/AsyncErrorHandler';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { ApiError } from '../../../error/ApiError';
import { any } from 'zod';
import { WishlistService } from './wishlist.service';

const addBookWishlist = AsyncErrorHandler(
  async (req: Request, res: Response) => {
    const result = await WishlistService.addBookWishlist(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book added in wishlist successfully',
      data: result,
    });
  }
);

const getWishlists = AsyncErrorHandler(async (req: Request, res: Response) => {
  const result = await WishlistService.getWishlists();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist retrieved successfully',
    data: result,
  });
});

export const WishlistCtrl = {
  addBookWishlist,
  getWishlists,
};
