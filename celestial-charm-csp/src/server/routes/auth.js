const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.post("/register", async (req, res) => {
    const { name, username, phoneNumber, birthday, email, password, uid } = req.body;
    try {
      // Check if username or email exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: "Email or username already exists." });
        }

        const newUser = new User({
            name,
            username,
            phoneNumber,
            birthday,
            email,
            uid, // from Firebase
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Registration error:", err.message);
        res.status(500).json({ message: "Failed to save user to DB." });
    }
});


router.get("/find-email/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: "Username not found" });
        res.json({ email: user.email });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;