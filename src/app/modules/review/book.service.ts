import mongoose, { Schema } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { Book } from './book.model';
import { IBook, IBookFilters } from './book.interface';
import { ApiError } from '../../../error/ApiError';

const addReview = async (user: JwtPayload | null, payload: IBook) => {
  const result = await Book.create(payload);
  if (!result) {
    throw new ApiError(404, 'New Book create failed');
  }
  return result;
};

const getAllBooks = async (filters: IBookFilters | any) => {
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  const bookFilterData = ['title', 'author', 'genre'];

  if (searchTerm) {
    andConditions.push({
      $or: bookFilterData.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Book.find(whereConditions);

  const total = await Book.countDocuments();

  return {
    data: result,
  };
};

export const BookService = {
  addReview,
  getAllBooks,
};
