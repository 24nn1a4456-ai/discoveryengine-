const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Activity = require('../models/Activity');
const Recommendation = require('../models/Recommendation');
const Cart = require('../models/Cart');
const Wishlist = require('../models/Wishlist');
const { paginate, paginateResults } = require('../utils/pagination');

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const [totalOrders, recentActivity, cart, wishlist] = await Promise.all([
      Order.countDocuments({ user: userId }),
      Activity.find({ user: userId }).sort('-timestamp').limit(10).populate('product', 'title thumbnail price'),
      Cart.findOne({ user: userId }),
      Wishlist.findOne({ user: userId }),
    ]);

    const totalSpent = await Order.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalSpent: totalSpent.length > 0 ? totalSpent[0].total : 0,
        recentActivity,
        cartItems: cart ? cart.items.length : 0,
        wishlistItems: wishlist ? wishlist.products.length : 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.getAdminStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      ordersByStatus,
      recentOrders,
      topProducts,
      usersOverTime,
      revenueByMonth,
    ] = await Promise.all([
      User.countDocuments({ isActive: true }),
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Order.find().sort('-createdAt').limit(5).populate('user', 'name email'),
      Product.find({ isActive: true }).sort('-purchases').limit(10).select('title thumbnail price purchases rating'),
      User.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $limit: 30 },
      ]),
      Order.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            revenue: { $sum: '$totalPrice' },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
        { $limit: 12 },
      ]),
    ]);

    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
        ordersByStatus,
        recentOrders,
        topProducts,
        usersOverTime,
        revenueByMonth,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.getRecommendationLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50, type } = req.query;
    const filter = {};
    if (type) filter.type = type;

    const total = await Recommendation.countDocuments(filter);
    const { query, page: pageNum, limit: limitNum } = paginate(
      Recommendation.find(filter).sort('-createdAt').populate('user', 'name email').populate('sourceProduct', 'title'),
      page,
      limit
    );

    const logs = await query.lean();

    res.json({
      success: true,
      logs,
      pagination: paginateResults(total, pageNum, limitNum),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
