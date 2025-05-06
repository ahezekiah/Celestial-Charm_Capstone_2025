import express from 'express';
import { registerUser, getUser } from '../controllers/authController';
import User from '../models/User';
const router = express.Router();

router.post('/register', registerUser);
router.get('/user/:uid', getUser);

router.get('/find-email/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: 'Username not found' });
        res.status(200).json({ email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
});