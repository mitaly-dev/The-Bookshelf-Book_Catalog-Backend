import { string } from 'zod';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publication: string;
  bookOwner: string;
};
