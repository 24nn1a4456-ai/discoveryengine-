const Product = require('../models/Product');

exports.searchProducts = async (query, filters = {}) => {
  try {
    const filter = { isActive: true };

    if (query) {
      filter.$text = { $search: query };
    }
    if (filters.category) filter.category = filters.category;
    if (filters.brand) filter.brand = filters.brand;
    if (filters.minPrice || filters.maxPrice) {
      filter.price = {};
      if (filters.minPrice) filter.price.$gte = Number(filters.minPrice);
      if (filters.maxPrice) filter.price.$lte = Number(filters.maxPrice);
    }
    if (filters.rating) filter.rating = { $gte: Number(filters.rating) };
    if (filters.tags && filters.tags.length > 0) {
      filter.tags = { $in: filters.tags };
    }

    let sort = '-createdAt';
    if (filters.sort) {
      const sortMap = {
        price_asc: 'price',
        price_desc: '-price',
        rating: '-rating',
        newest: '-createdAt',
        popular: '-purchases',
      };
      sort = sortMap[filters.sort] || filters.sort;
    }

    const pageNum = Math.max(1, parseInt(filters.page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    return {
      products,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum * limitNum < total,
        hasPrev: pageNum > 1,
      },
    };
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

exports.getSuggestions = async (query) => {
  try {
    if (!query || query.length < 2) return [];

    const regex = new RegExp('^' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

    const [categoryResults, brandResults, titleResults] = await Promise.all([
      Product.distinct('category', { category: regex, isActive: true }),
      Product.distinct('brand', { brand: regex, isActive: true }),
      Product.find({ title: regex, isActive: true })
        .select('title')
        .limit(5)
        .lean(),
    ]);

    const suggestions = [
      ...categoryResults.slice(0, 3).map((c) => ({ type: 'category', text: c })),
      ...brandResults.slice(0, 3).map((b) => ({ type: 'brand', text: b })),
      ...titleResults.map((t) => ({ type: 'product', text: t.title })),
    ];

    return suggestions;
  } catch (error) {
    console.error('Suggestions error:', error);
    return [];
  }
};
