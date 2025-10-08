const router = require('express').Router();
import Reviews from '../models/Reviews.js';
import requireAuth from '../middleware/requireAuth.js';

router.get('/', async (req, res) => {
    const { productId, blogId, page = 1, limit = 10 } = req.query;
    const que = { status: 'approved' };
    if (productId) { que.targetType = 'product'; que.targetId = String(productId); }
    else if (blogId) { que.targetType = 'blog'; que.targetId = String(blogId); };

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
        Reviews.find(que).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        Reviews.countDocuments(que)
    ]);
    res.json([
        { items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) }
    ]);
});


router.post('/', requireAuth, async (req, res) => {
    const { targetType, targetId = null, rating, title = '', body } = req.body;
    if (!['product', 'blog', 'site'].includes(targetType)) return res.status(400).json({ message: 'Invalid target type' });
    if (targetType !== 'site' && !targetId) return res.status(400).json({ message: 'Target ID is required for product or blog reviews' });

    const review = await Reviews.create({
        userId: req.user._id,
        targetType,
        targetId,
        rating,
        title,
        body,
    });
    res.status(201).json(review);
});
module.exports = router;