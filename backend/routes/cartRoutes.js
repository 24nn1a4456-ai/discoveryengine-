const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/', protect, cartController.getCart);

router.post('/', protect, cartController.addToCart);

router.put('/:itemId', protect, cartController.updateCartItem);

router.delete('/:itemId', protect, cartController.removeFromCart);

router.delete('/', protect, cartController.clearCart);

module.exports = router;
