import express from 'express';
import { BookCtrl } from './book.controller';
import auth from '../../../middlewares/auth';

const router = express.Router();

router.get('/:id', BookCtrl.getSingleBook);
router.get('/', BookCtrl.getAllBooks);
router.post('/add-new-book', auth(), BookCtrl.addNewBook);
router.patch('/:id', auth(), BookCtrl.updateBook);
router.delete('/:id', auth(), BookCtrl.deleteBook);

export const BookRoute = router;
