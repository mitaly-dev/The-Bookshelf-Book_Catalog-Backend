import mongoose, { Schema } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { ApiError } from '../../../error/ApiError';
import { Wishlist } from './wishlist.model';
import { IWishlist } from './wishlist.interface';

const addBookWishlist = async (payload: IWishlist) => {
  const result = await Wishlist.create(payload);
  if (!result) {
    throw new ApiError(404, 'added Wishlist failed');
  }
  return result;
};

const getWishlists = async () => {
  const result = await Wishlist.find({});
  return {
    data: result,
  };
};

export const BookService = {
  addBookWishlist,
  getWishlists,
};
