import express from 'express';
import { BookCtrl } from './book.controller';
import auth from '../../../middlewares/auth';

const router = express.Router();

router.get('/', BookCtrl.getAllBooks);
router.post('/add-new-book', auth(), BookCtrl.addNewBook);
router.get('/:id', BookCtrl.getSingleBook);
router.delete('/:id', BookCtrl.deleteBook);

export const BookRoute = router;
