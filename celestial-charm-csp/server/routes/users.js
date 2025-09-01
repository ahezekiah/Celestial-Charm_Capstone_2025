import { Router } from 'express';
const router = Router();
import User from '../models/User.js';
import psd from 'bcryptjs';
const { genSalt, hash } = psd;
import  { requireAuth }  from '../middleware/requireAuth.js';

const JWT_SECRET = process.env.JWT_SECRET || 'AteezPresent';

router.get('/:id', requireAuth, async (req, res) => {
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
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Account deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete account.' });
    }
});

router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        .select("name username email phoneNumber birthday profilePicture gems personalityType inventory");
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});




export default router;