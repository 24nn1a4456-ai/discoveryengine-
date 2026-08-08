const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const analyticsController = require('../controllers/analyticsController');

const router = express.Router();

router.get('/dashboard', protect, analyticsController.getDashboardStats);

router.get('/admin', protect, authorize('admin'), analyticsController.getAdminStats);

router.get('/recommendation-logs', protect, authorize('admin'), analyticsController.getRecommendationLogs);

module.exports = router;
