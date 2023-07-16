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

const deleteBook = async (id: string, user: JwtPayload | null) => {
  const isAuthorized = await Book.findOne({ _id: id }).lean();
  if (isAuthorized?.userEmail !== user.email) {
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
  deleteBook,
};
