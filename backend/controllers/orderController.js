const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { paginate, paginateResults } = require('../utils/pagination');

exports.getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const filter = { user: req.user._id };

    const total = await Order.countDocuments(filter);
    const { query: orderQuery, page: pageNum, limit: limitNum } = paginate(
      Order.find(filter).sort('-createdAt'),
      page,
      limit
    );

    const orders = await orderQuery.lean();

    res.json({
      success: true,
      orders,
      pagination: paginateResults(total, pageNum, limitNum),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, notes } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const orderItems = [];
    let itemsPrice = 0;

    for (const item of cart.items) {
      if (!item.product) continue;
      const subtotal = item.product.price * item.quantity;
      itemsPrice += subtotal;
      orderItems.push({
        product: item.product._id,
        title: item.product.title,
        thumbnail: item.product.thumbnail,
        price: item.product.price,
        quantity: item.quantity,
        subtotal,
      });
    }

    const taxPrice = itemsPrice * 0.1;
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      notes,
    });

    for (const item of cart.items) {
      if (item.product) {
        await Product.findByIdAndUpdate(item.product._id, {
          $inc: { purchases: 1, countInStock: -item.quantity },
        });
      }
    }

    cart.items = [];
    await cart.save();

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const total = await Order.countDocuments(filter);
    const { query: orderQuery, page: pageNum, limit: limitNum } = paginate(
      Order.find(filter).sort('-createdAt').populate('user', 'name email'),
      page,
      limit
    );

    const orders = await orderQuery.lean();

    res.json({
      success: true,
      orders,
      pagination: paginateResults(total, pageNum, limitNum),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (status === 'delivered') order.deliveredAt = new Date();

    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
