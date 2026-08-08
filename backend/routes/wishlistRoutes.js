const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

router.get('/', protect, wishlistController.getWishlist);

router.post('/', protect, wishlistController.addToWishlist);

router.delete('/:productId', protect, wishlistController.removeFromWishlist);

module.exports = router;
