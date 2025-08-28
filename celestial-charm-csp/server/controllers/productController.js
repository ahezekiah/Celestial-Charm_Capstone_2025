import KpopProduct from '../models/KpopProduct.js';
import AnimeProduct from '../models/AnimeProduct.js';

// Utility to fetch + filter + optionally paginate
const fetchProducts = async (Model, req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 12;
        const filterType = req.query.type;
        
        let filterQuery = {};
        if (filterType && filterType !== 'all') {
            filterQuery.type = filterType;
        }

        const total = await Model.countDocuments(filterQuery);

        let products;
        if (!filterType || total > limit) {
            const skip = (page - 1) * limit;
            products = await Model.find(filterQuery).skip(skip).limit(limit);
            res.json({
                products,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
                totalItems: total,
                startIndex: skip + 1,
                endIndex: Math.min(skip + products.length, total)
            });
        } else {
            // Return all without pagination
            products = await Model.find(filterQuery);
            res.json({
                products,
                totalPages: 1,
                currentPage: 1
            });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch products.' });
    }
};


// GET /api/kpop
export async function getKpopProducts (req, res) {
    fetchProducts(KpopProduct, req, res);
};
    

// GET /api/anime
export async function getAnimeProducts (req, res) {
    fetchProducts(AnimeProduct, req, res);
};
    

// GET /api/kpop2
export async function getKpopProducts2 (req, res) {
    fetchProducts(KpopProduct, req, res);
}
    

// GET /api/anime2
export async function getAnimeProducts2 (req, res){
    fetchProducts(AnimeProduct, req, res);
};


// export default { getKpopProducts, getAnimeProducts, getKpopProducts2, getAnimeProducts2 };
