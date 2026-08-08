const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sessionId: { type: String },
    type: {
      type: String,
      enum: ['personalized', 'trending', 'fbt', 'cold_start', 'session', 'complementary'],
      required: true,
    },
    sourceProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        score: { type: Number, default: 0 },
      },
    ],
    shown: { type: Boolean, default: false },
    clicked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

recommendationSchema.index({ user: 1, createdAt: -1 });
recommendationSchema.index({ sessionId: 1 });

module.exports = mongoose.model('Recommendation', recommendationSchema);
