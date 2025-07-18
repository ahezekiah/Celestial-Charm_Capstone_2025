const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

router.post('/lookup', async (req, res) => {
    const { phoneNumber, birthday } = req.body;
    if (!phoneNumber && !birthday) {
        return res.status(400).json();
    }
    try {
        const query = phoneNumber ? { phoneNumber } : { birthday };
        const user = await User.findOne(query);
        if (!user) return res.status(404).json({ message: "User not found." });
        res.json({ username: user.username, email: user.email });
    } catch (error) {
        console.error("Error looking up user:", error);
        res.status(500).json({ message: "An error occurred while looking up the user." });
    }
});

module.exports = router;