const Products = require('../models/Products');
const User = require('../models/User');

//(fallback: $1 ≈ 10 gems)
const asGems = (priceString) => {
    const price = Number(String(priceString).replace(/[^0-9.]/g, '')) || 0;
    return Math.max(1, Math.round(price * 10)); // Convert to cents
}

exports.listStoreItems = async (req, res) => {
    try {
        const { theme, type, page = 1, limit = 12 } = req.query;
        const filter = {};
        if (theme) filter.theme = new RegExp(`^${theme}`, 'i'); // Case-insensitive search
        if (type) filter.type = new RegExp(`^${type}`, 'i'); // Case-insensitive search

        const skip = (Number(page) - 1) * Number(limit);

        const total = await Products.countDocuments(filter);
        let items = await Products.find(filter).skip(skip).limit(Number(limit)).lean();

        if (!Array.isArray(items)) items = [];

        const mappedItems = items.map(item => ({
            id: String(item._id),
            name: item.name,
            type: item.type,
            theme: item.theme,
            price: item.price,
            priceGems: asGems(item.price),
            desc: item.desc,
            url: item.url,
            image: item.image,
        }));

        res.json({
            total,
            page: Number(page),
            limit: Number(limit),
            items: mappedItems
        });
    } catch (error) {
        console.error("Error listing store items:", error);
        res.status(500).json({ error: "Failed to load store items" });
    }
};

exports.purchseWithGems = async (req, res) => {
    try {
        const { itemId } = req.body;
        if (!itemId) {
            return res.status(400).json({ error: "Item ID is required" });
        }

        const item = await Products.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const priceGems = asGems(item.price);
        if (user.gems < priceGems) {
            return res.status(400).json({ error: "Not enough gems to purchase this item" });
        }

        user.gems -= priceGems;
        user.inventory.push({
            itemId: String(item._id),
            name: item.name,
            image: item.image,
            priceGems,
            purchasedAt: new Date()
        });

        await user.save();

        res.json({ ok: true, gemsLeft: user.gems, inventoryItem: user.inventory[user.inventory.length - 1] });
    } catch (error) {
        console.error("Error purchasing item:", error);
        res.status(500).json({ error: "Purchase failed" });
    }
};

exports.getInventory = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).lean();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ gems: user.gems, inventory: user.inventory || []});
    } catch (error) {
        console.error("Error fetching inventory:", error);
        res.status(500).json({ error: "Failed to load inventory" });
    }
};