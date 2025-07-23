const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { register, login } = require('../controllers/authController')

router.post('/register', register);
router.post('/login', login);

router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Unauthorized. Missing token' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Invalid token. Server error' });
    }
});

module.exports = router;