import Products from '../models/Products.js';
import User from '../models/User.js';
import GemBundle from '../models/GemBundle.js';

//(fallback: $1 ≈ 10 gems)
const asGems = (priceString) => {
    const price = Number(String(priceString).replace(/[^0-9.]/g, '')) || 0;
    return Math.max(1, Math.round(price * 10)); // Convert to cents
}

// -------- Items ----------
export async function listStoreItems(req, res) {
    try {
        const { theme, type, page = 1, limit = 12 } = req.query;
        const filter = {};
        if (theme) filter.theme = new RegExp(`^${theme}`, 'i'); // Case-insensitive search
        if (type) filter.type = new RegExp(`^${type}`, 'i'); // Case-insensitive search

        const skip = (Number(page) - 1) * Number(limit);

        const total = await Products.countDocuments(filter);
        let items = await Products.find(filter).skip(skip).limit(Number(limit)).lean();
        if(!Array.isArray(items)) items = []; // safeguard


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
}

// -------- Buy single item with gems ----------
export async function purchseWithGems(req, res) {
    try {
        const { itemId, qty = 1 } = req.body || {};
        if (!itemId) {
            return res.status(400).json({ error: "Item ID is required" });
        }

        const item = await Products.findById(itemId).lean();
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const priceGems = (item.priceGems ?? asGems(item.price)) * Math.max(1, qty);;
        if ((user.gems || 0) < priceGems) {
            return res.status(400).json({ error: "Not enough gems to purchase this item" });
        }

        user.gems = (user.gems || 0) - priceGems;
        user.inventory.push({
            itemId: String(item._id),
            name: item.name,
            image: item.image,
            priceGems,
            qty: Math.max(1, qty),
            purchasedAt: new Date()
        });

        await user.save();

        res.json({ ok: true, gemsLeft: user.gems, inventoryItem: user.inventory });
    } catch (error) {
        console.error("Error purchasing item:", error);
        res.status(500).json({ error: "Purchase failed" });
    }
}

// -------- Inventory ----------
export async function getInventory(req, res) {
    try {
        const user = await User.findById(req.user.id).lean();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ gems: user.gems || 0, inventory: user.inventory || []});
    } catch (error) {
        console.error("Error fetching inventory:", error);
        res.status(500).json({ error: "Failed to load inventory" });
    }
}

// -------- Cart & Wishlist ----------
const ensureLists = (u) => {
    if (!Array.isArray(u.cart)) u.cart = [];
    if (!Array.isArray(u.wishlist)) u.wishlist = [];
};

// -------- Cart ----------
export async function addToCart(req, res) {
    const { itemId, qty = 1 } = req.body || {};
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    ensureLists(user);
    const existing = user.cart.find(x => String(x.itemId) === String(itemId));
    if (existing) existing.qty += Math.max(1, qty);
    else user.cart.push({ itemId, qty: Math.max(1, qty) });
    await user.save();
    res.json({ ok: true, cart: user.cart });
}

export async function removeFromCart(req, res) {
    const { itemId } = req.body || {};
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    ensureLists(user);
    user.cart = user.cart.filter(x => String(x.itemId) !== String(itemId));
    await user.save();
    res.json({ ok: true, cart: user.cart });
}

export async function moveToCart(req, res) {
    const { itemId, qty = 1 } = req.body || {};
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    ensureLists(user);
    user.wishlist = user.wishlist.filter(x => String(x.itemId) !== String(itemId));
    const existing = user.cart.find(x => String(x.itemId) === String(itemId));
    if (existing) existing.qty += Math.max(1, qty);
    else user.cart.push({ itemId, qty: Math.max(1, qty) });
    await user.save();
    res.json({ ok: true, cart: user.cart, wishlist: user.wishlist });
}

export async function getCart(req, res) {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: 'User not found' });
    ensureLists(user);
    const ids = user.cart.map(c => c.itemId);
    const prods = await Products.find({ _id: { $in: ids } }).lean();
    const info = Object.fromEntries(prods.map(p => [String(p._id), {
        name: p.name, image: p.image, priceGems: p.priceGems ?? asGems(p.price)
    }]));
    let total = 0;
    const lines = user.cart.map(c => {
        const p = info[String(c.itemId)] || {};
        const qty = c.qty || 1;
        const price = p.priceGems || 0;
        const line = price * qty;
        total += line;
        return { itemId: c.itemId, qty, name: p.name, image: p.image, priceGems: price, lineGems: line };
    });
    res.json({ ok: true, lines, totalGems: total, haveGems: user.gems || 0 });
}

export async function checkoutCart(req, res) {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    ensureLists(user);
    const ids = user.cart.map(c => c.itemId);
    const prods = await Products.find({ _id: { $in: ids } }).lean();
    const priceMap = Object.fromEntries(prods.map(p => [String(p._id), (p.priceGems ?? asGems(p.price))]));
    let total = 0;
    for (const c of user.cart) total += (priceMap[String(c.itemId)] || 0) * (c.qty || 1);
    if ((user.gems || 0) < total) return res.status(400).json({ error: 'Not enough gems', needed: total, have: user.gems || 0 });

    user.gems = (user.gems || 0) - total;
    for (const c of user.cart) {
        const p = prods.find(pp => String(pp._id) === String(c.itemId));
        if (!p) continue;
        user.inventory.push({
            itemId: String(p._id), name: p.name, image: p.image,
            priceGems: (priceMap[String(p._id)] || 0) * (c.qty || 1),
            qty: c.qty || 1, purchasedAt: new Date()
        });
    }
    user.cart = [];
    await user.save();
    res.json({ ok: true, remainingGems: user.gems, inventory: user.inventory });
}

// -------- Wishlist ----------
export async function addToWishlist(req, res) {
    const { itemId } = req.body || {};
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    ensureLists(user);
    if (!user.wishlist.find(x => String(x.itemId) === String(itemId))) {
        user.wishlist.push({ itemId });
    }
    await user.save();
    res.json({ ok: true, wishlist: user.wishlist });
}

export async function moveToWishlist(req, res) {
    const { itemId } = req.body || {};
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    ensureLists(user);
    user.cart = user.cart.filter(x => String(x.itemId) !== String(itemId));
    if (!user.wishlist.find(x => String(x.itemId) === String(itemId))) {
        user.wishlist.push({ itemId });
    }
    await user.save();
    res.json({ ok: true, cart: user.cart, wishlist: user.wishlist });
}

export async function getWishlist(req, res) {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: 'User not found' });
    ensureLists(user);
    const ids = user.wishlist.map(c => c.itemId);
    const prods = await Products.find({ _id: { $in: ids } }).lean();
    const info = Object.fromEntries(prods.map(p => [String(p._id), {
        name: p.name, image: p.image, priceGems: p.priceGems ?? asGems(p.price)
    }]));
    const lines = user.wishlist.map(c => {
        const p = info[String(c.itemId)] || {};
        const qty = c.qty || 1;
        const price = p.priceGems || 0;
        const line = price * qty;
        total += line;
        return { itemId: c.itemId, qty, name: p.name, image: p.image, priceGems: price, lineGems: line };
    });
    res.json({ ok: true, lines, totalGems: total, haveGems: user.gems || 0 });
};

export async function removeFromWishlist(req, res) {
    const { itemId } = req.body || {};
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    ensureLists(user);
    user.wishlist = user.wishlist.filter(x => String(x.itemId) !== String(itemId));
    await user.save();
    res.json({ ok: true, wishlist: user.wishlist });
};

// -------- Gem Bundles (buy gems with gems) ----------
const GEM_BUNDLES = [
    { id: 'boost-10',   title: 'Spark Pack',    emoji: '✨', costGems: 10,   giveGems: 11,   blurb: '+1 bonus' },
    { id: 'boost-20',   title: 'Glow Pack',     emoji: '🌟', costGems: 20,   giveGems: 22,   blurb: '+2 bonus' },
    { id: 'boost-50',   title: 'Nova Pack',     emoji: '🌠', costGems: 50,   giveGems: 60,   blurb: '+10 bonus' },
    { id: 'boost-100',  title: 'Galaxy Pack',   emoji: '🌌', costGems: 100,  giveGems: 125,  blurb: '+25 bonus' },

    { id: 'boost-150',  title: 'Cosmos Pack',   emoji: '🪐', costGems: 150,  giveGems: 190,  blurb: '+40 bonus' },
    { id: 'boost-200',  title: 'Nebula Pack',   emoji: '☄️', costGems: 200,  giveGems: 260,  blurb: '+60 bonus' },
    { id: 'boost-300',  title: 'Starlight Pack',emoji: '🌃', costGems: 300,  giveGems: 400,  blurb: '+100 bonus' },
    { id: 'boost-400',  title: 'Comet Pack',    emoji: '🌠', costGems: 400,  giveGems: 540,  blurb: '+140 bonus' },

    { id: 'boost-500',  title: 'Supernova Pack',emoji: '💥', costGems: 500,  giveGems: 700,  blurb: '+200 bonus' },
    { id: 'boost-600',  title: 'Eclipse Pack',  emoji: '🌑', costGems: 600,  giveGems: 850,  blurb: '+250 bonus' },
    { id: 'boost-750',  title: 'Aurora Pack',   emoji: '🌈', costGems: 750,  giveGems: 1100, blurb: '+350 bonus' },
    { id: 'boost-900',  title: 'Idol Pack',     emoji: '🎤', costGems: 900,  giveGems: 1350, blurb: '+450 bonus' },

    { id: 'boost-1000', title: 'Celestial Pack',emoji: '🌙', costGems: 1000, giveGems: 1600, blurb: '+600 bonus' },
    { id: 'boost-1250', title: 'Dreamer Pack',  emoji: '💭', costGems: 1250, giveGems: 2100, blurb: '+850 bonus' },
    { id: 'boost-1500', title: 'Legend Pack',   emoji: '👑', costGems: 1500, giveGems: 2700, blurb: '+1200 bonus' },
    { id: 'boost-2000', title: 'Eternal Pack',  emoji: '♾️', costGems: 2000, giveGems: 3800, blurb: '+1800 bonus' },
];


const BUNDLE_LIMITS = { perBundlePerDay: 3, totalPerDay: 5 };
const startOfLocalDay = (d = new Date()) => { const t = new Date(d); t.setHours(0,0,0,0); return t; };

export async function getGemBundles(req, res) {
    try {
        const bundles = await GemBundle.find({ active: true }).sort({ sortOrder: 1 }).lean();
        if (!bundles.length) {
        // LAST RESORT fallback if DB empty
        return res.json({
            ok: true,
            bundles: [
            { id:'boost-10', title:'Spark Pack', emoji:'✨', costGems:10, giveGems:11, blurb:'+1 bonus' }
            ]
        });
        }
        return res.json({ ok: true, bundles });
    } catch (e) {
        console.error("getGemBundles", e);
        res.status(500).json({ ok: false, error: "Failed to load bundles" });
    }
}

export async function purchaseGemBundle(req, res) {
    try {
        const { bundleId } = req.body || {};
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ ok: false, error: "User not found" });

        const bun = await GemBundle.findOne({ id: bundleId, active: true }).lean();
        if (!bun) return res.status(404).json({ ok: false, error: "Bundle not found" });

        user.gemTransactions = user.gemTransactions || [];
        const today = startOfLocalDay();
        const todays = user.gemTransactions.filter(tx => tx?.kind === 'bundle' && tx?.at && new Date(tx.at) >= today);
        if (todays.filter(tx => tx.bundleId === bundleId).length >= BUNDLE_LIMITS.perBundlePerDay) {
        return res.status(429).json({ ok:false, error:`Daily limit hit for ${bun.title}` });
        }
        if (todays.length >= BUNDLE_LIMITS.totalPerDay) {
        return res.status(429).json({ ok:false, error:`Daily bundle limit hit` });
        }

        if ((user.gems || 0) < bun.costGems) {
        return res.status(400).json({ ok:false, error:'Not enough gems', needed: bun.costGems, have: user.gems || 0 });
        }

        // spend → grant
        user.gems = (user.gems || 0) - bun.costGems + bun.giveGems;
        user.gemTransactions.push({
        kind: 'bundle',
        bundleId,
        title: bun.title,
        costGems: bun.costGems,
        giveGems: bun.giveGems,
        net: bun.giveGems - bun.costGems,
        at: new Date()
        });

        await user.save();
        res.json({ ok: true, remainingGems: user.gems, bundle: bun, limits: BUNDLE_LIMITS });
    } catch (e) {
        console.error("purchaseGemBundle", e);
        res.status(500).json({ ok:false, error: "Bundle purchase failed" });
    }
}

