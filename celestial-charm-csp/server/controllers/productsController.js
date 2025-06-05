const Products = require('../models/Products');

if (!Products) console.error("❌ Products model is undefined!");

const getFilteredProducts = async (Model, req, res) => {
    try {
        const { type, theme, page = 1, limit = 12 } = req.query;

        const filter = {};
        if (type) filter.type = new RegExp(`^${type}$`, 'i');
        if (theme) filter.theme = new RegExp(`^${theme}$`, 'i');


        console.log("🔥 Final filter:", filter);
        const sample = await Model.find({}).limit(5);
        console.log("🧪 Sample product types from DB:", sample.map(p => p.type));


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


const getFashionProducts = (req, res) => getFilteredProducts(Products, req, res);
const getJewelryProducts = (req, res) => getFilteredProducts(Products, req, res);
const getFragranceProducts = (req, res) => getFilteredProducts(Products, req, res);

module.exports = {
    getFashionProducts,
    getJewelryProducts,
    getFragranceProducts,
};
