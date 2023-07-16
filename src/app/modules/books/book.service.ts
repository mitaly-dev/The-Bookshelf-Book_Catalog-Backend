import mongoose, { Schema } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { Book } from './book.model';
import { IBook, IBookFilters } from './book.interface';
import { ApiError } from '../../../error/ApiError';

const addNewBook = async (user: JwtPayload | null, payload: IBook) => {
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

const getFeaturedBooks = async () => {
  const result = await Book.find({}).sort({ createdAt: -1 }).limit(10);
  console.log(' result', result);
  if (!result) {
    throw new ApiError(404, 'Book not found!');
  }
  return result;
};

const getSingleBook = async (id: string) => {
  const result = await Book.findById({ _id: id }).lean();
  if (!result) {
    throw new ApiError(404, 'Book not found!');
  }
  return result;
};

const updateBook = async (id: string, payload: IBook) => {
  const result = await Book.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) {
    throw new ApiError(404, 'update book not found!');
  }
  return result;
};

const deleteBook = async (id: string, user: JwtPayload | null) => {
  const isAuthorized = await Book.findOne({ _id: id }).lean();
  if (user?.email && isAuthorized?.userEmail !== user.email) {
    throw new ApiError(404, 'You are not Authorized to delete this book!');
  }
  const result = await Book.deleteOne({ _id: id }).lean();
  if (!result) {
    throw new ApiError(404, 'Book not delete successful!');
  }
  return result;
};

export const BookService = {
  addNewBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  getFeaturedBooks,
};
