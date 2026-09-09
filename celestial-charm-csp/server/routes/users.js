import { Router } from 'express';
const router = Router();
import User from '../models/User.js';
import psd from 'bcryptjs';
const { genSalt, hash } = psd;
import { requireAuth } from '../middleware/requireAuth.js';

const JWT_SECRET = process.env.JWT_SECRET || 'AteezPresent';

if (!JWT_SECRET) {
    throw new Error(
        "JWT_SECRET is required"
    );
}

router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:id', requireAuth, async (req, res) => {
    if (req.params.id !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', requireAuth, async (req, res) => {
    if (req.params.id !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    try {
        const updates = { ...req.body };

        if (updates.password) {
            const salt = await genSalt(10);
            updates.password = await hash(updates.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Could not update user." });
    }
});

router.delete('/:id', requireAuth, async (req, res) => {
    if (req.params.id !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Account deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete account.' });
    }
});

export default router;