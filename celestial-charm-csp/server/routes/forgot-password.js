const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const { identifier, phoneNumber, newPassword } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }], phoneNumber });
        if (!user) return res.status(404).json({ message: "User not found." });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        return res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Error in forgot password route:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
});

module.exports = router;