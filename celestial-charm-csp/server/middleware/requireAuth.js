// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export async function requireAuth(req, res, next) {
//     try {
//         const hdr = req.get('authorization');
//         const bearer = hdr?.startsWith('Bearer ') ? hdr.slice(7) : null;
//         const token = req.cookies?.token || bearer;
//         if (!token) return res.status(401).json({ message: 'Not authenticated' });

//         if (!process.env.JWT_SECRET)
//         return res.status(500).json({ message: 'JWT_SECRET not set' });

//         let payload;
//         try { payload = jwt.verify(token, process.env.JWT_SECRET); }
//         catch { return res.status(401).json({ message: 'Invalid token' }); }

//         const user = await User.findById(payload.sub).select('username email _id');
//         if (!user) return res.status(401).json({ message: 'User not found' });

//         req.user = user;
//         next();
//     } catch (error) {
//         next(error);
//     }
// }

// server/middleware/requireAuth.js
import jwt from 'jsonwebtoken';

export async function requireAuth(req, res, next) {
    try {
        // token from httpOnly cookie or Authorization header
        const token =
            req.cookies?.token ||
            (req.headers.authorization?.startsWith('Bearer ')
                ? req.headers.authorization.split(' ')[1]
                : null);

        if (!token) return res.status(401).json({ message: 'Not authenticated' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // attach just the id (super reliable)
        req.userId = decoded.id || decoded._id;
        if (!req.userId) return res.status(401).json({ message: 'Invalid token' });

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
