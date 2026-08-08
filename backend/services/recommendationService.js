const Product = require('../models/Product');
const User = require('../models/User');
const Activity = require('../models/Activity');
const Order = require('../models/Order');
const Session = require('../models/Session');

const CATEGORY_COMPLEMENTARY = {
  'Shirts': ['Pants', 'Jeans', 'Trousers', 'Belts', 'Shoes'],
  'Pants': ['Shirts', 'T-Shirts', 'Belts', 'Shoes'],
  'T-Shirts': ['Pants', 'Jeans', 'Shorts', 'Sneakers'],
  'Jeans': ['Shirts', 'T-Shirts', 'Belts', 'Boots'],
  'Dresses': ['Shoes', 'Bags', 'Jewelry', 'Belts'],
  'Shoes': ['Socks', 'Insoles', 'Shoe Care'],
  'Jackets': ['T-Shirts', 'Shirts', 'Pants', 'Scarves'],
  'Sneakers': ['T-Shirts', 'Jeans', 'Shorts', 'Socks'],
  'Accessories': ['Watches', 'Bags', 'Sunglasses', 'Belts'],
  'Watches': ['Bands', 'Watch Cases', 'Accessories'],
  'Bags': ['Wallets', 'Belts', 'Accessories'],
};

exports.getPersonalizedRecommendations = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return [];

    const recentActivities = await Activity.find({ user: userId })
      .sort('-timestamp')
      .limit(50)
      .lean();

    const viewedProductIds = recentActivities
      .filter((a) => a.action === 'view' && a.product)
      .map((a) => a.product);

    const purchasedProductIds = recentActivities
      .filter((a) => a.action === 'purchase' && a.product)
      .map((a) => a.product);

    const categoryScores = {};
    const brandScores = {};

    const viewedProducts = await Product.find({ _id: { $in: viewedProductIds } }).lean();
    viewedProducts.forEach((p) => {
      categoryScores[p.category] = (categoryScores[p.category] || 0) + 1;
      if (p.brand) brandScores[p.brand] = (brandScores[p.brand] || 0) + 1;
    });

    if (user.preferences && user.preferences.categories) {
      user.preferences.categories.forEach((c) => {
        categoryScores[c] = (categoryScores[c] || 0) + 2;
      });
    }
    if (user.preferences && user.preferences.brands) {
      user.preferences.brands.forEach((b) => {
        brandScores[b] = (brandScores[b] || 0) + 2;
      });
    }

    const filter = {
      isActive: true,
      _id: { $nin: [...viewedProductIds, ...purchasedProductIds] },
    };

    const products = await Product.find(filter).limit(100).lean();

    const scored = products.map((product) => {
      const score = computeProductScore(product, categoryScores, brandScores, user);
      return { product, score };
    });

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, 20).map((s) => ({
      ...s.product,
      recommendationScore: s.score,
    }));
  } catch (error) {
    console.error('Error getting personalized recommendations:', error);
    return [];
  }
};

exports.getTrendingProducts = async (limit = 10) => {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ views: -1, purchases: -1, rating: -1 })
      .limit(limit)
      .lean();
    return products;
  } catch (error) {
    console.error('Error getting trending products:', error);
    return [];
  }
};

exports.getFBTProducts = async (productId) => {
  try {
    const orders = await Order.find({ 'items.product': productId }).lean();

    const coPurchased = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const id = item.product.toString();
        if (id !== productId) {
          coPurchased[id] = (coPurchased[id] || 0) + 1;
        }
      });
    });

    const sortedIds = Object.entries(coPurchased)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([id]) => id);

    if (sortedIds.length === 0) {
      const sourceProduct = await Product.findById(productId).lean();
      if (sourceProduct) {
        return Product.find({
          category: sourceProduct.category,
          _id: { $ne: productId },
          isActive: true,
        })
          .sort({ rating: -1, purchases: -1 })
          .limit(10)
          .lean();
      }
      return [];
    }

    const products = await Product.find({ _id: { $in: sortedIds }, isActive: true }).lean();
    return sortedIds.map((id) => products.find((p) => p._id.toString() === id)).filter(Boolean);
  } catch (error) {
    console.error('Error getting FBT products:', error);
    return [];
  }
};

exports.getCompleteLook = async (productId) => {
  try {
    const product = await Product.findById(productId).lean();
    if (!product) return [];

    const complementaryCategories = CATEGORY_COMPLEMENTARY[product.category] || [];

    if (complementaryCategories.length === 0) {
      return Product.find({
        _id: { $ne: productId },
        isActive: true,
      })
        .sort({ rating: -1, purchases: -1 })
        .limit(10)
        .lean();
    }

    return Product.find({
      category: { $in: complementaryCategories },
      _id: { $ne: productId },
      isActive: true,
    })
      .sort({ rating: -1, purchases: -1 })
      .limit(10)
      .lean();
  } catch (error) {
    console.error('Error getting complete look:', error);
    return [];
  }
};

exports.getSessionRecommendations = async (userId, sessionId) => {
  try {
    if (!sessionId) {
      return exports.getPersonalizedRecommendations(userId);
    }

    const session = await Session.findOne({ sessionId });
    if (!session || !session.viewedProducts || session.viewedProducts.length === 0) {
      return exports.getPersonalizedRecommendations(userId);
    }

    const viewedIds = session.viewedProducts.map((v) => v.product);
    const viewedProducts = await Product.find({ _id: { $in: viewedIds } }).lean();

    const categoryScores = {};
    viewedProducts.forEach((p) => {
      categoryScores[p.category] = (categoryScores[p.category] || 0) + 1;
    });

    const topCategories = Object.entries(categoryScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat]) => cat);

    const products = await Product.find({
      category: { $in: topCategories },
      _id: { $nin: viewedIds },
      isActive: true,
    })
      .sort({ rating: -1, purchases: -1 })
      .limit(15)
      .lean();

    return products;
  } catch (error) {
    console.error('Error getting session recommendations:', error);
    return [];
  }
};

exports.getColdStartRecommendations = async (limit = 10) => {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ purchases: -1, rating: -1, views: -1 })
      .limit(limit)
      .lean();
    return products;
  } catch (error) {
    console.error('Error getting cold start recommendations:', error);
    return [];
  }
};

function computeProductScore(product, categoryScores, brandScores, user) {
  let score = 0;

  score += (categoryScores[product.category] || 0) * 10;
  score += (brandScores[product.brand] || 0) * 8;
  score += (product.rating || 0) * 5;
  score += Math.min(product.purchases || 0, 100) * 0.5;
  score += Math.min(product.views || 0, 100) * 0.2;

  if (user.preferences && user.preferences.categories) {
    if (user.preferences.categories.includes(product.category)) {
      score += 15;
    }
  }
  if (user.preferences && user.preferences.brands) {
    if (user.preferences.brands.includes(product.brand)) {
      score += 12;
    }
  }

  if (user.preferences && user.preferences.sizes && user.preferences.sizes.length > 0) {
    if (product.sizes && product.sizes.some((s) => user.preferences.sizes.includes(s))) {
      score += 5;
    }
  }

  return score;
}
