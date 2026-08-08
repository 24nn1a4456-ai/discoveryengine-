const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/admin/all', protect, authorize('admin'), orderController.getAllOrders);

router.put('/admin/:id/status', protect, authorize('admin'), orderController.updateOrderStatus);

router.get('/', protect, orderController.getOrders);

router.get('/:id', protect, orderController.getOrderById);

router.post('/', protect, orderController.createOrder);

module.exports = router;
