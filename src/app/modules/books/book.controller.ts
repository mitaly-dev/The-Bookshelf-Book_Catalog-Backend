import httpStatus from 'http-status';
import AsyncErrorHandler from '../../../shared/AsyncErrorHandler';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { ApiError } from '../../../error/ApiError';
import { Book } from './book.model';
import { BookService } from './book.service';

const addNewBook = AsyncErrorHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const { userEmail } = req.body;

  if (user && userEmail !== user.email) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden User');
  }

  const result = await BookService.addNewBook(user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Book create successfully',
    data: result,
  });
});

const getAllBooks = AsyncErrorHandler(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Book create successfully',
    data: result,
  });
});

export const BookCtrl = {
  addNewBook,
  getAllBooks,
};
