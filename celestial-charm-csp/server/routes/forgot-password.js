import { Router } from 'express';
const router = Router();
import { findOne } from '../models/User.js';
import { compare, genSalt, hash } from 'bcryptjs';

router.post('/', async (req, res) => {
    const { identifier, newPassword } = req.body;
    console.log("Reset password hit:", req.body);
    res.json({ message: 'It works!' });
    try {
        const user = await findOne({ $or: [
            { email: identifier }, 
            { username: identifier },
            { phoneNumber: identifier }
        ]});
        if (!user) return res.status(404).json({ message: "User not found." });

        const isSame = await compare(newPassword, user.password);
        if (isSame) return res.status(400).json({ message: "New password cannot be the same as the old password." });

        const salt = await genSalt(10);
        user.password = await hash(newPassword, salt);
        await user.save();
        return res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Error in forgot password route:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
});

router.post ('/verify', async (req, res) => {
    const { identifier } = req.body;

    try {
        const user = await findOne({ $or: [
            { email: identifier }, 
            { username: identifier },
            { phoneNumber: identifier }
        ]});
        res.status(200).json({
            exists: !!user,
            message: user ? "User found." : "User not found."
        });
    } catch (error) {
        console.error("Error in verify route:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;