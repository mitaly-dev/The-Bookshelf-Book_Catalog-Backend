import { string } from 'zod';
type Ireview = {
  user: string;
  message: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publication: string;
  imageUrl: string;
  userEmail: string;
  reviews: Ireview[];
};
