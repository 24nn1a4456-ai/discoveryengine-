const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    intent: {
      type: String,
      enum: ['browsing', 'searching', 'comparing', 'buying', 'researching'],
      default: 'browsing',
    },
    viewedProducts: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    searchedTerms: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 60 * 1000),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Session', sessionSchema);
