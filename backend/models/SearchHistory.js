const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    query: {
      type: String,
      required: true,
      trim: true,
    },
    filters: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
    resultsCount: { type: Number, default: 0 },
    clickedProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    sessionId: { type: String },
  },
  { timestamps: true }
);

searchHistorySchema.index({ user: 1, createdAt: -1 });
searchHistorySchema.index({ query: 'text' });

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
