// import jwt from 'jsonwebtoken';

// export async function requireAuth(req, res, next) {
//     try {
//         // token from httpOnly cookie or Authorization header
//         const token =
//             req.cookies?.token ||
//             (req.headers.authorization?.startsWith('Bearer ')
//                 ? req.headers.authorization.split(' ')[1]
//                 : null);

//         if (!token) return res.status(401).json({ message: 'Not authenticated' });

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // attach just the id (super reliable)
//         req.userId = decoded.id || decoded._id;
//         if (!req.userId) return res.status(401).json({ message: 'Invalid token' });

//         next();
//     } catch (err) {
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// }

// ES module
import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
    try {
        const token =
            req.cookies?.access_token || req.signedCookies?.access_token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // attach to req for downstream use
        req.user = { _id: payload.sub, email: payload.email, username: payload.username };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
