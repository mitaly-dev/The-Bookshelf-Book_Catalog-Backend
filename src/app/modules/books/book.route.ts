import express from 'express';
import { BookCtrl } from './book.controller';
import auth from '../../../middlewares/auth';

const router = express.Router();

router.get('/:id', BookCtrl.getSingleBook);
router.get('/', BookCtrl.getAllBooks);
router.get('/featuredBook', BookCtrl.getFeaturedBooks);
router.post('/', BookCtrl.addNewBook);
router.patch('/:id', BookCtrl.updateBook);
router.delete('/:id', BookCtrl.deleteBook);

export const BookRoute = router;
