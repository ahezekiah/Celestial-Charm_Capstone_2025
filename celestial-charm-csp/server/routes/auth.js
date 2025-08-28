// import { Router } from 'express';
// const router = Router();
import express from 'express';
const router = express.Router();
import User from '../models/User';

// import jwt from 'jsonwebtoken';
import User from '../models/User';
import { register, login } from '../controllers/authController.js';
import { requireAuth } from '../middleware/requireAuth.js';

router.post('/register', register);
router.post('/login', login);

router.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true });
    res.json({ ok: true });
});

// GET /api/auth/me  (protected)
router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password -__v');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ user });
    } catch (e) {
        res.status(500).json({ message: 'Failed to load user' });
    }
});


export default router;