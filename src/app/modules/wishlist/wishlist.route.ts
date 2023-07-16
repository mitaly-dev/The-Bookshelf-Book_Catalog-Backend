import express from 'express';
import { WishlistCtrl } from './wishlist.controller';

const router = express.Router();

router.post('/add-wishlist', WishlistCtrl.addBookWishlist);
router.get('/', WishlistCtrl.getWishlists);

export const WishlistRoute = router;
