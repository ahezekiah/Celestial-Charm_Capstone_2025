const KpopProduct = require('../models/KpopProduct');
const AnimeProduct = require('../models/AnimeProduct');

// GET /api/kpop
const getKpopProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 12; // Number of items per page
        const skip = (page - 1) * limit;
        const products = await KpopProduct.find().skip(skip).limit(limit);
        const total = await KpopProduct.countDocuments();

        res.json({
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
    });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Kpop products.' });
    }
};

// GET /api/anime
const getAnimeProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 12; // Number of items per page
        const skip = (page - 1) * limit;

        const products = await AnimeProduct.find().skip(skip).limit(limit);
        const total = await AnimeProduct.countDocuments();

        res.json({
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Anime products.' });
    }
};

module.exports = { getKpopProducts, getAnimeProducts };
