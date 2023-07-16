import mongoose, { Schema } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { Book } from './book.model';
import { IBook } from './book.interface';
import { ApiError } from '../../../error/ApiError';

const addNewBook = async (user: JwtPayload | null, payload: IBook) => {
  const result = await Book.create(payload);
  if (!result) {
    throw new ApiError(404, 'New Book create failed');
  }
  return result;
};

const getAllBooks = async () => {
  const result = await Book.find({}).lean();
  if (!result) {
    throw new ApiError(404, 'No book found!');
  }
  return result;
};

export const BookService = {
  addNewBook,
  getAllBooks,
};
