import express from 'express';
import { BookCtrl } from './wishlist.controller';

const router = express.Router();

router.post('/add-wishlist', BookCtrl.addReview);
router.get('/', BookCtrl.getFeaturedBooks);

export const WishlistRoute = router;
