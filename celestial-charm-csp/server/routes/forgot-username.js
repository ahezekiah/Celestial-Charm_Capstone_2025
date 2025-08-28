import { Router } from 'express';
const router = Router();
import { findOne } from '../models/User'; 

router.post('/lookup', async (req, res) => {
    const { phoneNumber, birthday } = req.body;
    if (!phoneNumber && !birthday) {
        return res.status(400).json();
    }
    try {
        const query = phoneNumber ? { phoneNumber } : { birthday };
        const user = await findOne(query);
        if (!user) return res.status(404).json({ message: "User not found." });
        res.json({ username: user.username, email: user.email });
    } catch (error) {
        console.error("Error looking up user:", error);
        res.status(500).json({ message: "An error occurred while looking up the user." });
    }
});

export default router;