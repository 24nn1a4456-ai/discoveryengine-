const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    action: {
      type: String,
      required: [true, 'Action is required'],
      enum: ['view', 'click', 'add_to_cart', 'add_to_wishlist', 'purchase', 'search'],
      index: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    metadata: {
      type: Map,
      of: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

ActivitySchema.index({ user: 1, timestamp: -1 });
ActivitySchema.index({ user: 1, action: 1 });
ActivitySchema.index({ product: 1, action: 1 });
ActivitySchema.index({ timestamp: -1 });

module.exports = mongoose.model('Activity', ActivitySchema);
