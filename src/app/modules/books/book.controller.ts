import httpStatus from 'http-status';
import AsyncErrorHandler from '../../../shared/AsyncErrorHandler';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { ApiError } from '../../../error/ApiError';
import { Book } from './book.model';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { bookfilterableFields, filterableFields } from './book.interface';
import { any } from 'zod';

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
  const filters = pick(req.query, filterableFields);

  const result = await BookService.getAllBooks(filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Books retrieved successfully',
    data: result,
  });
  //   const result = await BookService.getAllBooks();

  //   sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //     message: 'All Books retrieved successfully',
  //     data: result,
  //   });
});

const getSingleBook = AsyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBook(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

const updateBook = AsyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.updateBook(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book update successfully',
    data: result,
  });
});

const deleteBook = AsyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const result = await BookService.deleteBook(id, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book delete successfully',
    data: result,
  });
});

export const BookCtrl = {
  addNewBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
