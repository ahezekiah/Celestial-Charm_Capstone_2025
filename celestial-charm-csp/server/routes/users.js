import { Router } from 'express';
const router = Router();
import { findById, findByIdAndUpdate, findByIdAndDelete } from '../models/User.js';
import { genSalt, hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';

const verifyAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(403).json({ error: 'Invalid token' });
    }
};

router.get('/:id', verifyAuth, async (req, res) => {
    try {
        const user = await findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', verifyAuth, async (req, res) => {
    try {
        const updates = { ...req.body };

        if (updates.password) {
            const salt = await genSalt(10);
            updates.password = await hash(updates.password, salt);
        }

        const updatedUser = await findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Could not update user." });
    }
});

router.delete('/:id', verifyAuth, async (req, res) => {
    try {
        await findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Account deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete account.' });
    }
});

router.get('/me', verifyAuth, async (req, res) => {
    try {
        const user = await findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});




export default router;