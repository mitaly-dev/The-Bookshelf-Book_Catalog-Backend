/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { Schema } from 'mongoose';
import { IBook } from './book.interface';

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publication: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    userEmail: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: String,
      required: true,
    },
    reviews: Array,
  },
  {
    timestamps: true,
  }
);

// BookSchema.statics.isPasswordMatch = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean | null> {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };

export const Book = mongoose.model<IBook>('Book', BookSchema);
