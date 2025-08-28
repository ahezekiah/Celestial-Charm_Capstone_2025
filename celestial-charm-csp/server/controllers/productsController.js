import Products from '../models/Products';

if (!Products) console.error("❌ Products model is undefined!");

const getFilteredProducts = async (Model, req, res, forcedType = null) => {
  try {
    const { theme, page = 1, limit = 12 } = req.query;
    const type = forcedType || req.query.type;

    const filter = {};
    if (type) filter.type = new RegExp(`^${type}$`, 'i');
    if (theme) filter.theme = new RegExp(`^${theme}$`, 'i');

    const skip = (page - 1) * limit;
    const totalItems = await Model.countDocuments(filter);
    const products = await Model.find(filter).skip(skip).limit(Number(limit));

    res.json({
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: Number(page),
      startIndex: skip + 1,
      endIndex: Math.min(skip + limit, totalItems),
      products,
    });
  } catch (err) {
    console.error("🔥 ERROR in getFilteredProducts:", err);
    res.status(500).json({ error: err.message });
  }
};

const getFashionProducts = (req, res) => {
  return getFilteredProducts(Products, req, res, 'fashion');
};

const getFragranceProducts = (req, res) => {
  return getFilteredProducts(Products, req, res, 'fragrance');
};

const getJewelryProducts = (req, res) => {
  return getFilteredProducts(Products, req, res, 'jewelry');
};


export default {
    getFashionProducts,
    getJewelryProducts,
    getFragranceProducts,
};
