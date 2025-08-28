import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function requireAuth(req, res, next) {
    try {
        const hdr = req.get('authorization');
        const bearer = hdr?.startsWith('Bearer ') ? hdr.slice(7) : null;
        const token = req.cookies?.token || bearer;
        if (!token) return res.status(401).json({ message: 'Not authenticated' });

        if (!process.env.JWT_SECRET)
        return res.status(500).json({ message: 'JWT_SECRET not set' });

        let payload;
        try { payload = jwt.verify(token, process.env.JWT_SECRET); }
        catch { return res.status(401).json({ message: 'Invalid token' }); }

        const user = await User.findById(payload.sub).select('username email _id');
        if (!user) return res.status(401).json({ message: 'User not found' });

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}